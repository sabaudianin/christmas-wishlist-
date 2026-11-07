const LAYERS = [
  { color: "#ff4d63", delay: 0 },
  { color: "#efc65a", delay: -0.6 },
  { color: "#4ade80", delay: -1.2 },
  { color: "#60a5fa", delay: -1.8 },
];

const SPACING = 30;
const PERIOD = SPACING * LAYERS.length;

type Edge = "top" | "bottom" | "left" | "right";

function Strip({ edge }: { edge: Edge }) {
  const orientation =
    edge === "top" || edge === "bottom" ? "lights-h" : "lights-v";

  return (
    <div
      aria-hidden
      className={`lights ${orientation} lights-${edge}`}
      style={{ "--period": `${PERIOD}px` } as React.CSSProperties}
    >
      {LAYERS.map((layer, i) => (
        <span
          key={layer.color}
          style={
            {
              "--c": layer.color,
              "--delay": `${layer.delay}s`,
              "--offset": `${i * SPACING}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function Lights() {
  return (
    <>
      <Strip edge="top" />
      <Strip edge="bottom" />
      <Strip edge="left" />
      <Strip edge="right" />
    </>
  );
}
