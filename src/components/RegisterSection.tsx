import Awards from './Awards';
import { WaveTop, WaveBottom } from './art/Waves';
import { VenueArt } from './art/AttractionArt';
import { SITE } from '@/lib/config';
import InterestForm from './InterestForm';

export default function RegisterSection() {
  return (
    <section id="grants-awards" className="relative bg-ink py-24 sm:py-32">
      <WaveTop color="#F6F3EA" />
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-medium text-foam sm:text-4xl">
          Grants and Awards
        </h2>
        <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-foam/70">
          SACH 2027 will recognise outstanding work with awards and travel
          grants for abstract presenters. Abstract submission details will be
          announced soon. Register your interest below and we will let you know
          as soon as registration and abstract submission open.
        </p>

        <div className="mt-10">
          <Awards />
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,42rem)_1fr]">
        <div
          id="register"
          className="rounded-sm bg-foam p-4 sm:p-8"
        >
          <h3 className="font-display text-xl text-ink">
            Register your interest
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate/70">
            Tell us a little about yourself and we will notify you when
            registration opens.
          </p>
          <div className="mt-4">
            <InterestForm />
          </div>
        </div>

        <aside className="overflow-hidden rounded-sm border border-foam/15">
          <div className="h-52">
            <VenueArt />
          </div>
          <div className="p-6">
            <p className="text-xs uppercase tracking-wide text-coral-light">
              Save the date
            </p>
            <p className="mt-2 font-display text-2xl text-foam">{SITE.dates}</p>
            <p className="mt-1 text-sm text-foam/70">{SITE.venue}</p>
            <p className="mt-4 text-sm leading-relaxed text-foam/60">
              Register your interest and we will contact you as soon as
              registration opens.
            </p>
          </div>
        </aside>
        </div>
      </div>
      <WaveBottom color="#EDE6D6" />
    </section>
  );
}
