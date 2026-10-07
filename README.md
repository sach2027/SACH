Link to website: https://sach2027.github.io/SACH/

# SACH 2027 — Conference Website

Marketing site for the 8th South-Asian Academy of Cytopathology &
Histopathology Conference, 27–29 April 2027, JEN Malé by Shangri-La,
Maldives.

Static Next.js site, deployed to GitHub Pages. The interest form uses a
Google Apps Script backend (`apps-script/README.md`); the logistics inquiry
form uses [Web3Forms](https://web3forms.com).

## Before going live — 2 things to set

Open `src/lib/config.ts` and replace:

1. `WEB3FORMS_ACCESS_KEY` — get a free key at https://web3forms.com by
   entering the organizer's email. No account needed; the key arrives by
   email and all form submissions get sent there.
2. `ORGANIZER_EMAIL` — shown in site copy/footer.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build & preview the static export locally

```bash
npm run build      # outputs to ./out
npx serve out       # preview the exported site
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings → **Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys
   automatically. The site will be live at
   `https://<username>.github.io/<repo-name>/`.

If this repo *is* your `<username>.github.io` user/org pages repo (i.e. the
site should live at the domain root, not under a sub-path), edit
`.github/workflows/deploy.yml` and set `NEXT_PUBLIC_BASE_PATH` to an empty
string instead of `/${{ github.event.repository.name }}`.

## Project structure

```
src/
  app/            Next.js app router (layout, page, global styles)
  components/     UI sections (Hero, Speakers, InterestForm, etc.)
  lib/
    config.ts     Values you edit when going live (email, form key, dates)
    content.ts    Structured data — speakers, awards, contacts, attractions
```

Content lives in `src/lib/content.ts` as typed data, not hardcoded in JSX,
so it's easy to keep editing without touching layout code, and so a future
CMS or backend can swap in without a rewrite.

## Current scope (Phase 1, marketing site)

- Hero with live countdown (target: 27 Apr 2027, IST)
- Speaker section: Non-SAARC speaker cards with photos; SAARC list marked
  "to be announced". Modal bios are not built yet
- Awards and grants overview (YIA, Best Oral, Best Poster, Academic Grant)
- "Register your interest" form (name, email, phone, nationality,
  presentation type). Submissions go to a Google Apps Script web app
  (`apps-script/`) that saves them to a Google Sheet, notifies the organizer
  and emails a confirmation to the registrant
- Destination guide with filterable attraction cards
- Travel/logistics inquiry form (emailed via Web3Forms) and leadership
  contact cards

## Not built yet

- Abstract submission form with YIA age-proof upload. Abstract submission
  details will be announced later, so the site currently only collects
  interest
- Speaker modal bios and session topics

## Planned for later phases

- Live registration with payments
- Abstract submission and review/status workflow (database-backed)
- Admin dashboard for the organizing committee to edit content
- Secure, access-controlled storage for YIA age-proof documents (should be
  encrypted object storage with restricted access, not email attachments)
