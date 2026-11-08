import { WishlistActions } from "@/components/wishlist-actions";
import { GiftReveal } from "@/components/wishlist-card-reveval";
import type { WishlistView } from "@/lib/wishlists";

export function WishlistCard({ wishlist }: { wishlist: WishlistView }) {
  return (
    <article className="group relative opacity-80 isolate overflow-hidden rounded-3xl border border-white/15 bg-linear-to-br from-white/10 via-white/[0.07] to-white/5 p-5 pt-7 text-cream-50 shadow-[0_8px_32px_rgb(0_0_0/0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/30 hover:shadow-[0_16px_40px_rgb(0_0_0/0.3)]">
      {/* Złota poświata */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 -z-10 size-48 rounded-full bg-gold-300/10 blur-3xl transition-all duration-500 group-hover:bg-gold-300/20"
      />

      {/* Górny refleks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent"
      />

      {/* Świąteczny akcent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-berry-700/70 via-gold-300/80 to-berry-700/70"
      />

      <div className="relative z-10">
        <h2 className="font-display text-2xl text-cream-50 drop-shadow-sm">
          {wishlist.firstName} {wishlist.lastName}
        </h2>

        <div className="mt-5 grid gap-3">
          {wishlist.gifts.map((gift) => (
            <GiftReveal key={gift.id} name={gift.name} url={gift.url} />
          ))}
        </div>

        <WishlistActions wishlist={wishlist} />
      </div>

      {/* Dolny refleks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-linear-to-r from-transparent via-red-500/25 to-transparent"
      />
    </article>
  );
}
