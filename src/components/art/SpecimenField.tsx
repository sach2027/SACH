/**
 * A stylised stained-tissue field of view: a circular "microscope" window
 * filled with cells (coral cytoplasm, dark teal nuclei). Positions come from
 * a fixed seed so server and client render identically.
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function SpecimenField({ className = '' }: { className?: string }) {
  const rand = seeded(42);
  const cells = Array.from({ length: 46 }, () => ({
    x: 30 + rand() * 240,
    y: 30 + rand() * 240,
    r: 9 + rand() * 15,
    n: 3 + rand() * 4,
    o: 0.35 + rand() * 0.5,
  }));

  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="specimen-clip">
          <circle cx="150" cy="150" r="128" />
        </clipPath>
        <radialGradient id="specimen-bg" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#F6F3EA" />
          <stop offset="1" stopColor="#E7D9C6" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="146" fill="none" stroke="#164E45" strokeOpacity="0.25" />
      <circle cx="150" cy="150" r="138" fill="none" stroke="#164E45" strokeOpacity="0.4" strokeWidth="6" />
      <g clipPath="url(#specimen-clip)">
        <rect width="300" height="300" fill="url(#specimen-bg)" />
        {cells.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r={c.r} fill="#D97A5D" opacity={c.o} />
            <circle cx={c.x + 1} cy={c.y - 1} r={c.n + 1.5} fill="#164E45" opacity="0.85" />
          </g>
        ))}
      </g>
      <line x1="150" y1="6" x2="150" y2="30" stroke="#BF4E30" strokeWidth="1.5" />
      <line x1="150" y1="270" x2="150" y2="294" stroke="#164E45" strokeOpacity="0.4" />
      <line x1="6" y1="150" x2="30" y2="150" stroke="#164E45" strokeOpacity="0.4" />
      <line x1="270" y1="150" x2="294" y2="150" stroke="#164E45" strokeOpacity="0.4" />
    </svg>
  );
}
