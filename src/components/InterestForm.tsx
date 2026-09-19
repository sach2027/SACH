'use client';

import { useEffect } from 'react';
import { TALLY_INTEREST_FORM_URL } from '@/lib/config';

/**
 * Embeds the Tally.so "register your interest" form. The fields live in
 * Tally, not in this repo. See src/lib/config.ts for the embed URL.
 */
export default function InterestForm() {
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
      data-tally-src={`${TALLY_INTEREST_FORM_URL}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
      title="SACH 2027 registration interest form"
      loading="lazy"
      className="h-[900px] w-full border-0"
    />
  );
}
