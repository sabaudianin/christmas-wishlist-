"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { checkAccess, hashPin, type AccessResult } from "@/lib/pin";
import {
  createWishlistSchema,
  deleteWishlistSchema,
  updateWishlistSchema,
} from "@/lib/validations";

export type ActionResult = { ok: true } | { ok: false; error: string };

const unlockSchema = updateWishlistSchema.pick({ id: true, pin: true });

const GENERIC_ERROR = "Coś poszło nie tak. Spróbuj ponownie.";

function accessErrorMessage(
  result: Exclude<AccessResult, { ok: true }>,
): string {
  switch (result.reason) {
    case "not_found":
      return "Nie znaleziono tej listy. Być może została już usunięta.";
    case "locked": {
      const minutes = Math.max(
        1,
        Math.ceil((result.lockedUntil.getTime() - Date.now()) / 60_000),
      );
      return `Zbyt wiele błędnych prób. Spróbuj ponownie za ${minutes} min.`;
    }
    case "invalid":
      return `Błędny PIN. Pozostało prób: ${result.attemptsLeft}.`;
  }
}

function normalizeName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("pl");
}

export async function createWishlist(input: unknown): Promise<ActionResult> {
  const parsed = createWishlistSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Nieprawidłowe dane.",
    };
  }
  const { firstName, lastName, pin, gifts } = parsed.data;

  try {
    await prisma.wishlist.create({
      data: {
        firstName,
        lastName,
        normalizedName: normalizeName(firstName, lastName),
        pinHash: await hashPin(pin),
        gifts: { create: gifts },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false,
        error: "Ta osoba ma już listę. Edytuj ją swoim PIN-em.",
      };
    }
    console.error("createWishlist failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function unlockWishlist(input: unknown): Promise<ActionResult> {
  const parsed = unlockSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Podaj 4-cyfrowy PIN." };
  }

  const access = await checkAccess(parsed.data.id, parsed.data.pin);
  return access.ok
    ? { ok: true }
    : { ok: false, error: accessErrorMessage(access) };
}

export async function updateWishlist(input: unknown): Promise<ActionResult> {
  const parsed = updateWishlistSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Nieprawidłowe dane.",
    };
  }
  const { id, pin, gifts } = parsed.data;

  const access = await checkAccess(id, pin);
  if (!access.ok) {
    return { ok: false, error: accessErrorMessage(access) };
  }

  try {
    await prisma.wishlist.update({
      where: { id },
      data: { gifts: { deleteMany: {}, create: gifts } },
    });
  } catch (error) {
    console.error("updateWishlist failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function deleteWishlist(input: unknown): Promise<ActionResult> {
  const parsed = deleteWishlistSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Nieprawidłowe dane.",
    };
  }
  const { id, secret } = parsed.data;

  const access = await checkAccess(id, secret, { allowAdmin: true });
  if (!access.ok) {
    return { ok: false, error: accessErrorMessage(access) };
  }

  try {
    await prisma.wishlist.delete({ where: { id } });
  } catch (error) {
    console.error("deleteWishlist failed", error);
    return { ok: false, error: GENERIC_ERROR };
  }

  revalidatePath("/");
  return { ok: true };
}
