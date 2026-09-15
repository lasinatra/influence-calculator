# Influence Calculator

Build a single-page interactive calculator component called SpanOfInfluenceCalculator. Section 1, "Direct Accountability" (4 plain number fields: HR tech spend, recruiting budget, L&D budget, HR team comp+benefits). Section 2, "Indirect Influence," part A (3a–3d): workforce inputs (headcount, avg salary, annual voluntary departures, avg absence days/employee, avg daily cost of absence, total workforce compensation cost) plus configurable assumption fields pre-filled with defaults: replacement cost % by role level [table: 40/80/125/200%], HR-program-attributable share % [default 30%], engagement productivity uplift % [default 17%], manager-attributable share % [default 70%], absenteeism reduction % [default 78%] — each with a small source tooltip. Running subtotals for Direct Accountability and Indirect Influence (3a–3d only, labeled as partial) at the bottom. Style: match the existing Sirius People brand kit — navy #1a2b3c, existing typography and spacing tokens. No new dependencies beyond what's already in the project. Do not modify any other section or route.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ae6e5f0b-9f07-441a-9590-2581625d8564).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
