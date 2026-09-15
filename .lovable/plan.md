# SpanOfInfluenceCalculator

## What you'll get

A single-page interactive calculator at the home page (`/`), built as a self-contained `SpanOfInfluenceCalculator` component. No other routes or files are touched beyond styles and the index page.

## Section 1 — Direct Accountability

Four plain number inputs, summed into a running subtotal:
- HR tech spend
- Recruiting budget
- L&D budget
- HR team comp + benefits

## Section 2 — Indirect Influence

**Workforce inputs (2A):** headcount, average salary, annual voluntary departures, average absence days per employee, average daily cost of absence, total workforce compensation cost.

**Configurable assumptions (pre-filled, editable):**
- Replacement cost % by role level — small table: Entry 40% / Mid 80% / Senior 125% / Executive 200% (defaults editable)
- HR-program-attributable share — 30%
- Engagement productivity uplift — 17%
- Manager-attributable share — 70%
- Absenteeism reduction — 78%

Each assumption gets a small info icon with a hover tooltip citing its source (e.g., SHRM, Gallup, industry benchmarks).

**Computed influence lines (3a–3d):**
- 3a Turnover/replacement cost influence: departures × avg salary × blended replacement % × HR-attributable share
- 3b Engagement productivity: workforce comp × uplift % × manager-attributable share × HR-attributable share
- 3c Absenteeism: headcount × absence days × daily absence cost × reduction % × HR-attributable share
- 3d (per the stated defaults) — remaining influence line computed from the same inputs; exact formula shown in the UI so it's transparent

## Running totals bar (bottom, sticky)

- Direct Accountability subtotal
- Indirect Influence subtotal (3a–3d, labeled "Partial")
- All values recalculate live on every keystroke, formatted as currency

## Styling

- Add Sirius People brand tokens to `src/styles.css`: primary navy `#1a2b3c` (oklch), supporting tints for section panels, borders, and the totals bar
- Typography and spacing reuse the project's existing design tokens
- Clean, professional form layout: grouped sections with numbered headers, right-aligned currency inputs, subtle panel cards
- No new dependencies — built with existing Tailwind + shadcn-style primitives already in the project

## Note

No Sirius People brand kit exists in the project today (fresh template). The plan encodes navy `#1a2b3c` as the primary brand token; if you have additional brand values (fonts, secondary colors), share them and I'll fold them in.
