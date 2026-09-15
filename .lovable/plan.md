# SpanOfInfluenceCalculator

A single-page interactive calculator built on the Sirius People brand kit v1.0, replacing the blank home page at `/`. No other routes or sections are touched.

## Brand foundation (from your brand kit)

Tokens added to the stylesheet so everything stays on-brand:
- Navy `#1a2b3c`, Gold `#c9a84c`, Gold Light `#f5e9c8`, Cream `#faf8f4`, Warm Gray `#f2ede6`, Mid Gray `#ddd8cf`, Body `#1a1a1a`, Muted `#7a7468`
- Cormorant Garamond (display, 600) and DM Sans (body) loaded via the page head; Georgia and Open Sans as fallbacks
- Cream page background, white cards with 12px radius and soft shadow, 1200px max width, 80–120px section padding
- Section headers in the `01 / Title.` format — number in gold, title in navy — with 3–4px gold rules between sections
- Legacy navy `#1a2744` is not used anywhere

## Section 01 / Direct Accountability

Four currency inputs, live-summed:
- HR tech spend
- Recruiting budget
- L&D budget
- HR team compensation + benefits

## Section 02 / Indirect Influence

**Workforce inputs:** headcount, average salary, annual voluntary departures, average absence days per employee, average daily cost of absence, total workforce compensation cost.

**Assumptions — pre-filled and editable, each with a gold star info tooltip citing its source:**
- Replacement cost % by role level — mini table: Entry 40%, Mid 80%, Senior 125%, Executive 200%, with a headcount mix so the blended rate is transparent
- HR-program-attributable share — 30%
- Engagement productivity uplift — 17%
- Manager-attributable share — 70%
- Absenteeism reduction — 78%

**Calculated influence lines:**
- 3a Turnover / replacement cost — departures x average salary x blended replacement % x HR-attributable share
- 3b Engagement productivity — total workforce comp x uplift % x manager-attributable share x HR-attributable share
- 3c Absenteeism — headcount x absence days x daily absence cost x reduction % x HR-attributable share
- 3d Reserved as the fourth line (see open question below)

Every formula is printed under its result line so the math is auditable.

## Running totals

A sticky navy bar at the bottom of the page:
- Direct Accountability subtotal
- Indirect Influence subtotal — labeled "Partial (3a–3d)"
- Values recalculate on every keystroke, formatted as US currency

## Technical notes

- One new component, `SpanOfInfluenceCalculator`, rendered from `src/routes/index.tsx`
- Brand tokens added to `src/styles.css`; fonts linked from the root route head
- Local React state only, no backend, no new dependencies
- Tooltips use the shadcn Tooltip primitive already in the project
- Page metadata set for the calculator (title, description, social tags)

## Open question

You listed 3a–3d but named three influence levers (turnover, engagement, absenteeism). Tell me what 3d should be — options: manager effectiveness, safety/workers' comp, or overtime/contingent labor — and I'll build it. If you'd rather decide later, I'll ship 3a–3c and leave 3d clearly marked as a placeholder.
