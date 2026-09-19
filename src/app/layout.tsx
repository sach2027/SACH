import type { Metadata } from 'next';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import './globals.css';
import { SITE } from '@/lib/config';

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.fullTitle}`,
  description: `${SITE.fullTitle}. ${SITE.dates} at ${SITE.venue}. ${SITE.motto}. Register your interest today.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand font-sans text-slate antialiased">
        {children}
      </body>
    </html>
  );
}
