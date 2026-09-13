'use client';

import { useState } from 'react';
import { attractions, type Attraction } from '@/lib/content';

const CATEGORIES: Array<Attraction['category'] | 'All'> = [
  'All',
  'Diving',
  'Nature',
  'Cultural',
];

export default function Destination() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All');
  const visible =
    filter === 'All' ? attractions : attractions.filter((a) => a.category === filter);

  return (
    <section className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            Explore the Maldives
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  filter === cat
                    ? 'border-reef bg-reef text-foam'
                    : 'border-ink/15 text-slate/70 hover:border-reef/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <div key={a.name} className="rounded-sm border border-ink/10 bg-foam p-6">
              <span className="text-xs uppercase tracking-wide text-coral">
                {a.category}
              </span>
              <h3 className="mt-2 font-display text-lg text-ink">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate/70">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
