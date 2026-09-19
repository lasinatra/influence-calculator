# Text updates to The Shadow Budget calculator

All changes are in `src/components/SpanOfInfluenceCalculator.tsx` and are display-only: labels, helper text, notes, and number formatting. No values, defaults, calculations, layout, fields, or other sections change.

## 1. Role-level descriptors in the replacement-cost table
Add a smaller muted line under each level name:
- Entry — Individual contributor / staff
- Mid — Technical / specialist
- Senior — Manager or Director
- Executive — VP and above

## 2. Table header ★ tooltip
Add the same four level definitions to the tooltip on the "Replacement cost % by role level" header.

## 3. Assumptions intro note
Change "Pre-filled with benchmark defaults. Hover a ★ for the source." to:
"Pre-filled with illustrative defaults. Hover a ★ for the source; adjust the departure mix to your organization."

## 4. Remove spec codes (3a–3g) and "Part A" / "Part B" labels
- Drop the "Part B · 3e–3g" chip and the gold "3e" / "3f" / "3g" prefixes on the risk, retention, and coordination headings.
- Remove `code="3a"`–`code="3g"` from the Calculated Influence result rows and the Output section breakdown (keep the plain category names; "Manager effectiveness share (within 3b)" becomes "(within Engagement productivity)").
- Where notes refer to categories by code, replace with plain names, e.g. the double-counting note becomes: "Manager effectiveness share is a breakdown of Engagement productivity, not an additional amount. The subtotal adds Turnover, Engagement productivity, Absenteeism, Compliance risk, Top performer retention, and Policy coordination so manager impact is never double-counted."
- Update "Indirect value across 3a–3g" and the breakdown heading "(3a–3g)" to code-free wording.
- Code comments referencing part letters are left alone (not user-visible) or lightly cleaned.

## 5. HR-Attributable Share wording matches the math
- Label: "HR-Attributable Share (applied across all indirect categories)" → "HR-Attributable Share (applied to turnover, engagement productivity, and absenteeism)".
- Bottom note: "applied to every indirect category" → "applied to turnover, engagement productivity, and absenteeism only".
- The existing note in the risk section explaining why the share is not applied to compliance/retention/coordination stays as is (codes replaced with plain names per item 4).
- Tooltip text for the field stays functionally the same; only the label/note wording changes.

## 6. Blended rate displayed to two decimals
- Table footer: `74.8%` → `74.75%` via `toFixed(2)`.
- Turnover formula line: same `toFixed(2)` display. Calculation unchanged.

## Verification
- Typecheck passes.
- Load `/` in a headless browser: confirm descriptors under each role level, updated tooltip content, new intro note, no "3a"–"3g" or "Part A/B" text anywhere visible, updated share label/note, and blended rate shows two decimals in both places. Confirm default totals unchanged ($3,300,000 accountable / $9,589,438 influence).
