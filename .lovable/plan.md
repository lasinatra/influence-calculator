# Assumptions card — label and helper-text polish

Text-only changes in the Assumptions card of `src/components/SpanOfInfluenceCalculator.tsx`. No values, defaults, calculations, layout, or other sections change.

## 1. Role-level descriptors in the replacement-cost table

Keep the level names (Entry, Mid, Senior, Executive) and add a smaller muted descriptor line under each level name inside the table row header:

- Entry — Individual contributor / staff
- Mid — Technical / specialist
- Senior — Manager or Director
- Executive — VP and above

Rendered as a small `text-xs text-muted-text` line beneath the existing level name in the row's `<th>`.

## 2. Same four definitions in the header ★ tooltip

Extend the table header's ★ tooltip source text to include the four definitions, e.g. appended as "Role levels: Entry — individual contributor / staff; Mid — technical / specialist; Senior — manager or director; Executive — VP and above."

## 3. Card helper note

Change "Pre-filled with benchmark defaults. Hover a ★ for the source." to:

"Pre-filled with illustrative defaults. Hover a ★ for the source; adjust the departure mix to your organization."

## 4. Part B headings

- Remove the gold "3e" code prefix from the "Compliance / employment claim risk" heading (heading text becomes "Compliance / employment claim risk"). The 3f and 3g prefixes stay.
- Remove the "Part B · 3e–3g" label next to the "Risk, retention and coordination" card title.
- All fields, tooltips, chips, and values in the card remain untouched.

## Verification

- Typecheck passes.
- Playwright: descriptors visible under each level name, updated helper note and tooltip text render, 3e prefix and "Part B · 3e–3g" gone, all fields still present, totals unchanged ($3,300,000 direct, $9,589,438 indirect with defaults).
