/**
 * SACH 2027 "Register your interest" backend (Google Apps Script).
 *
 * For each submission this script:
 *   1. appends a row to the "Interest" sheet of the spreadsheet it is attached to,
 *   2. emails the organizer a notification with the registrant's details,
 *   3. emails the registrant a confirmation of their interest.
 *
 * Setup steps are in apps-script/README.md.
 */

const CONFIG = {
  SHEET_NAME: 'Interest',
  OWNER_EMAIL: 'sachcommittee@gmail.com', // receives notifications and is the reply-to on confirmations
  SENDER_NAME: 'SACH 2027',
  EVENT_DATES: '27 to 29 April 2027',
  EVENT_VENUE: 'JEN Malé by Shangri-La, Malé, Maldives',
};

const ATTENDING_AS = ['Delegate', 'Faculty / Speaker', 'Trainee / Student', 'Accompanying person'];
const YES_NO_MAYBE = ['Yes', 'Maybe', 'No'];

const HEADERS = [
  'Timestamp', 'Full name', 'Email', 'Phone', 'Country', 'Institution',
  'Designation', 'Attending as', 'Interested in presenting an abstract',
  'Interested in Academic/Travel Grant', 'Wants travel & accommodation help',
];

function doPost(e) {
  try {
    const raw = JSON.parse(e.postData.contents);

    // Honeypot: real users never fill this hidden field.
    if (raw.website) return respond_(true);

    const data = validate_(raw);
    if (!data) return respond_(false);

    saveRow_(data);
    try { sendOwnerEmail_(data); } catch (err) { console.error('Owner email failed', err); }
    try { sendConfirmationEmail_(data); } catch (err) { console.error('Confirmation email failed', err); }

    return respond_(true);
  } catch (err) {
    console.error(err);
    return respond_(false);
  }
}

function respond_(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok }))
    .setMimeType(ContentService.MimeType.JSON);
}

function clean_(value, max) {
  return String(value == null ? '' : value).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

function validate_(raw) {
  const d = {
    name: clean_(raw.name, 120),
    email: clean_(raw.email, 254),
    phone: clean_(raw.phone, 40),
    country: clean_(raw.country, 80),
    institution: clean_(raw.institution, 200),
    designation: clean_(raw.designation, 120),
    attendingAs: clean_(raw.attendingAs, 40),
    abstractInterest: clean_(raw.abstractInterest, 10),
    grantInterest: clean_(raw.grantInterest, 10),
    travelHelp: raw.travelHelp === true ? 'Yes' : 'No',
  };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
  const required = [d.name, d.country, d.institution, d.designation];
  if (!emailOk || required.some(function (v) { return !v; })) return null;
  if (raw.consent !== true) return null;
  if (ATTENDING_AS.indexOf(d.attendingAs) === -1) return null;
  if (YES_NO_MAYBE.indexOf(d.abstractInterest) === -1) return null;
  if (YES_NO_MAYBE.indexOf(d.grantInterest) === -1) return null;
  return d;
}

// Stops values starting with = + - @ from being run as spreadsheet formulas.
function safeCell_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function saveRow_(d) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(), safeCell_(d.name), safeCell_(d.email), safeCell_(d.phone),
      safeCell_(d.country), safeCell_(d.institution), safeCell_(d.designation),
      d.attendingAs, d.abstractInterest, d.grantInterest, d.travelHelp,
    ]);
  } finally {
    lock.releaseLock();
  }
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function detailRows_(d) {
  return [
    ['Full name', d.name], ['Email', d.email], ['Phone', d.phone || 'Not provided'],
    ['Country', d.country], ['Institution', d.institution], ['Designation', d.designation],
    ['Attending as', d.attendingAs],
    ['Interested in presenting an abstract', d.abstractInterest],
    ['Interested in Academic/Travel Grant', d.grantInterest],
    ['Wants travel & accommodation help', d.travelHelp],
  ];
}

function detailsTable_(d) {
  const rows = detailRows_(d).map(function (r) {
    return '<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top">' + esc_(r[0]) +
      '</td><td style="padding:6px 0;color:#111">' + esc_(r[1]) + '</td></tr>';
  }).join('');
  return '<table style="border-collapse:collapse;font-size:14px">' + rows + '</table>';
}

function sendOwnerEmail_(d) {
  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    replyTo: d.email,
    name: CONFIG.SENDER_NAME + ' website',
    subject: 'New SACH 2027 interest: ' + d.name + ' (' + d.country + ')',
    body: detailRows_(d).map(function (r) { return r[0] + ': ' + r[1]; }).join('\n'),
    htmlBody: '<p>A new person has registered their interest in SACH 2027.</p>' + detailsTable_(d),
  });
}

function sendConfirmationEmail_(d) {
  const plain =
    'Dear ' + d.name + ',\n\n' +
    'Thank you for registering your interest in SACH 2027, the 8th South-Asian Academy of ' +
    'Cytopathology & Histopathology Conference.\n\n' +
    'Dates: ' + CONFIG.EVENT_DATES + '\nVenue: ' + CONFIG.EVENT_VENUE + '\n\n' +
    'We will notify you as soon as registration opens. This email confirms we have received ' +
    'your interest; it is not a registration.\n\n' +
    'If you have any questions, simply reply to this email.\n\n' +
    'Warm regards,\nOrganizing Committee, SACH 2027';

  const html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6;max-width:560px">' +
    '<p>Dear ' + esc_(d.name) + ',</p>' +
    '<p>Thank you for registering your interest in <strong>SACH 2027</strong>, the 8th South-Asian ' +
    'Academy of Cytopathology &amp; Histopathology Conference.</p>' +
    '<p><strong>Dates:</strong> ' + esc_(CONFIG.EVENT_DATES) + '<br><strong>Venue:</strong> ' +
    esc_(CONFIG.EVENT_VENUE) + '</p>' +
    '<p>We will notify you as soon as registration opens. This email confirms we have received ' +
    'your interest; it is not a registration.</p>' +
    '<p style="margin-top:20px">The details you submitted:</p>' + detailsTable_(d) +
    '<p style="margin-top:20px">If you have any questions, simply reply to this email.</p>' +
    '<p>Warm regards,<br>Organizing Committee, SACH 2027</p></div>';

  MailApp.sendEmail({
    to: d.email,
    replyTo: CONFIG.OWNER_EMAIL,
    name: CONFIG.SENDER_NAME,
    subject: 'SACH 2027: we have received your interest',
    body: plain,
    htmlBody: html,
  });
}
