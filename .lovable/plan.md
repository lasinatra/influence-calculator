# Fix ★ tooltips for touch devices

Make the ★ source tooltips open and close on tap, while keeping desktop hover behavior unchanged.

## Which component renders the tooltips

`SourceTip` in `src/components/SpanOfInfluenceCalculator.tsx` (lines 99–118) renders every ★ tooltip on the page. It wraps the shadcn `Tooltip` (Radix `@radix-ui/react-tooltip`, already a project dependency) from `src/components/ui/tooltip.tsx`. Only `SourceTip` needs to change — the fix lands in one place and covers every ★.

## What changes

1. Give `SourceTip` local open state and pass it to the Radix `Tooltip` as controlled `open`/`onOpenChange`:
   - Hover and keyboard focus still drive open/close through Radix's own events (desktop behavior preserved exactly).
   - Add `onClick` on the ★ button that toggles the tooltip open/closed — this is what makes tap work on touch devices.
2. When the tooltip is open, attach a temporary document `pointerdown` listener that closes it if the tap lands outside the ★ button or the tooltip content (close-on-tap-elsewhere). The listener is removed when the tooltip closes (cleanup in `useEffect`).
3. Use a `ref` on the trigger button for the outside-tap check.

## What stays the same

- Tooltip text, styling, classes, and placement — untouched.
- No changes to `src/components/ui/tooltip.tsx`, calculations, inputs, defaults, labels, layout, or any other section.
- No new dependencies (React state + existing Radix props only).

## Verification

- Typecheck passes.
- Browser check: clicking a ★ opens its tooltip, clicking it again closes it, clicking elsewhere on the page closes it, and tooltip text matches before/after.
