type Props = {
  tone?: 'on-sand' | 'on-ink';
};

/**
 * The horizon-line motif: a thin rule standing in for the sea horizon at
 * the venue. Used consistently as the transition between sections instead
 * of generic spacing or numbered step markers.
 */
export default function SectionDivider({ tone = 'on-sand' }: Props) {
  const lineColor = tone === 'on-sand' ? 'bg-reef/25' : 'bg-foam/20';
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className={`h-px w-full ${lineColor}`} />
    </div>
  );
}
