// -----------------------------------------------------------------------
// SITE-WIDE CONFIG — the handful of values that change when this goes live.
// -----------------------------------------------------------------------

/**
 * Web3Forms access key. Get one free at https://web3forms.com (no signup
 * required — it emails you a key). Every form on the site sends its
 * submission to whatever email address that key is registered to.
 *
 * Used only by the Logistics inquiry form (no file uploads needed there —
 * Web3Forms' free tier covers this fine).
 */
export const WEB3FORMS_ACCESS_KEY = 'b4bdb486-2fb9-4495-a988-04ab2e2b0d7d';

/**
 * Tally.so embed URL for the abstract submission form. Tally's free plan
 * supports unlimited submissions AND file uploads (up to 10MB/file), which
 * Web3Forms' free plan doesn't — needed here for the abstract file and the
 * conditional YIA age-proof upload.
 *
 * Get this from: Tally form → Share → Embed → "Standard embed" src URL.
 * TODO: replace before launch.
 */
export const TALLY_ABSTRACT_FORM_URL = 'https://tally.so/embed/5BJLy6';

/**
 * Organizer inbox shown on the site (footer, contact copy) and used as the
 * reply-to / display address for form submissions.
 *
 * TODO: replace before launch.
 */
export const ORGANIZER_EMAIL = 'shazkp1357@gmail.com';

/** Conference target date/time, authoritative in IST (UTC+5:30). */
export const CONFERENCE_START_IST = '2027-04-27T00:00:00+05:30';

export const SITE = {
  name: 'SACH 2027',
  fullTitle:
    '8th South-Asian Academy of Cytopathology & Histopathology Conference',
  motto: 'Sharing Knowledge, Advancing Science',
  dates: '27–29 April 2027',
  venue: 'JEN Malé by Shangri-La, Malé, Maldives',
};
