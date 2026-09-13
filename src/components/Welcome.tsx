export default function Welcome() {
  return (
    <section className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Welcome to SACH 2027
          </h2>
          <div className="max-w-prose space-y-5 text-[17px] leading-relaxed text-slate">
            <p>
              We gather in this serene island nation to share knowledge and
              celebrate the spirit of collaboration that defines our
              Academy. Over three days, we&apos;ll engage in thought-provoking
              discussions, cutting-edge presentations, and meaningful
              exchanges that strengthen our collective mission of advancing
              cytopathology and histopathology across South Asia and beyond.
            </p>
            <p>
              This conference is a platform for building bridges between
              disciplines, institutions, and nations — reaffirming our
              commitment to innovation, excellence, and patient-centred
              care.
            </p>
            <p className="font-display text-lg italic text-reef">
              — Organizing Committee, SACH 2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
