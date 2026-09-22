import Image from 'next/image';
import { speakers, type Speaker } from '@/lib/content';
import { asset } from '@/lib/assets';

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex flex-col items-start rounded-sm border border-ink/10 bg-foam p-5 pb-4 text-left">
      {speaker.photo ? (
        <Image
          src={asset(speaker.photo)}
          alt={speaker.name}
          width={160}
          height={160}
          className="mb-3 h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-reef/10 font-display text-xl text-reef">
          {speaker.name
            .replace('Dr. ', '')
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')}
        </div>
      )}
      <h3 className="font-display text-lg text-ink">{speaker.name}</h3>
      <p className="mt-1 text-sm text-slate/70">{speaker.country}</p>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div className="flex flex-col items-start justify-center rounded-sm border border-dashed border-ink/20 bg-transparent p-5">
      <p className="font-display text-lg text-ink/50">SAARC Country speakers</p>
      <p className="mt-1 text-sm text-slate/50">To be announced soon</p>
    </div>
  );
}

export default function Speakers() {
  const nonSaarc = speakers.filter((s) => s.region === 'non-saarc');

  return (
    <section id="speakers" className="bg-foam py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
          Scientific Program &amp; Speakers
        </h2>

        <h3 className="mt-12 text-sm font-medium uppercase tracking-wide text-slate/60">
          Non-SAARC Country speakers
        </h3>
        <div className="mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nonSaarc.map((s) => (
            <SpeakerCard key={s.name} speaker={s} />
          ))}
        </div>

        <h3 className="mt-14 text-sm font-medium uppercase tracking-wide text-slate/60">
          SAARC Country speakers
        </h3>
        <div className="mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ComingSoonCard />
        </div>
      </div>

    </section>
  );
}
