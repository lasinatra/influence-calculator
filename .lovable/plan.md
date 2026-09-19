# Ratio shown as "Nx" (one decimal) everywhere

Display-only change in `src/components/SpanOfInfluenceCalculator.tsx`. No calculation, default, or layout changes.

## Current state (verified)

The ratio appears in exactly two visible places, both driven by `ratio.toFixed(1)`:

1. The **Ratio callout** in the output section (line ~830): currently `1 : {ratio.toFixed(1)}` → shows "1 : 2.9" with defaults.
2. The **sentence line** (line ~834): "You influence {ratio.toFixed(1)}x what you are accountable for." — already one-decimal "Nx" format.

There is no separate shareable summary sentence in the app.

## Changes

1. **Ratio callout** — change `1 : {ratio.toFixed(1)}` to `{ratio.toFixed(1)}x` so it reads "2.9x" with default inputs (the value follows the entered numbers; with your inputs it shows e.g. "3.2x").
2. The "You influence Nx..." line already uses `ratio.toFixed(1)` — no change needed, verified as is.
3. **Blended rate** stays at `toFixed(2)` (74.75%) — untouched.

Note: the app has no shareable summary sentence, so there is no third spot to update; both existing spots will use the one-decimal "Nx" format.

## Verification

- Typecheck passes.
- Headless browser at `/`: Ratio callout reads "2.9x" (defaults), sentence line reads "You influence 2.9x what you are accountable for.", blended rate still shows 74.75% in table and turnover formula, and default totals are unchanged ($3,300,000 / $9,547,938).
