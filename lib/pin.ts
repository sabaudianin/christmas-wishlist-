import bcrypt from "bcryptjs";
import { createHash, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";

export const MAX_FAILED_ATTEMPTS = 5;
export const LOCK_MINUTES = 15;

export type AccessResult =
  | { ok: true; isAdmin: boolean }
  | { ok: false; reason: "not_found" }
  | { ok: false; reason: "locked"; lockedUntil: Date }
  | { ok: false; reason: "invalid"; attemptsLeft: number };

export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

function safeEqual(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

function isAdminSecret(secret: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return safeEqual(secret, adminPassword);
}

export async function checkAccess(
  id: string,
  secret: string,
  options: { allowAdmin?: boolean } = {},
): Promise<AccessResult> {
  const wishlist = await prisma.wishlist.findUnique({
    where: { id },
    select: { pinHash: true, failedAttempts: true, lockedUntil: true },
  });

  if (!wishlist) {
    return { ok: false, reason: "not_found" };
  }

  if (options.allowAdmin && isAdminSecret(secret)) {
    return { ok: true, isAdmin: true };
  }

  if (wishlist.lockedUntil && wishlist.lockedUntil > new Date()) {
    return { ok: false, reason: "locked", lockedUntil: wishlist.lockedUntil };
  }

  if (await bcrypt.compare(secret, wishlist.pinHash)) {
    if (wishlist.failedAttempts > 0 || wishlist.lockedUntil) {
      await prisma.wishlist.update({
        where: { id },
        data: { failedAttempts: 0, lockedUntil: null },
      });
    }
    return { ok: true, isAdmin: false };
  }

  const { failedAttempts } = await prisma.wishlist.update({
    where: { id },
    data: { failedAttempts: { increment: 1 } },
    select: { failedAttempts: true },
  });

  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
    await prisma.wishlist.update({
      where: { id },
      data: { failedAttempts: 0, lockedUntil },
    });
    return { ok: false, reason: "locked", lockedUntil };
  }

  return {
    ok: false,
    reason: "invalid",
    attemptsLeft: MAX_FAILED_ATTEMPTS - failedAttempts,
  };
}
