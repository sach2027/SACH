/**
 * Wave edges that soften the seam between sections of different colour.
 * `color` is the colour of the section the wave belongs to visually
 * (the neighbouring section's background), so the seam reads as a shoreline.
 */
export function WaveTop({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-0 h-8 w-full sm:h-12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 0 H1440 V22 C1320 52 1200 52 1080 30 C960 8 840 8 720 30 C600 52 480 52 360 30 C240 8 120 8 0 30 Z"
        fill={color}
      />
    </svg>
  );
}

export function WaveBottom({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-8 w-full sm:h-12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 60 H1440 V38 C1320 8 1200 8 1080 30 C960 52 840 52 720 30 C600 8 480 8 360 30 C240 52 120 52 0 30 Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Layered sea, low sun and a distant palm island on the hero's bottom edge.
 * The waves stretch to fit; the sun and island are separate fixed-aspect
 * graphics so they never distort on narrow screens.
 */
export function HeroSea() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-52"
      aria-hidden="true"
    >
      {/* sun, centred on the horizon so the far wave hides its lower half */}
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[14%] w-20 bottom-[calc(42%-2.5rem)] sm:w-28 sm:bottom-[calc(42%-3.5rem)]"
        focusable="false"
      >
        <defs>
          <linearGradient id="sun-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8967A" />
            <stop offset="1" stopColor="#BF4E30" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="#D97A5D" opacity="0.10" />
        <circle cx="50" cy="50" r="32" fill="url(#sun-grad)" opacity="0.92" />
      </svg>

      {/* distant palm island */}
      <svg
        viewBox="0 0 260 90"
        className="absolute left-[8%] w-32 bottom-[38%] sm:w-52"
        focusable="false"
      >
        <path d="M0 90 C30 62 90 54 132 62 C172 56 216 70 250 90 Z" fill="#1F6B5C" />
        <g stroke="#1F6B5C" strokeWidth="3.5" fill="none" strokeLinecap="round">
          <path d="M80 62 C80 42 76 26 64 16" />
          <path d="M64 16 C76 6 90 8 98 18 M64 16 C52 6 38 10 34 20 M64 16 C66 2 78 -4 90 -2" />
          <path d="M136 62 C138 44 146 32 160 26" />
          <path d="M160 26 C170 18 182 20 188 28 M160 26 C152 18 142 20 138 28" />
        </g>
      </svg>

      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        focusable="false"
      >
        <path d="M0 150 C240 132 480 168 720 148 C960 128 1200 164 1440 144 V260 H0 Z" fill="#164E45" opacity="0.75" />
        <path d="M0 184 C200 162 420 204 720 178 C1000 154 1220 196 1440 172 V260 H0 Z" fill="#1F6B5C" opacity="0.5" />
        <path d="M0 214 C240 194 480 228 720 208 C960 188 1200 222 1440 204 V260 H0 Z" fill="#164E45" opacity="0.85" />
        <path d="M0 240 C260 224 520 250 800 234 C1080 218 1260 246 1440 232 V260 H0 Z" fill="#EDE6D6" />
      </svg>
    </div>
  );
}
