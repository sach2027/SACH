import type { Config } from 'tailwindcss';

// Design tokens for SACH 2027 — see DESIGN_NOTES.md for rationale.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E2422', // near-black deep teal — dark section backgrounds
        reef: {
          DEFAULT: '#164E45', // primary brand teal
          light: '#1F6B5C',
          dark: '#0C332C',
        },
        sand: '#EDE6D6', // warm sand — light section backgrounds
        foam: '#F6F3EA', // off-white — text on dark, cards on sand
        coral: {
          DEFAULT: '#BF4E30', // accent — CTAs, awards, highlights
          light: '#D97A5D',
          dark: '#973D25',
        },
        slate: {
          DEFAULT: '#3A433F', // body text on light backgrounds
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-plex)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
export default config;
