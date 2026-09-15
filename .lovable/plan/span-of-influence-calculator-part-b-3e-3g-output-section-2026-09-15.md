# Span of Influence Calculator — Part B (3e–3g) + Output section

Extends the existing calculator on the home page only. Section 1 and all other routes stay untouched.

## 1. New Indirect Influence inputs (Part B)

A new "Risk, retention and coordination" card below the Assumptions card, holding three input groups:

**3e — Compliance / employment claim risk**
- Average cost of an employment claim — default $160,000 (sourced tooltip)
- Baseline annual claim probability — default 10% (sourced tooltip)
- Risk reduction from HR programs — no default, placeholder "your estimate", marked as a user estimate

**3f — Top performer retention**
- Top performers retained via HR intervention — user input, blank
- Average salary of a retained top performer — user input, blank
- Performance premium multiplier — default 2.0 (sourced tooltip)

**3g — Policy coordination labor**
- Annual policy-coordination hours — user input, blank
- Blended hourly cost — default $75 (sourced tooltip)

Fields with a sourced default keep the gold star tooltip. Fields without one (3e risk reduction, 3f counts/salary, 3g hours) get a small gold-outlined "Your estimate" chip instead of a citation star, so a reader can tell benchmark from judgment at a glance.

## 2. Calculations

- 3e = claim cost x baseline probability x risk-reduction %
- 3f = top performers retained x average salary x (multiplier − 1)
- 3g = coordination hours x blended hourly cost

The HR-Attributable Share is **not** applied to 3e, 3f or 3g — each carries its own attribution. A short note in the new card states this in the same gold style as the existing 3c note. 3a/3b/3d logic and the share's scope are unchanged.

Indirect total becomes 3a + 3b + 3d + 3e + 3f + 3g (3c stays nested inside 3b, still not added).

## 3. Output section (03 / The Gap)

New section below Indirect Influence:
- Two large side-by-side totals: "Accountable For" (direct) and "Actually Influence" (full indirect).
- Beneath them, the gap as a dollar amount and as a ratio ("1 : 2.9 — you influence 2.9x what you're accountable for").
- A horizontal bar chart comparing the two, drawn with plain divs scaled to the larger value: navy bar for accountable, gold bar for influence. No chart library.
- A collapsible breakdown (native details/summary, styled) listing all seven sub-categories with their amounts, 3c shown nested and labelled "within 3b — not added".

The sticky bottom bar drops the "Partial (3a–3d)" qualifier and shows the complete indirect total.

## Technical notes

- All changes in `src/components/SpanOfInfluenceCalculator.tsx`; local `useState` only, same `NumberField` / `SourceTip` / `ResultRow` helpers, extended with an estimate-chip variant.
- Styling uses the existing Sirius tokens (navy, gold, gold-light, cream, warm-gray, mid-gray, display/body fonts). No new packages.
- Blank inputs read as 0, so empty estimate fields contribute nothing until filled.
