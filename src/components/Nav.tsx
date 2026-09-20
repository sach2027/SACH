'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SITE } from '@/lib/config';
import { asset } from '@/lib/assets';

const LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#grants-awards', label: 'Grants & Awards' },
  { href: '#explore', label: 'Explore Maldives' },
  { href: '#logistics', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-foam/10 bg-ink/90 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={asset('/logo.png')}
            alt="SACH logo"
            width={44}
            height={41}
            className="h-10 w-auto"
            priority
          />
          <span className="font-display text-lg text-foam">{SITE.name}</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-foam/75 transition-colors hover:text-foam">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="hidden rounded-sm bg-coral px-4 py-2 text-sm font-medium text-foam transition-colors hover:bg-coral-dark sm:inline-block"
          >
            Register Interest
          </a>
          <button
            type="button"
            className="rounded-sm p-2 text-foam md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-foam/10 bg-ink md:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-6 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm py-2.5 text-foam/85"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="block rounded-sm bg-coral px-4 py-3 text-center text-sm font-medium text-foam"
              >
                Register Interest
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
