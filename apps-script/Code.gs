/**
 * SACH 2027 "Register your interest" backend (Google Apps Script).
 *
 * For each submission this script:
 *   1. appends a row to the "Registrations" sheet of the spreadsheet it is attached to,
 *   2. emails the organizer a notification with the registrant's details,
 *   3. emails the registrant a confirmation of their interest.
 *
 * Setup steps are in apps-script/README.md.
 */

const CONFIG = {
  SHEET_NAME: 'Registrations',
  OWNER_EMAIL: 'sachcommittee@gmail.com', // receives notifications and is the reply-to on confirmations
  SENDER_NAME: 'SACH 2027',
  EVENT_DATES: '27th to 29th April 2027',
  EVENT_VENUE: 'JEN Malé by Shangri-La, Malé, Maldives',
  EVENT_MANAGER: 'Air Yatra Online',
  EVENT_MANAGER_EMAIL: 'ach2026.registration@airyatraonline.com',
};

const PRESENTATION_TYPES = ['Oral Paper', 'Poster/ePoster', 'Speaker', 'Attending only (not presenting)'];
const YES_NO = ['Yes', 'No'];

const HEADERS = [
  'Timestamp', 'Full name', 'Email', 'Phone', 'Presentation type',
  'Applying for Academic/Travel Grant',
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

// Title-cases a name only when it was typed entirely in lower case or upper case,
// so names like "McDonald", "D'Souza" or "de Silva" typed correctly are left alone.
function formatName_(name) {
  if (name !== name.toLowerCase() && name !== name.toUpperCase()) return name;
  return name.toLowerCase().replace(/(^|[\s\-'\u2019])([^\s\-'\u2019])/g, function (m, sep, ch) {
    return sep + ch.toUpperCase();
  });
}

function validate_(raw) {
  const d = {
    name: formatName_(clean_(raw.name, 120)),
    email: clean_(raw.email, 254),
    phone: clean_(raw.phone, 25),
    presentationType: clean_(raw.presentationType, 40),
    grant: clean_(raw.grant, 5),
  };
  if (!d.name) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return null;
  if (!/^\+?[\d\s\-()]{6,25}$/.test(d.phone)) return null;
  if (PRESENTATION_TYPES.indexOf(d.presentationType) === -1) return null;
  if (YES_NO.indexOf(d.grant) === -1) return null;
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
      d.presentationType, d.grant,
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
    ['Full name', d.name],
    ['Email', d.email],
    ['Phone', d.phone],
    ['Presentation type', d.presentationType],
    ['Applying for Academic/Travel Grant', d.grant],
  ];
}

function sendOwnerEmail_(d) {
  const rows = detailRows_(d).map(function (r) {
    return '<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top">' + esc_(r[0]) +
      '</td><td style="padding:6px 0;color:#111">' + esc_(r[1]) + '</td></tr>';
  }).join('');

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    replyTo: d.email,
    name: CONFIG.SENDER_NAME + ' website',
    subject: 'New SACH 2027 interest: ' + d.name + ' (' + d.presentationType + ')',
    body: detailRows_(d).map(function (r) { return r[0] + ': ' + r[1]; }).join('\n'),
    htmlBody: '<p>A new person has registered their interest in SACH 2027.</p>' +
      '<table style="border-collapse:collapse;font-size:14px">' + rows + '</table>',
  });
}

function sendConfirmationEmail_(d) {
  const plain =
    'Dear ' + d.name + ',\n\n' +
    'Thank you for your interest in registering for SACH 2027, the 8th South-Asian Academy of ' +
    'Cytopathology & Histopathology Conference, to be held on ' + CONFIG.EVENT_DATES + ' at ' +
    CONFIG.EVENT_VENUE + '.\n\n' +
    'We shall contact you once the registration is opened. If you need more information or ' +
    'clarification, kindly contact us at ' + CONFIG.OWNER_EMAIL + '. For air ticketing, accommodation ' +
    'and local sightseeing, you may also reach our event manager, ' + CONFIG.EVENT_MANAGER + ', at ' +
    CONFIG.EVENT_MANAGER_EMAIL + '.\n\n' +
    'Thank you and we look forward to welcoming you to SACH 2027.\n\n' +
    'Warmest Regards,\n\nOrganizing Committee\nSACH 2027\nEmail: ' + CONFIG.OWNER_EMAIL;

  const html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.6;max-width:600px">' +
    '<p>Dear ' + esc_(d.name) + ',</p>' +
    '<p>Thank you for your interest in registering for <strong>SACH 2027</strong>, the 8th South-Asian ' +
    'Academy of Cytopathology &amp; Histopathology Conference, to be held on ' + esc_(CONFIG.EVENT_DATES) +
    ' at ' + esc_(CONFIG.EVENT_VENUE) + '.</p>' +
    '<p>We shall contact you once the registration is opened. If you need more information or ' +
    'clarification, kindly contact us at <a href="mailto:' + esc_(CONFIG.OWNER_EMAIL) + '">' +
    esc_(CONFIG.OWNER_EMAIL) + '</a>. For air ticketing, accommodation and local sightseeing, you may ' +
    'also reach our event manager, ' + esc_(CONFIG.EVENT_MANAGER) + ', at <a href="mailto:' +
    esc_(CONFIG.EVENT_MANAGER_EMAIL) + '">' +
    esc_(CONFIG.EVENT_MANAGER_EMAIL) + '</a>.</p>' +
    '<p>Thank you and we look forward to welcoming you to SACH 2027.</p>' +
    '<p>Warmest Regards,</p>' +
    '<p>Organizing Committee<br>SACH 2027<br>Email: <a href="mailto:' + esc_(CONFIG.OWNER_EMAIL) + '">' +
    esc_(CONFIG.OWNER_EMAIL) + '</a></p></div>';

  MailApp.sendEmail({
    to: d.email,
    replyTo: CONFIG.OWNER_EMAIL,
    name: CONFIG.SENDER_NAME,
    subject: 'SACH 2027: thank you for your interest',
    body: plain,
    htmlBody: html,
  });
}
