import { speakers, type Speaker } from '@/lib/content';

// On large screens the cards sit on an 8-column grid (each card spans 2) and
// rows alternate 4 and 3 cards, with each row centred (e.g. 13 cards = 4-3-4-2).
// Literal class names so Tailwind can detect them.
const ROW_START: Record<number, string> = {
  1: 'lg:col-start-4',
  2: 'lg:col-start-3',
  3: 'lg:col-start-2',
  4: 'lg:col-start-1',
};

function rowStartClasses(count: number): Map<number, string> {
  const starts = new Map<number, string>();
  let i = 0;
  let row = 0;
  while (i < count) {
    const len = Math.min(row % 2 === 0 ? 4 : 3, count - i);
    starts.set(i, ROW_START[len]);
    i += len;
    row += 1;
  }
  return starts;
}

function SpeakerCard({ speaker, className = '' }: { speaker: Speaker; className?: string }) {
  return (
    <div
      className={`flex flex-col items-start rounded-sm border border-ink/10 bg-foam p-5 text-left lg:col-span-2 ${className}`}
    >
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
  const rowStarts = rowStartClasses(nonSaarc.length);

  return (
    <section id="speakers" className="bg-foam py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
          Scientific Program &amp; Speakers
        </h2>

        <h3 className="mt-12 text-sm font-medium uppercase tracking-wide text-slate/60">
          Non-SAARC Country speakers
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-8">
          {nonSaarc.map((s, i) => (
            <SpeakerCard key={s.name} speaker={s} className={rowStarts.get(i) ?? ''} />
          ))}
        </div>

        <h3 className="mt-14 text-sm font-medium uppercase tracking-wide text-slate/60">
          SAARC Country speakers
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ComingSoonCard />
        </div>
      </div>

    </section>
  );
}
