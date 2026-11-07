import { z } from "zod";

const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} musi mieć co najmniej 2 znaki`)
    .max(50, `${label} może mieć maksymalnie 50 znaków`);

const pinField = z
  .string()
  .regex(/^\d{4}$/, "PIN musi składać się z dokładnie 4 cyfr");

export const giftSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Podaj nazwę prezentu")
    .max(100, "Nazwa prezentu może mieć maksymalnie 100 znaków"),
  url: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .pipe(
          z.url({
            protocol: /^https?$/,
            error: "Podaj poprawny link (http lub https)",
          }),
        ),
    ])
    .transform((value) => (value === "" ? undefined : value)),
});

const giftsField = z
  .array(giftSchema)
  .min(1, "Dodaj co najmniej jeden prezent")
  .max(20, "Maksymalnie 20 prezentów");

export const createWishlistSchema = z.object({
  firstName: nameField("Imię"),
  lastName: nameField("Nazwisko"),
  pin: pinField,
  gifts: giftsField,
});

export const updateWishlistSchema = z.object({
  id: z.string().min(1),
  pin: pinField,
  gifts: giftsField,
});

export const deleteWishlistSchema = z.object({
  id: z.string().min(1),
  secret: z.string().min(1, "Podaj PIN"),
});

export type GiftInput = z.infer<typeof giftSchema>;
export type CreateWishlistInput = z.infer<typeof createWishlistSchema>;
export type UpdateWishlistInput = z.infer<typeof updateWishlistSchema>;
export type DeleteWishlistInput = z.infer<typeof deleteWishlistSchema>;
