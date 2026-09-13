'use client';

import { useEffect, useState } from 'react';
import { CONFERENCE_START_IST } from '@/lib/config';

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getRemaining(): Remaining {
  const target = new Date(CONFERENCE_START_IST).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, done: false };
}

const UNITS: { key: keyof Remaining; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
];

export default function Countdown() {
  // Start as null so server-rendered static HTML and first client render
  // match (avoids a hydration mismatch from time-dependent output).
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  const display = remaining ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={
        remaining
          ? `${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes to SACH 2027`
          : 'Loading countdown'
      }
      className="grid grid-cols-4 gap-3 sm:gap-4"
    >
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <span className="tabular-nums font-display text-3xl font-medium text-foam sm:text-4xl">
            {String(display[key]).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[11px] tracking-wide text-foam/60 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
      {remaining?.done && (
        <p className="col-span-4 mt-2 text-sm text-coral-light">
          The conference has begun — see you in Malé.
        </p>
      )}
    </div>
  );
}
