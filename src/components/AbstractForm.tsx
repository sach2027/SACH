'use client';

import { useEffect } from 'react';
import { TALLY_ABSTRACT_FORM_URL } from '@/lib/config';

/**
 * Embeds the Tally.so abstract submission form. We moved off a
 * custom-built form + Web3Forms here specifically because file uploads
 * (the abstract file, and the conditional YIA age-proof upload) sit behind
 * Web3Forms' paid tier, while Tally's free plan includes both with no
 * submission cap. See src/lib/config.ts for the swap-in URL.
 */
export default function AbstractForm() {
  useEffect(() => {
    // Tally's widget script auto-resizes the iframe to fit the form's
    // actual content height instead of leaving fixed dead space.
    if (document.getElementById('tally-embed-script')) return;
    const script = document.createElement('script');
    script.id = 'tally-embed-script';
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-tally-src={`${TALLY_ABSTRACT_FORM_URL}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
      title="SACH 2027 abstract submission form"
      loading="lazy"
      className="h-[900px] w-full border-0"
    />
  );
}
