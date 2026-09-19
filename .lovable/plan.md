# Share card + ratio shown as "Nx" everywhere

Display-only change in `src/components/SpanOfInfluenceCalculator.tsx`. No calculation, default, or layout changes elsewhere.

## Current state (verified)

- Ratio appears in two places, both from `ratio` (`indirectTotal / directTotal`):
  1. Ratio callout (line ~830): `1 : {ratio.toFixed(1)}` → shows "1 : 2.9" with defaults.
  2. Sentence line (line ~834): "You influence {ratio.toFixed(1)}x what you are accountable for." — already one-decimal "Nx".
- The Output card ends with the collapsible `<details>` "Breakdown of Indirect Influence" panel (lines ~876–932), inside the white Output card.
- No shareable summary sentence exists yet.
- Defaults: direct $3,300,000, indirect $9,547,938, ratio 2.9.

## Changes

### 1. Ratio callout format
- Change `1 : {ratio.toFixed(1)}` to `{ratio.toFixed(1)}x` so it reads "2.9x" with defaults.
- Blended rate stays at two decimals (74.75%) — untouched.

### 2. New "Share your result" card
- Placement: directly below the Breakdown `<details>` panel, inside the same white Output card (`mt-8`, matching existing spacing).
- Hidden entirely when `directTotal` is 0.
- Content:
  1. Dynamic sentence, body typography (`text-body-text`, same size/leading as other body copy):
     "My HR budget is [Direct total]. My actual influence is [Actually Influence total], or [ratio]x. Calculated with The Shadow Budget, a CHRO's Span-of-Influence Calculator, by Sirius People, LLC."
     - Dollar amounts in a compact format: `$3.3M` / `$10.4M` style (one decimal, M above 1M, K above 1K, full dollars below). Values are exactly `directTotal` and `indirectTotal` as displayed above.
     - Ratio is the same ratio as the callout, one decimal: "2.9x" with defaults.
  2. "Copy" button (small, navy background, white text, rounded to match existing controls) that writes the sentence via `navigator.clipboard.writeText` and swaps its label to "Copied" for ~2 seconds. Uses only React state and a timeout — no new dependencies.
  3. Beneath, a small muted line: "Defaults are illustrative. Adjust the assumptions to your organization." (`text-xs text-muted-text`, matching existing muted notes).

## Verification

- Typecheck passes.
- Headless browser at `/`:
  - Ratio callout reads "2.9x"; sentence line reads "You influence 2.9x what you are accountable for."
  - Share card visible below the breakdown with the exact sentence "$3.3M … $9.5M, or 2.9x …", Copy button works (clipboard shows the sentence; label flips to "Copied" then back), muted note present.
  - Setting the four Direct fields to 0 hides the share card; totals, defaults, and blended rate (74.75%) unchanged.
  - No console errors.
