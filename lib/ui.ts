const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

export const inputClass =
  "w-full rounded-lg border border-white/15 bg-pine-950/60 px-3 py-2 text-sm text-cream-50 outline-none placeholder:text-cream-100/40 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/40";

export const primaryButtonClass = `rounded-lg bg-berry-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-berry-800 disabled:opacity-60 ${focusRing}`;

export const secondaryButtonClass = `rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-cream-50 transition hover:bg-white/10 disabled:opacity-40 ${focusRing}`;

export const linkButtonClass = `text-sm font-medium text-gold-300 hover:text-gold-400 hover:underline disabled:opacity-50 ${focusRing}`;

export const heroButtonClass = `inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-10 py-5 font-display text-2xl text-pine-950 shadow-xl shadow-gold-500/25 ring-1 ring-gold-300/60 transition hover:scale-[1.03] hover:shadow-gold-500/40 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:scale-100 ${focusRing}`;
