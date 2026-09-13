// -----------------------------------------------------------------------
// SITE-WIDE CONFIG — the handful of values that change when this goes live.
// -----------------------------------------------------------------------

/**
 * Web3Forms access key. Get one free at https://web3forms.com (no signup
 * required — it emails you a key). Every form on the site sends its
 * submission to whatever email address that key is registered to.
 *
 * TODO: replace before launch.
 */
export const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

/**
 * Organizer inbox shown on the site (footer, contact copy) and used as the
 * reply-to / display address for form submissions.
 *
 * TODO: replace before launch.
 */
export const ORGANIZER_EMAIL = 'organizer@sach2027.example';

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
