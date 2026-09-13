# SACH 2027 — Design Notes

## Subject
An academic pathology conference (cytopathology & histopathology) held on a
Maldivian resort island. Two worlds in tension: clinical/scientific rigor and
tropical island travel marketing. The design should hold both without
tipping into either "medical journal" sterility or "resort brochure" cliché.

## Concept: horizon & specimen
Two recurring visual devices, both literal to the brief:
- **The horizon line** — a thin rule that appears at a consistent height
  across sections, standing in for the sea horizon from the venue. Used as
  the section-divider device instead of generic spacing or numbered badges.
- **The specimen ring** — a circular, cross-haired motif referencing a
  microscope's field of view. Used once, prominently, in the hero (holding
  the countdown), not repeated as decoration everywhere.

## Color
- `ink` #0E2422 — near-black deep teal, dark section backgrounds
- `reef` #164E45 — primary brand teal (with light/dark variants)
- `sand` #EDE6D6 — warm sand, light section backgrounds
- `foam` #F6F3EA — off-white, text-on-dark / card surfaces
- `coral` #BF4E30 — single accent color: CTAs, award markers, links
- `slate` #3A433F — body text on light backgrounds

Deliberately avoiding: warm cream + terracotta (#D97757-adjacent) AI-default
combo, and the generic turquoise-lagoon travel palette.

## Type
- Display: **Fraunces** (self-hosted via @fontsource, no external font CDN —
  required since GitHub Pages + no google fonts network access) — a serif
  with soft, organic curves for headlines. Carries academic gravitas without
  being a stiff journal serif.
- Body/UI: **IBM Plex Sans** — precise, technical character fitting a
  scientific conference, self-hosted the same way.

## Layout
- Hero: asymmetric split, not centered. Left: title/motto/dates/CTAs. Right:
  a large specimen-ring graphic with the live countdown nested inside it.
- Sections alternate `sand` (light) and `ink` (dark) backgrounds, each
  transition marked by the horizon-line divider.
- One deliberate motion moment: hero elements rise into place on load,
  staggered. No scroll-triggered fade-ins on every section — those are
  cut per the restraint principle.

## Content/architecture notes for future phases
All structured data (speakers, awards, contacts, attractions) lives in
`src/lib/content.ts` as typed objects, not hardcoded in JSX — so a future
CMS or backend can replace the data source without touching layout code.
Forms currently point at a placeholder Web3Forms access key and organizer
email in `src/lib/config.ts` — swap those two values when ready to go live.
