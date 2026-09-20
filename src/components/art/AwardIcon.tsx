export type AwardIconName = 'medal' | 'mic' | 'poster' | 'plane';

/** 32px line icons for the award and grant cards. */
export default function AwardIcon({ name }: { name: AwardIconName }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  };
  switch (name) {
    case 'medal':
      return (
        <svg {...common}>
          <circle cx="16" cy="19" r="7" />
          <path d="M16 15.5l1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4z" />
          <path d="M11.5 13.5L8 4h5l3 6 3-6h5l-3.5 9.5" />
        </svg>
      );
    case 'mic':
      return (
        <svg {...common}>
          <rect x="12" y="4" width="8" height="14" rx="4" />
          <path d="M8 15c0 4.4 3.6 8 8 8s8-3.6 8-8M16 23v5M11 28h10" />
        </svg>
      );
    case 'poster':
      return (
        <svg {...common}>
          <rect x="5" y="5" width="22" height="16" rx="1.5" />
          <path d="M9 17l4-5 3 3 5-6M12 21l-3 7M20 21l3 7" />
        </svg>
      );
    case 'plane':
      return (
        <svg {...common}>
          <path d="M4 17l24-11-6 20-7-7-6 3 1-7z" />
          <path d="M15 19l13-13" />
        </svg>
      );
  }
}
