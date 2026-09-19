# Interest form backend (Google Apps Script)

1. Create a new Google Sheet (e.g. "SACH 2027 Interest").
2. In the sheet: Extensions > Apps Script. Delete the default code and paste in `Code.gs`.
3. Check `CONFIG.OWNER_EMAIL` at the top. This address receives the notifications.
4. Click Deploy > New deployment > type "Web app".
   - Execute as: Me
   - Who has access: Anyone
5. Authorize when prompted (spreadsheet and email permissions), then copy the Web app URL (ends in `/exec`).
6. Paste that URL into `INTEREST_FORM_ENDPOINT` in `src/lib/config.ts`.

After ANY later edit to `Code.gs`: Deploy > Manage deployments > edit > Version: New version > Deploy.
The URL stays the same.

Notes:
- Consumer Gmail accounts have a daily email quota (about 100 recipients per day). Each signup sends
  2 emails. Signups are always saved to the sheet even if the email quota is reached.
- Confirmation emails come from the Google account that owns the script.
