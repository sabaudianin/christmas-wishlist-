import { Suspense } from "react";
import { CreateWishlistForm } from "@/components/create-wishlist-form";
import { FestiveHeader } from "@/components/festive-header";
import { WishlistCard } from "@/components/wishlist-card";
import { getWishlists } from "@/lib/wishlists";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <FestiveHeader />

      <CreateWishlistForm />

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl text-gold-300">
          Listy życzeń
        </h2>
        <Suspense fallback={<ListSkeleton />}>
          <WishlistList />
        </Suspense>
      </section>
    </main>
  );
}

async function WishlistList() {
  const wishlists = await getWishlists();

  if (wishlists.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gold-400/40 bg-pine-900/40 p-10 text-center text-cream-100/80">
        Nikt jeszcze nie dodał swojej listy. Bądź pierwszy! 🎅
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {wishlists.map((wishlist) => (
        <WishlistCard key={wishlist.id} wishlist={wishlist} />
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="h-36 animate-pulse rounded-2xl bg-cream-50/10"
        />
      ))}
    </div>
  );
}
