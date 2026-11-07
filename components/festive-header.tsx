const BULB_COLORS = ["#c0263b", "#efc65a", "#4ade80", "#f5d98a", "#60a5fa"];

const BULBS = Array.from({ length: 18 }, (_, i) => ({
  color: BULB_COLORS[i % BULB_COLORS.length],
  delay: -((i * 0.37) % 2.5),
}));

function Garland() {
  return (
    <div aria-hidden className="relative mb-8 flex justify-between px-2">
      <div className="absolute inset-x-0 top-0 h-px bg-gold-500/40" />
      {BULBS.map((bulb, i) => (
        <span
          key={i}
          className="bulb"
          style={
            {
              "--c": bulb.color,
              "--delay": `${bulb.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function FestiveHeader() {
  return (
    <header className="pt-0 text-center">
      <Garland />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gold-300 sm:text-5xl">
        <span aria-hidden>🎄 </span>Świąteczne listy prezentów
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-cream-100/80">
        Dodaj swoją listę życzeń, a koledzy i koleżanki będą wiedzieć, co Cię
        ucieszy.
      </p>
    </header>
  );
}
