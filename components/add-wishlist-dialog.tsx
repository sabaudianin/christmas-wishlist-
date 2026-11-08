"use client";

import { useRef } from "react";
import { CreateWishlistForm } from "@/components/create-wishlist-form";
import { heroButtonClass, secondaryButtonClass } from "@/lib/ui";

export function AddWishlistDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open() {
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="mt-10 flex justify-center">
        <button type="button" onClick={open} className={heroButtonClass}>
          <span aria-hidden className="animate-pulse">
            🎁
          </span>{" "}
          Dodaj swój prezent
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="add-wishlist-title"
        className="m-auto max-h-[90dvh] w-[min(92vw,42rem)] overflow-y-auto rounded-2xl bg-pine-900/95 p-0 text-cream-50 shadow-2xl shadow-black/50 ring-1 ring-gold-400/30 backdrop:bg-pine-950/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
          <h2 id="add-wishlist-title" className="font-display text-2xl">
            Dodaj swój prezent
          </h2>

          <button
            type="button"
            onClick={close}
            aria-label="Zamknij okno"
            className={`${secondaryButtonClass} px-3`}
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <CreateWishlistForm onSuccess={close} />
        </div>
      </dialog>
    </>
  );
}
