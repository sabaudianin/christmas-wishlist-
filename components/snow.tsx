const FLAKES = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 37) % 100,
  size: 3 + ((i * 5) % 5),
  dur: 9 + ((i * 7) % 9),
  delay: -((i * 3) % 14),
  drift: (i % 2 === 0 ? 1 : -1) * (10 + ((i * 11) % 30)),
  opacity: 0.35 + ((i * 13) % 5) / 10,
}));

export function Snow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {FLAKES.map((flake, i) => (
        <span
          key={i}
          className="snowflake"
          style={
            {
              "--x": `${flake.x}%`,
              "--size": `${flake.size}px`,
              "--dur": `${flake.dur}s`,
              "--delay": `${flake.delay}s`,
              "--drift": `${flake.drift}px`,
              "--o": flake.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
