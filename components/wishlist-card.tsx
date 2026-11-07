import { WishlistActions } from "@/components/wishlist-actions";
import type { WishlistView } from "@/lib/wishlists";

export function WishlistCard({ wishlist }: { wishlist: WishlistView }) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-cream-50 p-5 pt-6 text-pine-950 shadow-xl shadow-black/30 ring-1 ring-gold-400/40 transition hover:-translate-y-0.5 hover:shadow-2xl">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-berry-700 via-berry-600 to-berry-700"
      />

      <h2 className="font-display text-xl font-semibold">
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
                className="font-medium text-berry-700 underline decoration-gold-500 underline-offset-4 hover:text-berry-800"
              >
                {gift.name}
              </a>
            ) : (
              <span>{gift.name}</span>
            )}
          </li>
        ))}
      </ul>

      <WishlistActions wishlist={wishlist} />
    </article>
  );
}
