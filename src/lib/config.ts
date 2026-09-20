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
export const WEB3FORMS_ACCESS_KEY = 'a9d0aba1-8d31-4fa4-8846-d4acb7e2b59b';

/**
 * Google Apps Script web app URL for the "register your interest" form.
 * Setup steps: apps-script/README.md. Paste the deployed URL (ends in /exec).
 */
export const INTEREST_FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwqHSnYZIn9sLKe95wUkyCxdsF_LBX0situpJjk-vRyCFbwu9vLcjDH8UFYpfAFVoaC9A/exec';

/**
 * Organizer inbox shown on the site (footer, contact copy) and used as the
 * reply-to / display address for form submissions.
 *
 * TODO: replace before launch.
 */
export const ORGANIZER_EMAIL = 'sachcommittee@gmail.com';

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
