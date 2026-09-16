# The Shadow Budget — Hero headline & page metadata

## Scope
Files touched: `src/components/SpanOfInfluenceCalculator.tsx` (hero only) and `src/routes/index.tsx` (head metadata only). Nothing else changes — no styling, layout, or calculation logic.

## Hero changes (SpanOfInfluenceCalculator.tsx, lines ~358–370)
1. H1 text: "Span of Influence Calculator" → "The Shadow Budget".
2. New subtitle line directly beneath the H1, above the existing intro copy, reading exactly:
   "A CHRO's Span-of-Influence Calculator."
   - Styled in the existing brand pattern: small uppercase, letter-spaced, gold text (`text-gold`, tracking, uppercase, small size) — matching the "★ Sirius People, LLC" eyebrow treatment already in the header.
   - Intro copy ("What HR owns outright...") stays unchanged below it.
3. No changes to the eyebrow, orbital motifs, gold rule, spacing, or any other section.

## Page metadata (src/routes/index.tsx)
- Title: "The Shadow Budget — A CHRO's Span-of-Influence Calculator"
- Meta description updated to match, e.g. "A CHRO's Span-of-Influence Calculator: quantify what HR owns outright and what HR moves indirectly — direct budgets plus turnover, engagement, absenteeism, and more."
- og:title / og:description updated to the same new copy. twitter:card and og:type unchanged.

## Verification
- Typecheck passes (`bunx tsgo --noEmit`).
- Live preview shows the new headline, subtitle, unchanged intro copy; metadata present in rendered head; calculator values unchanged.
