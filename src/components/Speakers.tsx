'use client';

import { useState } from 'react';
import { speakers, type Speaker } from '@/lib/content';

function SpeakerCard({
  speaker,
  onOpen,
}: {
  speaker: Speaker;
  onOpen: (s: Speaker) => void;
}) {
  return (
    <button
      onClick={() => onOpen(speaker)}
      className="group flex flex-col items-start rounded-sm border border-ink/10 bg-foam p-5 text-left transition-colors hover:border-coral/40"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-reef/10 font-display text-lg text-reef">
        {speaker.name
          .replace('Dr. ', '')
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')}
      </div>
      <h3 className="font-display text-lg text-ink">{speaker.name}</h3>
      <p className="mt-1 text-sm text-slate/70">{speaker.country}</p>
      <span className="mt-4 text-xs text-coral opacity-0 transition-opacity group-hover:opacity-100">
        View details →
      </span>
    </button>
  );
}

function ComingSoonCard() {
  return (
    <div className="flex flex-col items-start justify-center rounded-sm border border-dashed border-ink/20 bg-transparent p-5">
      <p className="font-display text-lg text-ink/50">SAARC speakers</p>
      <p className="mt-1 text-sm text-slate/50">To be announced soon</p>
    </div>
  );
}

export default function Speakers() {
  const [active, setActive] = useState<Speaker | null>(null);
  const nonSaarc = speakers.filter((s) => s.region === 'non-saarc');

  return (
    <section id="speakers" className="bg-foam py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
          Scientific Program &amp; Speakers
        </h2>

        <h3 className="mt-12 text-sm font-medium uppercase tracking-wide text-slate/60">
          Non-SAARC speakers
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nonSaarc.map((s) => (
            <SpeakerCard key={s.name} speaker={s} onOpen={setActive} />
          ))}
        </div>

        <h3 className="mt-14 text-sm font-medium uppercase tracking-wide text-slate/60">
          SAARC speakers
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ComingSoonCard />
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="speaker-modal-title"
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-md rounded-sm bg-foam p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="speaker-modal-title" className="font-display text-2xl text-ink">
              {active.name}
            </h3>
            <p className="mt-1 text-sm text-slate/70">{active.country}</p>
            <p className="mt-5 text-sm text-slate/70">
              {active.sessionTopic ??
                'Session topic and full bio will be published closer to the conference.'}
            </p>
            <button
              onClick={() => setActive(null)}
              className="mt-6 text-sm font-medium text-coral hover:text-coral-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
