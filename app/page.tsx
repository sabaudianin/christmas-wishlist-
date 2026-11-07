import { Suspense } from "react";
import { WishlistCard } from "@/components/wishlist-card";
import { getWishlists } from "@/lib/wishlists";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-red-700">
        Świąteczne listy prezentów 🎄
      </h1>
      <p className="mt-2 text-neutral-600">
        Dodaj swoją listę, a koledzy i koleżanki będą wiedzieć, co Cię ucieszy.
      </p>

      {/* Krok 8: tutaj trafi formularz dodawania */}

      <section className="mt-8">
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
      <p className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
        Nikt jeszcze nie dodał swojej listy. Bądź pierwszy! 🎅
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {wishlists.map((wishlist) => (
        <WishlistCard key={wishlist.id} wishlist={wishlist} />
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-xl bg-neutral-100" />
      ))}
    </div>
  );
}
