import { awards } from '@/lib/content';

export default function Awards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {awards.map((award) => (
        <div key={award.name} className="rounded-sm border border-foam/15 p-6">
          <p className="font-display text-xs uppercase tracking-wide text-coral-light">
            {award.winners}
          </p>
          <h3 className="mt-2 font-display text-lg text-foam">{award.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-foam/70">
            {award.eligibility}
          </p>
          {award.amount && (
            <p className="mt-3 text-sm font-medium text-coral-light">
              {award.amount}
            </p>
          )}
          {award.note && (
            <p className="mt-3 text-xs leading-relaxed text-foam/50">
              {award.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
