# Fix 3f Top-Performer Retention multiplier

Only `src/components/SpanOfInfluenceCalculator.tsx` changes. No labels, defaults, tooltips, or other sections are touched.

## Changes

1. **Formula (line ~249-250):** replace
   `num(topRetained) * num(topSalary) * Math.max(num(performancePremium) - 1, 0)`
   with
   `num(topRetained) * num(topSalary) * num(performancePremium)`
   — the multiplier is used directly, no offset.

2. **Breakdown formula text (line ~754):** change the displayed `3f` formula to show the multiplier value as entered, e.g. `x {num(performancePremium).toFixed(1)} performance premium` — removing the hidden `- 1` so the text matches the actual math.

Everything else — field label "Performance premium multiplier", default 2.0, source tooltip, estimate chips, HR-Attributable Share scoping, 3a–3e and 3g logic, output section — stays exactly as is.

## Verification

- Playwright on the live preview: fill 3f with top performers retained = 1, salary = 100,000, multiplier = 3.0 → 3f row must show $300,000 (exactly 3× base). Multiplier 2.0 default with the same base → $200,000.
- Confirm the breakdown line for 3f reads "x 3.0 performance premium".
- Check default totals update and no console errors.
