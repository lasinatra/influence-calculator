import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function num(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  placeholder?: string;
  source?: string;
  estimate?: boolean;
  step?: string;
};

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  placeholder,
  source,
  estimate,
  step,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
        <label
          htmlFor={id}
          className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text"
        >
          {label}
        </label>
        {source ? <SourceTip source={source} /> : null}
        {estimate ? <EstimateChip /> : null}
      </div>
      <div className="flex items-center rounded-md border border-mid-gray bg-white focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
        {prefix ? (
          <span className="pl-3 text-sm text-muted-text">{prefix}</span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent px-3 py-2 text-right text-base text-body-text outline-none"
        />
        {suffix ? (
          <span className="pr-3 text-sm text-muted-text">{suffix}</span>
        ) : null}
      </div>
      {hint ? <p className="text-xs text-muted-text">{hint}</p> : null}
    </div>
  );
}

function EstimateChip() {
  return (
    <span className="rounded-full border border-gold px-2 py-[1px] text-[10px] font-medium uppercase tracking-[0.06em] text-gold">
      Your estimate
    </span>
  );
}


function SourceTip({ source }: { source: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`Source: ${source}`}
          className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-gold transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true" className="text-[11px] leading-none">
            &#9733;
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-navy text-xs leading-relaxed text-white">
        {source}
      </TooltipContent>
    </Tooltip>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-[26px] font-semibold leading-tight text-navy sm:text-[30px]">
        <span className="text-gold">{number}</span> / {title}.
      </h2>
      <div className="mt-4 h-[3px] w-full bg-gold" />
    </div>
  );
}

function ResultRow({
  code,
  title,
  formula,
  amount,
  nested,
}: {
  code: string;
  title: string;
  formula: string;
  amount: number;
  nested?: boolean;
}) {
  return (
    <div
      className={
        nested
          ? "border-l-2 border-gold/50 py-3 pl-4 md:pl-6"
          : "border-b border-mid-gray py-4"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p
          className={`font-medium ${nested ? "text-sm text-muted-text" : "text-navy"}`}
        >
          <span className="text-gold">{code}</span> {title}
        </p>
        <p
          className={`font-display font-semibold tabular-nums ${
            nested ? "text-lg text-muted-text" : "text-2xl text-navy"
          }`}
        >
          {currency.format(amount)}
        </p>
      </div>
      <p className="mt-1 font-mono text-xs text-muted-text">{formula}</p>
    </div>
  );
}

export function SpanOfInfluenceCalculator() {
  // Section 01 — Direct Accountability
  const [hrTech, setHrTech] = useState("450000");
  const [recruiting, setRecruiting] = useState("620000");
  const [learning, setLearning] = useState("380000");
  const [hrComp, setHrComp] = useState("1850000");

  // Section 02 — workforce inputs
  const [headcount, setHeadcount] = useState("1200");
  const [avgSalary, setAvgSalary] = useState("95000");
  const [departures, setDepartures] = useState("144");
  const [absenceDays, setAbsenceDays] = useState("6.5");
  const [dailyAbsenceCost, setDailyAbsenceCost] = useState("365");
  const [workforceComp, setWorkforceComp] = useState("114000000");

  // Replacement cost % by role level
  const [replEntry, setReplEntry] = useState("40");
  const [replMid, setReplMid] = useState("80");
  const [replSenior, setReplSenior] = useState("125");
  const [replExec, setReplExec] = useState("200");

  // Role mix (share of departures)
  const [mixEntry, setMixEntry] = useState("45");
  const [mixMid, setMixMid] = useState("35");
  const [mixSenior, setMixSenior] = useState("15");
  const [mixExec, setMixExec] = useState("5");

  // Assumptions
  const [hrShare, setHrShare] = useState("30");
  const [uplift, setUplift] = useState("17");
  const [managerShare, setManagerShare] = useState("70");
  const [absenceReduction, setAbsenceReduction] = useState("78");

  // Part B — 3e compliance / claim risk
  const [claimCost, setClaimCost] = useState("160000");
  const [claimProbability, setClaimProbability] = useState("10");
  const [riskReduction, setRiskReduction] = useState("");

  // Part B — 3f top performer retention
  const [topRetained, setTopRetained] = useState("");
  const [topSalary, setTopSalary] = useState("");
  const [performancePremium, setPerformancePremium] = useState("2");

  // Part B — 3g policy coordination labor
  const [coordinationHours, setCoordinationHours] = useState("");
  const [hourlyCost, setHourlyCost] = useState("75");


  const directTotal =
    num(hrTech) + num(recruiting) + num(learning) + num(hrComp);

  const mixTotal =
    num(mixEntry) + num(mixMid) + num(mixSenior) + num(mixExec);
  const blendedReplacement =
    mixTotal > 0
      ? (num(mixEntry) * num(replEntry) +
          num(mixMid) * num(replMid) +
          num(mixSenior) * num(replSenior) +
          num(mixExec) * num(replExec)) /
        mixTotal
      : 0;

  const hrShareRate = num(hrShare) / 100;

  const turnover =
    num(departures) *
    num(avgSalary) *
    (blendedReplacement / 100) *
    hrShareRate;

  const engagement = num(workforceComp) * (num(uplift) / 100) * hrShareRate;

  const managerEffectiveness = engagement * (num(managerShare) / 100);

  const absenteeism =
    num(headcount) *
    num(absenceDays) *
    num(dailyAbsenceCost) *
    (num(absenceReduction) / 100) *
    hrShareRate;

  // Part B — no HR-Attributable Share applied; each has its own attribution.
  const claimRisk =
    num(claimCost) * (num(claimProbability) / 100) * (num(riskReduction) / 100);

  const topPerformer =
    num(topRetained) * num(topSalary) * Math.max(num(performancePremium) - 1, 0);

  const coordination = num(coordinationHours) * num(hourlyCost);

  const indirectTotal =
    turnover +
    engagement +
    absenteeism +
    claimRisk +
    topPerformer +
    coordination;

  const gap = indirectTotal - directTotal;
  const ratio = directTotal > 0 ? indirectTotal / directTotal : 0;
  const chartMax = Math.max(directTotal, indirectTotal, 1);


  const roleRows: Array<{
    level: string;
    cost: string;
    setCost: (v: string) => void;
    mix: string;
    setMix: (v: string) => void;
  }> = [
    {
      level: "Entry",
      cost: replEntry,
      setCost: setReplEntry,
      mix: mixEntry,
      setMix: setMixEntry,
    },
    {
      level: "Mid",
      cost: replMid,
      setCost: setReplMid,
      mix: mixMid,
      setMix: setMixMid,
    },
    {
      level: "Senior",
      cost: replSenior,
      setCost: setReplSenior,
      mix: mixSenior,
      setMix: setMixSenior,
    },
    {
      level: "Executive",
      cost: replExec,
      setCost: setReplExec,
      mix: mixExec,
      setMix: setMixExec,
    },
  ];

  const assumptions: Array<{
    id: string;
    label: string;
    value: string;
    set: (v: string) => void;
    source: string;
  }> = [
    {
      id: "hr-share",
      label: "HR-Attributable Share (applied across all indirect categories)",
      value: hrShare,
      set: setHrShare,
      source:
        "No indirect outcome happens through HR's programs alone — managers, market conditions, and individual circumstance all play a role. This share represents the portion of each category's value attributable to HR's own systems and programs, applied consistently rather than only to turnover.",
    },
    {
      id: "uplift",
      label: "Engagement productivity uplift",
      value: uplift,
      set: setUplift,
      source:
        "Gallup meta-analysis of engagement and business outcomes: top-quartile engaged teams show approximately 17% higher productivity than bottom-quartile teams.",
    },
    {
      id: "manager-share",
      label: "Manager-attributable share",
      value: managerShare,
      set: setManagerShare,
      source:
        "Gallup: managers account for roughly 70% of the variance in team engagement scores.",
    },
    {
      id: "absence-reduction",
      label: "Absenteeism reduction",
      value: absenceReduction,
      set: setAbsenceReduction,
      source:
        "Gallup: highly engaged business units report up to 78% lower absenteeism than the least engaged units.",
    },
  ];

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-cream pb-40">
        {/* Header */}
        <header className="relative overflow-hidden bg-navy">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-gold opacity-[0.18]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-gold opacity-[0.15]"
          />
          <div className="relative mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-28">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-gold">
              &#9733; Sirius People, LLC
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[40px] font-semibold leading-[1.1] text-white md:text-[52px]">
              Span of Influence Calculator
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              What HR owns outright, and what HR moves indirectly. Enter your
              numbers, adjust the assumptions, and the case builds itself.
            </p>
            <div className="mt-8 h-1 w-24 bg-gold" />
          </div>
        </header>

        <main className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-24">
          {/* Section 01 */}
          <section aria-labelledby="direct-heading">
            <SectionHeading number="01" title="Direct Accountability" />
            <p id="direct-heading" className="sr-only">
              Direct Accountability
            </p>
            <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <NumberField
                  id="hr-tech"
                  label="HR tech spend"
                  prefix="$"
                  value={hrTech}
                  onChange={setHrTech}
                />
                <NumberField
                  id="recruiting"
                  label="Recruiting budget"
                  prefix="$"
                  value={recruiting}
                  onChange={setRecruiting}
                />
                <NumberField
                  id="learning"
                  label="L&amp;D budget"
                  prefix="$"
                  value={learning}
                  onChange={setLearning}
                />
                <NumberField
                  id="hr-comp"
                  label="HR team comp + benefits"
                  prefix="$"
                  value={hrComp}
                  onChange={setHrComp}
                />
              </div>
              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2 border-t border-mid-gray pt-6">
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted-text">
                  Direct Accountability subtotal
                </p>
                <p className="font-display text-3xl font-semibold tabular-nums text-navy">
                  {currency.format(directTotal)}
                </p>
              </div>
            </div>
          </section>

          {/* Section 02 */}
          <section aria-labelledby="indirect-heading" className="mt-20">
            <SectionHeading number="02" title="Indirect Influence" />
            <p id="indirect-heading" className="sr-only">
              Indirect Influence
            </p>

            {/* Workforce inputs */}
            <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-lg font-semibold text-navy">
                Workforce inputs
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <NumberField
                  id="headcount"
                  label="Headcount"
                  value={headcount}
                  onChange={setHeadcount}
                />
                <NumberField
                  id="avg-salary"
                  label="Average salary"
                  prefix="$"
                  value={avgSalary}
                  onChange={setAvgSalary}
                />
                <NumberField
                  id="departures"
                  label="Annual voluntary departures"
                  value={departures}
                  onChange={setDepartures}
                />
                <NumberField
                  id="absence-days"
                  label="Avg absence days / employee"
                  value={absenceDays}
                  onChange={setAbsenceDays}
                />
                <NumberField
                  id="daily-absence"
                  label="Avg daily cost of absence"
                  prefix="$"
                  value={dailyAbsenceCost}
                  onChange={setDailyAbsenceCost}
                />
                <NumberField
                  id="workforce-comp"
                  label="Total workforce comp cost"
                  prefix="$"
                  value={workforceComp}
                  onChange={setWorkforceComp}
                />
              </div>
            </div>

            {/* Assumptions */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-navy">Assumptions</h3>
                <p className="text-xs text-muted-text">
                  Pre-filled with benchmark defaults. Hover a{" "}
                  <span className="text-gold">&#9733;</span> for the source.
                </p>
              </div>

              {/* Replacement cost table */}
              <div className="mt-6 overflow-hidden rounded-lg border border-mid-gray">
                <div className="flex items-center bg-warm-gray px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-navy">
                    Replacement cost % by role level
                  </p>
                  <SourceTip source="SHRM and Work Institute benchmarks: replacement cost ranges from roughly 40% of salary for entry roles to 200%+ for executive roles, covering recruiting, onboarding, lost productivity, and ramp time." />
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-mid-gray text-left text-xs uppercase tracking-[0.08em] text-muted-text">
                      <th scope="col" className="px-4 py-2 font-medium">
                        Level
                      </th>
                      <th scope="col" className="px-4 py-2 text-right font-medium">
                        Replacement %
                      </th>
                      <th scope="col" className="px-4 py-2 text-right font-medium">
                        Share of departures %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleRows.map((row) => (
                      <tr key={row.level} className="border-t border-mid-gray">
                        <th
                          scope="row"
                          className="px-4 py-2 text-left font-medium text-navy"
                        >
                          {row.level}
                        </th>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min={0}
                            aria-label={`${row.level} replacement cost percent`}
                            value={row.cost}
                            onChange={(e) => row.setCost(e.target.value)}
                            className="w-full rounded border border-mid-gray bg-white px-2 py-1 text-right tabular-nums text-body-text outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            min={0}
                            aria-label={`${row.level} share of departures percent`}
                            value={row.mix}
                            onChange={(e) => row.setMix(e.target.value)}
                            className="w-full rounded border border-mid-gray bg-white px-2 py-1 text-right tabular-nums text-body-text outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                          />
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-mid-gray bg-gold-light/60">
                      <th
                        scope="row"
                        className="px-4 py-2 text-left font-medium text-navy"
                      >
                        Blended rate
                      </th>
                      <td className="px-4 py-2 text-right font-semibold tabular-nums text-navy">
                        {blendedReplacement.toFixed(1)}%
                      </td>
                      <td className="px-4 py-2 text-right text-xs text-muted-text">
                        {mixTotal.toFixed(0)}% allocated
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Percent assumptions */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {assumptions.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1.5">
                    <div className="flex items-center">
                      <label
                        htmlFor={item.id}
                        className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text"
                      >
                        {item.label}
                      </label>
                      <SourceTip source={item.source} />
                    </div>
                    <div className="flex items-center rounded-md border border-mid-gray bg-white focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
                      <input
                        id={item.id}
                        type="number"
                        min={0}
                        max={100}
                        value={item.value}
                        onChange={(e) => item.set(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-right tabular-nums text-base text-body-text outline-none"
                      />
                      <span className="pr-3 text-sm text-muted-text">%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculated influence */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-lg font-semibold text-navy">
                Calculated influence
              </h3>
              <div className="mt-4">
                <ResultRow
                  code="3a"
                  title="Turnover / replacement cost"
                  amount={turnover}
                  formula={`${num(departures).toLocaleString()} departures x ${currency.format(num(avgSalary))} x ${blendedReplacement.toFixed(1)}% blended x ${num(hrShare)}% HR share`}
                />
                <div className="border-b border-mid-gray py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-navy">
                      <span className="text-gold">3b</span> Engagement
                      productivity
                    </p>
                    <p className="font-display text-2xl font-semibold tabular-nums text-navy">
                      {currency.format(engagement)}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted-text">
                    {currency.format(num(workforceComp))} workforce comp x{" "}
                    {num(uplift)}% uplift x {num(hrShare)}% HR share
                  </p>
                  <div className="mt-4">
                    <ResultRow
                      nested
                      code="3c"
                      title="Manager effectiveness share (within 3b)"
                      amount={managerEffectiveness}
                      formula={`${currency.format(engagement)} x ${num(managerShare)}% manager-attributable`}
                    />
                  </div>
                </div>
                <ResultRow
                  code="3d"
                  title="Absenteeism"
                  amount={absenteeism}
                  formula={`${num(headcount).toLocaleString()} employees x ${num(absenceDays)} days x ${currency.format(num(dailyAbsenceCost))} x ${num(absenceReduction)}% reduction x ${num(hrShare)}% HR share`}
                />
              </div>
              <p className="mt-6 rounded-lg bg-gold-light/60 px-4 py-3 text-xs leading-relaxed text-body-text">
                3c is a breakdown of 3b, not an additional amount. The subtotal
                adds 3a, 3b, and 3d so manager impact is never double-counted.
              </p>
              <p className="mt-3 rounded-lg bg-gold-light/60 px-4 py-3 text-xs leading-relaxed text-body-text">
                The HR-Attributable Share is applied to every indirect
                category, not just turnover — reflecting that no outcome here
                happens through HR's programs alone.
              </p>
            </div>
          </section>
        </main>

        {/* Sticky totals */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t-[3px] border-gold bg-navy">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
            <div className="flex flex-1 items-baseline justify-between gap-3 md:justify-start md:gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/70">
                Direct Accountability
              </p>
              <p className="font-display text-xl font-semibold tabular-nums text-white md:text-2xl">
                {currency.format(directTotal)}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="hidden h-8 w-px bg-white/20 md:block"
            />
            <div className="flex flex-1 items-baseline justify-between gap-3 md:justify-end md:gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/70">
                Indirect Influence{" "}
                <span className="text-gold">&middot; Partial (3a&ndash;3d)</span>
              </p>
              <p className="font-display text-xl font-semibold tabular-nums text-gold md:text-2xl">
                {currency.format(indirectTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
