import type { ReactElement } from 'react';

/**
 * Flat vector panels for the destination cards. Drawn in the site palette
 * (deep teal, sand, coral, foam) plus a muted lagoon tone, so they read as
 * one family. Each panel is 400x160 and scales to the card width.
 */

const LAGOON = '#7FB5AB';
const LAGOON_DEEP = '#2F7F73';

function Panel({
  id,
  from,
  to,
  children,
}: {
  id: string;
  from: string;
  to: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 400 160"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill={`url(#${id}-bg)`} />
      {children}
    </svg>
  );
}

function Manta({ x, y, s, o }: { x: number; y: number; s: number; o: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path
        d="M0 -22 C22 -12 66 -8 104 -22 C90 2 48 16 10 20 L0 58 L-10 20 C-48 16 -90 2 -104 -22 C-66 -8 -22 -12 0 -22 Z"
        fill="#F6F3EA"
      />
      <path d="M0 20 L0 62" stroke="#F6F3EA" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-9" cy="-14" r="3" fill="#0E2422" />
      <circle cx="9" cy="-14" r="3" fill="#0E2422" />
    </g>
  );
}

function Fish({ x, y, s = 1, c = '#F6F3EA', flip = false }: { x: number; y: number; s?: number; c?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 0 C8 -8 22 -8 30 0 C22 8 8 8 0 0 Z" fill={c} />
      <path d="M28 0 L38 -7 L38 7 Z" fill={c} />
      <circle cx="8" cy="-1.5" r="1.4" fill="#0E2422" />
    </g>
  );
}

function Dolphin({ x, y, s, r }: { x: number; y: number; s: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill="#0E2422">
      <path d="M62 0 C52 -6 44 -12 30 -16 C10 -22 -18 -20 -40 -6 C-48 -1 -54 6 -58 12 C-40 16 -14 18 8 12 C26 8 42 8 52 5 C57 4 60 2 62 0 Z" />
      <path d="M-6 -21 C-2 -34 8 -38 16 -34 C10 -30 6 -26 4 -20 Z" />
      <path d="M20 9 C18 20 10 26 2 26 C6 18 8 12 8 9 Z" />
      <path d="M-58 10 L-78 0 C-74 8 -74 16 -80 24 L-58 16 Z" />
    </g>
  );
}

const art: Record<string, () => ReactElement> = {
  'Hanifaru Bay': () => (
    <Panel id="manta" from="#164E45" to="#0C332C">
      <path d="M120 0 L180 160 M200 0 L240 160 M290 0 L300 160" stroke="#7FB5AB" strokeOpacity="0.12" strokeWidth="22" />
      {[...Array(26)].map((_, i) => (
        <circle key={i} cx={(i * 53 + 17) % 400} cy={(i * 37 + 9) % 160} r={(i % 3) + 0.8} fill="#F6F3EA" opacity="0.25" />
      ))}
      <Manta x={230} y={70} s={1} o={0.95} />
      <Manta x={95} y={104} s={0.55} o={0.55} />
      <Manta x={340} y={40} s={0.4} o={0.4} />
    </Panel>
  ),

  'South Ari Atoll': () => (
    <Panel id="whaleshark" from="#1F6B5C" to="#0E2422">
      <path d="M0 40 C60 30 120 44 200 36 C280 28 340 40 400 32" stroke="#F6F3EA" strokeOpacity="0.15" strokeWidth="2" fill="none" />
      <g>
        <path
          d="M46 88 C90 56 190 50 282 72 C314 80 344 76 366 58 C360 84 352 98 366 124 C340 108 316 108 296 108 C230 120 130 122 46 88 Z"
          fill={LAGOON_DEEP}
        />
        <path d="M150 62 C158 42 176 38 190 44 C180 50 176 56 174 64 Z" fill={LAGOON_DEEP} />
        <path d="M120 104 C110 124 120 136 150 138 C146 126 148 116 156 108 Z" fill="#1F6B5C" />
        {[[110, 84], [136, 76], [162, 80], [190, 72], [216, 78], [246, 82], [130, 96], [176, 94], [220, 96], [268, 92], [100, 96], [200, 86]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 ? 2.2 : 3} fill="#F6F3EA" opacity="0.9" />
        ))}
        <circle cx="66" cy="90" r="2.4" fill="#0E2422" />
      </g>
      <Fish x={300} y={130} s={0.5} c={LAGOON} />
      <Fish x={330} y={140} s={0.4} c={LAGOON} />
      <Fish x={60} y={30} s={0.45} c="#F6F3EA" flip />
    </Panel>
  ),

  'Vaadhoo Island': () => (
    <Panel id="stars" from="#0E2422" to="#164E45">
      {[...Array(34)].map((_, i) => (
        <circle key={i} cx={(i * 47 + 13) % 400} cy={(i * 23 + 7) % 70} r={(i % 4 === 0 ? 1.6 : 0.9)} fill="#F6F3EA" opacity={0.5 + (i % 3) * 0.15} />
      ))}
      <circle cx="322" cy="34" r="14" fill="#F6F3EA" opacity="0.9" />
      <circle cx="328" cy="30" r="13" fill="#0E2422" />
      <path d="M0 96 C90 88 180 100 260 92 C320 86 360 94 400 90 L400 160 L0 160 Z" fill="#0C332C" />
      <path d="M0 122 C100 100 220 128 400 106 L400 160 L0 160 Z" fill="#0A2420" />
      {[...Array(46)].map((_, i) => {
        const x = (i * 29 + 11) % 400;
        const y = 104 + ((i * 17) % 44) - (x / 400) * 8;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={5} fill="#8FE3D6" opacity="0.10" />
            <circle cx={x} cy={y} r={1.8 + (i % 3) * 0.5} fill="#A6F0E3" opacity="0.9" />
          </g>
        );
      })}
    </Panel>
  ),

  'Scuba Diving & Snorkeling': () => (
    <Panel id="dive" from="#2F7F73" to="#0C332C">
      <path d="M60 0 L110 160 M170 0 L200 160 M300 0 L280 160" stroke="#F6F3EA" strokeOpacity="0.07" strokeWidth="26" />
      {[[120, 120, 5], [128, 100, 3.5], [122, 82, 2.5], [300, 110, 4], [306, 90, 3], [312, 72, 2]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#F6F3EA" strokeOpacity="0.8" strokeWidth="1.5" />
      ))}
      <Fish x={180} y={54} s={1.1} c="#F6F3EA" />
      <Fish x={230} y={72} s={0.8} c="#F6F3EA" />
      <Fish x={210} y={40} s={0.7} c={LAGOON} />
      <Fish x={60} y={64} s={0.9} c="#D97A5D" flip />
      <Fish x={350} y={98} s={0.7} c={LAGOON} flip />
      <path d="M0 160 L0 138 C30 122 50 138 70 122 C90 108 110 134 130 160 Z" fill="#973D25" />
      <path d="M230 160 C236 130 250 116 262 100 C268 122 278 134 290 160 Z" fill="#BF4E30" />
      <path d="M300 160 C310 136 326 128 340 112 C346 132 360 142 372 160 Z" fill="#D97A5D" />
      <path d="M340 160 L400 150 L400 160 Z" fill="#164E45" />
    </Panel>
  ),

  'Sandbank Picnics': () => (
    <Panel id="sandbank" from="#F6F3EA" to="#EDE6D6">
      <circle cx="80" cy="44" r="22" fill="#D97A5D" opacity="0.9" />
      <rect y="86" width="400" height="74" fill={LAGOON} />
      <path d="M0 100 C80 92 160 106 240 98 C300 92 350 102 400 96 L400 160 L0 160 Z" fill="#5FA8A0" />
      <path d="M0 122 C100 112 200 130 400 116 L400 160 L0 160 Z" fill={LAGOON_DEEP} opacity="0.9" />
      <path d="M110 118 C140 96 260 94 300 116 C260 130 150 132 110 118 Z" fill="#EAD9A8" />
      <path d="M204 112 L204 74" stroke="#3A433F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M170 78 C180 58 228 58 238 78 C226 72 182 72 170 78 Z" fill="#BF4E30" />
      <path d="M187 76 C192 62 198 60 204 60 C204 66 202 72 200 76 Z" fill="#F6F3EA" opacity="0.6" />
      <path d="M232 112 L262 108 L268 116 L238 120 Z" fill="#973D25" />
      <path d="M150 116 L170 112 L176 118 L156 122 Z" fill="#F6F3EA" />
    </Panel>
  ),

  'Local Island Visits': () => (
    <Panel id="island" from="#EDE6D6" to="#D9CFB8">
      <circle cx="330" cy="40" r="18" fill="#D97A5D" opacity="0.85" />
      <rect x="0" y="122" width="400" height="38" fill="#7FB5AB" />
      <rect x="0" y="118" width="400" height="8" fill="#EAD9A8" />
      {[[30, '#E9C9B5'], [88, '#C9D8CF'], [146, '#EAD9A8'], [204, '#B9CFCB']].map(([x, c], i) => (
        <g key={i}>
          <rect x={x as number} y={i % 2 ? 76 : 86} width="48" height={i % 2 ? 42 : 32} fill={c as string} />
          <path d={`M${(x as number) - 4} ${i % 2 ? 76 : 86} L${(x as number) + 24} ${i % 2 ? 58 : 68} L${(x as number) + 52} ${i % 2 ? 76 : 86} Z`} fill="#BF4E30" opacity="0.85" />
          <rect x={(x as number) + 18} y={i % 2 ? 96 : 100} width="12" height="18" fill="#3A433F" opacity="0.7" />
        </g>
      ))}
      <rect x="270" y="70" width="52" height="48" fill="#F6F3EA" />
      <path d="M270 70 C270 42 322 42 322 70 Z" fill="#164E45" />
      <path d="M296 36 L296 26" stroke="#164E45" strokeWidth="2" />
      <rect x="330" y="46" width="10" height="72" fill="#F6F3EA" />
      <path d="M328 46 L335 32 L342 46 Z" fill="#164E45" />
      <path d="M356 118 C356 96 350 80 340 70 M356 118 C358 96 366 84 380 78" stroke="#164E45" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M340 70 C350 64 360 66 366 74 M340 70 C332 62 324 64 320 72 M380 78 C388 72 396 74 400 82" stroke="#1F6B5C" strokeWidth="4" fill="none" strokeLinecap="round" />
    </Panel>
  ),

  'Sunset Dolphin Cruises': () => (
    <Panel id="dolphin" from="#D97A5D" to="#EDE6D6">
      <circle cx="200" cy="96" r="44" fill="#F6F3EA" opacity="0.85" />
      <circle cx="200" cy="96" r="30" fill="#EAD9A8" />
      <rect y="96" width="400" height="64" fill="#164E45" />
      <path d="M0 108 C100 100 200 114 300 106 C350 102 380 108 400 106 L400 160 L0 160 Z" fill="#0C332C" />
      <path d="M150 104 L250 104" stroke="#F6F3EA" strokeOpacity="0.4" strokeWidth="2" />
      <path d="M170 116 L230 116" stroke="#F6F3EA" strokeOpacity="0.3" strokeWidth="2" />
      <Dolphin x={112} y={66} s={0.7} r={-28} />
      <Dolphin x={300} y={78} s={0.5} r={22} />
      <path d="M330 118 L372 118 L364 128 L338 128 Z" fill="#0E2422" />
      <path d="M350 118 L350 98 L366 116 Z" fill="#F6F3EA" />
    </Panel>
  ),
};

export default function AttractionArt({ name }: { name: string }) {
  const Art = art[name];
  return Art ? <Art /> : null;
}

/** Sunset lagoon with overwater villas, used beside the interest form. */
export function VenueArt() {
  return (
    <Panel id="venue" from="#D97A5D" to="#F6F3EA">
      <circle cx="258" cy="100" r="46" fill="#F6F3EA" opacity="0.85" />
      <circle cx="258" cy="100" r="32" fill="#EAD9A8" />
      <rect y="100" width="400" height="60" fill="#164E45" />
      <path d="M0 112 C100 104 200 118 300 110 C350 106 380 112 400 110 V160 H0 Z" fill="#0C332C" />
      <path d="M212 108 L304 108 M226 118 L290 118" stroke="#F6F3EA" strokeOpacity="0.35" strokeWidth="2" />
      <g fill="#0E2422">
        <path d="M100 112 H196 V116 H100 Z" />
        {[104, 134, 164].map((x) => (
          <g key={x}>
            <path d={`M${x} 112 V98 L${x + 13} 86 L${x + 26} 98 V112 Z`} />
            <path d={`M${x + 4} 112 V124 M${x + 22} 112 V124`} stroke="#0E2422" strokeWidth="2" />
          </g>
        ))}
      </g>
    </Panel>
  );
}
