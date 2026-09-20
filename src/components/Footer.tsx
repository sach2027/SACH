import Image from 'next/image';
import { SITE } from '@/lib/config';
import { asset } from '@/lib/assets';
import { WaveTop } from './art/Waves';

export default function Footer() {
  return (
    <footer className="relative bg-ink pb-12 pt-20">
      <WaveTop color="#F6F3EA" />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Image
          src={asset('/logo.png')}
          alt="SACH logo"
          width={86}
          height={80}
          className="mx-auto mb-5 h-20 w-auto"
        />
        <p className="font-display text-lg italic text-foam/90">
          Together, let us create history.
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-coral-light">
          Register — Participate — Promote — Celebrate
        </p>
        <p className="mt-8 text-xs text-foam/40">
          {SITE.name} · {SITE.dates} · {SITE.venue}
        </p>
      </div>
    </footer>
  );
}
