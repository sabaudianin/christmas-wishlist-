"use client";

import { useState } from "react";

type GiftRevealProps = {
  name: string;
  url?: string | null;
};

export function GiftReveal({ name, url }: GiftRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="perspective-[1000px]">
      <div
        className={`relative grid min-h-28 transition-transform duration-700 transform-3d ${
          revealed ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* Przód - prezent ukryty */}
        <button
          type="button"
          onClick={() => setRevealed(true)}
          aria-expanded={revealed}
          className="col-start-1 row-start-1 flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 shadow-inner shadow-white/5 transition-colors hover:border-gold-300/40 hover:bg-white/10 backface-hidden"
        >
          <span aria-hidden className="text-3xl">
            🎁
          </span>

          <span className="text-sm font-semibold text-gold-300">
            Pokaż prezent
          </span>
        </button>

        {/* Tył - odkryty prezent */}
        <div
          role="button"
          tabIndex={revealed ? 0 : -1}
          aria-label={`Ukryj prezent: ${name}`}
          onClick={() => setRevealed(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setRevealed(false);
            }
          }}
          className="col-start-1 row-start-1 flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-gold-300/25 bg-pine-800/90 px-4 py-3 text-center shadow-inner shadow-gold-300/5 transform-[rotateY(180deg)] backface-hidden"
          aria-hidden={!revealed}
        >
          <span aria-hidden className="text-xl">
            🎁
          </span>

          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={revealed ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-semibold text-gold-300 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:text-gold-400"
            >
              {name}
            </a>
          ) : (
            <span className="text-sm font-semibold text-cream-50">{name}</span>
          )}

          <span className="mt-1 text-xs text-cream-50/60">
            Kliknij, w opis aby zobaczyć gdzie znaleźć prezent
          </span>
        </div>
      </div>
    </div>
  );
}
