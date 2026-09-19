import Awards from './Awards';
import InterestForm from './InterestForm';

export default function RegisterSection() {
  return (
    <section id="grants-awards" className="bg-ink py-20 sm:py-28">
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

        <div
          id="register"
          className="mt-16 max-w-2xl scroll-mt-8 rounded-sm bg-foam p-4 sm:p-8"
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
      </div>
    </section>
  );
}
