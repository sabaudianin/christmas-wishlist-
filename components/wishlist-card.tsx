import type { WishlistView } from "@/lib/wishlists";

export function WishlistCard({ wishlist }: { wishlist: WishlistView }) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        {wishlist.firstName} {wishlist.lastName}
      </h2>

      <ul className="mt-3 space-y-2">
        {wishlist.gifts.map((gift) => (
          <li key={gift.id} className="flex items-start gap-2">
            <span aria-hidden>🎁</span>
            {gift.url ? (
              <a
                href={gift.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 underline underline-offset-2 hover:text-red-900"
              >
                {gift.name}
              </a>
            ) : (
              <span>{gift.name}</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
