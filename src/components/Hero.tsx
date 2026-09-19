import Countdown from './Countdown';
import { SITE } from '@/lib/config';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-28">
        {/* Left: identity + CTAs */}
        <div className="animate-rise [animation-delay:0ms] opacity-0">
          <p className="font-display text-sm text-coral-light">
            8th South-Asian Academy of Cytopathology &amp; Histopathology
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-foam sm:text-5xl lg:text-[3.25rem]">
            SACH 2027, Malé
          </h1>
          <p className="mt-5 max-w-md font-display text-xl italic text-foam/85 sm:text-2xl">
            {SITE.motto}
          </p>

          <dl className="mt-8 space-y-2 border-l border-foam/20 pl-5 text-foam/80">
            <div className="flex gap-2 text-sm sm:text-base">
              <dt className="w-16 shrink-0 text-foam/50">Dates</dt>
              <dd>{SITE.dates}</dd>
            </div>
            <div className="flex gap-2 text-sm sm:text-base">
              <dt className="w-16 shrink-0 text-foam/50">Venue</dt>
              <dd>{SITE.venue}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#register"
              className="rounded-sm bg-coral px-6 py-3 text-sm font-medium text-foam transition-colors hover:bg-coral-dark"
            >
              Register Your Interest
            </a>
            <a
              href="#logistics"
              className="rounded-sm border border-foam/30 px-6 py-3 text-sm font-medium text-foam transition-colors hover:border-foam/60"
            >
              Contact Logistics
            </a>
          </div>
        </div>

        {/* Right: specimen-ring graphic holding the countdown */}
        <div className="animate-rise [animation-delay:150ms] opacity-0 justify-self-center">
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
            <svg
              viewBox="0 0 320 320"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <circle cx="160" cy="160" r="155" fill="none" stroke="#F6F3EA" strokeOpacity="0.12" />
              <circle cx="160" cy="160" r="120" fill="none" stroke="#F6F3EA" strokeOpacity="0.18" />
              <line x1="160" y1="5" x2="160" y2="35" stroke="#BF4E30" strokeWidth="1.5" />
              <line x1="160" y1="285" x2="160" y2="315" stroke="#F6F3EA" strokeOpacity="0.3" strokeWidth="1" />
              <line x1="5" y1="160" x2="35" y2="160" stroke="#F6F3EA" strokeOpacity="0.3" strokeWidth="1" />
              <line x1="285" y1="160" x2="315" y2="160" stroke="#F6F3EA" strokeOpacity="0.3" strokeWidth="1" />
            </svg>
            <div className="z-10 flex flex-col items-center text-center">
              <span className="mb-3 text-[11px] tracking-wide text-foam/50">
                Countdown to opening day
              </span>
              <Countdown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
