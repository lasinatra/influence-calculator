# HR-Attributable Share: rename, tooltip, and disclosure note

## Scope

Changes are limited to the Assumptions panel and Calculated Influence block in
`src/components/SpanOfInfluenceCalculator.tsx`. No calculation logic, values,
other fields, or other sections change.

## Changes

1. **Field label** — rename the HR-program-attributable share label from
   `HR-program-attributable share` to
   `HR-Attributable Share (applied across all indirect categories)`.
   It renders as uppercase via existing styling; the label string changes
   only.

2. **Tooltip source text** — replace the existing source string with:
   "No indirect outcome happens through HR's programs alone — managers, market
   conditions, and individual circumstance all play a role. This share
   represents the portion of each category's value attributable to HR's own
   systems and programs, applied consistently rather than only to turnover."

3. **Disclosure note** — add a one-line note in the Calculated Influence card,
   styled identically to the existing 3c double-counting note
   (`rounded-lg bg-gold-light/60 px-4 py-3 text-xs text-body-text`), placed
   after the existing note. Text:
   "The HR-Attributable Share is applied to every indirect category, not just
   turnover — reflecting that no outcome here happens through HR's programs
   alone."

4. **Formulas unchanged** — 3a, 3b, 3c, 3d, subtotals, and the sticky totals
   bar keep their exact current behavior.

## Verification

- Reload the preview, confirm the new label, tooltip text on hover of the
  gold star, and the second disclosure note render correctly.
- Confirm totals still show `$3,300,000` direct and `$9,547,938` indirect with
  default inputs (no calculation drift).
