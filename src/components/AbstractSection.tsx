import Awards from './Awards';
import AbstractForm from './AbstractForm';

export default function AbstractSection() {
  return (
    <section id="abstracts" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-medium text-foam sm:text-4xl">
          Grants and Awards
        </h2>
        <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-foam/70">
          Submit your abstract and you&apos;ll automatically be considered for
          the awards below — reviewed by the Scientific Committee. No
          separate application is needed except for the Young Investigator
          Award.
        </p>

        <div className="mt-10">
          <Awards />
        </div>

        <div className="mt-16 max-w-2xl rounded-sm bg-foam p-4 sm:p-8">
          <h3 className="font-display text-xl text-ink">Submit your abstract</h3>
          <div className="mt-4">
            <AbstractForm />
          </div>
        </div>
      </div>
    </section>
  );
}
