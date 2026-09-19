# Share card sentence: append "my budget" after the ratio

Display-only text change in `src/components/SpanOfInfluenceCalculator.tsx`. No calculation, value, layout, or dependency changes.

## Current state (verified)

- `shareSentence` (line 279) currently reads:
  `My HR budget is ${compactCurrency(directTotal)}. My actual influence is ${compactCurrency(indirectTotal)}, or ${ratio.toFixed(1)}x. Calculated with The Shadow Budget, a CHRO's Span-of-Influence Calculator, by Sirius People, LLC.`
- The Copy button copies this same `shareSentence` via `handleCopy` (lines 281–289); the card renders it at lines ~957–981. Both display and clipboard use the single template, so one edit updates both.

## Change

- Edit `shareSentence` only: change `or ${ratio.toFixed(1)}x.` to `or ${ratio.toFixed(1)}x my budget.` so it reads:
  "My HR budget is [Direct total]. My actual influence is [Indirect total], or [ratio]x my budget. Calculated with The Shadow Budget, a CHRO's Span-of-Influence Calculator, by Sirius People, LLC."
- Compact dollar format, one-decimal ratio, live updates, Copy behavior, muted note, and zero-direct hiding are untouched.

## Verification

- Typecheck passes.
- Headless browser at `/` (after hydration):
  - Card sentence reads "My HR budget is $3.3M. My actual influence is $9.5M, or 2.9x my budget. Calculated with The Shadow Budget, a CHRO's Span-of-Influence Calculator, by Sirius People, LLC."
  - Clipboard contains exactly the same new sentence after clicking Copy.
  - No console errors; totals and defaults unchanged.
