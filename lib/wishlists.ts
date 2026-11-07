import { prisma } from "@/lib/db";

const collator = new Intl.Collator("pl");

export async function getWishlists() {
  const wishlists = await prisma.wishlist.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      gifts: { select: { id: true, name: true, url: true } },
    },
  });

  return wishlists.sort(
    (a, b) =>
      collator.compare(a.lastName, b.lastName) ||
      collator.compare(a.firstName, b.firstName),
  );
}

export type WishlistView = Awaited<ReturnType<typeof getWishlists>>[number];
