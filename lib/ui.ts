const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500";

export const inputClass =
  "w-full rounded-lg border border-pine-900/20 bg-white px-3 py-2 text-sm text-pine-950 outline-none placeholder:text-pine-900/40 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/50";

export const primaryButtonClass = `rounded-lg bg-berry-700 px-4 py-2 text-sm font-semibold text-cream-50 shadow-sm transition hover:bg-berry-800 disabled:opacity-60 ${focusRing}`;

export const secondaryButtonClass = `rounded-lg border border-pine-900/20 px-4 py-2 text-sm font-medium text-pine-900 transition hover:bg-cream-100 disabled:opacity-40 ${focusRing}`;

export const linkButtonClass = `text-sm font-medium text-berry-700 hover:text-berry-800 hover:underline disabled:opacity-50 ${focusRing}`;
