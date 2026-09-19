import { useEffect, useRef, useState } from "react";
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

function compactCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${Math.round(value)}`;
}

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
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pointerTypeRef = useRef<string>("");
  const closedOnPointerDownRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        !(target instanceof Element && target.closest("[data-radix-popper-content-wrapper]"))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label={`Source: ${source}`}
          onPointerDown={(event) => {
            pointerTypeRef.current = event.pointerType;
            if (event.pointerType === "touch") {
              // When already open, let the tooltip library close it on
              // pointerdown and skip our click toggle so it stays closed.
              closedOnPointerDownRef.current = open;
              if (!open) event.preventDefault();
            }
          }}
          onClick={() => {
            if (pointerTypeRef.current === "touch") {
              if (closedOnPointerDownRef.current) {
                closedOnPointerDownRef.current = false;
                return;
              }
              setOpen(true);
            }
          }}
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
  code?: string;
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
          {code ? (
            <span className="text-gold">{code} </span>
          ) : null}
          {title}
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

  // Share card
  const [copied, setCopied] = useState(false);


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
    num(topRetained) * num(topSalary) * num(performancePremium);

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

  const shareSentence = `My HR budget is ${compactCurrency(directTotal)}. My actual influence is ${compactCurrency(indirectTotal)}, or ${ratio.toFixed(1)}x my budget. Calculated with The Shadow Budget, a CHRO's Span-of-Influence Calculator, by Sirius People, LLC.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareSentence);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — leave button as is.
    }
  };



  const roleRows: Array<{
    level: string;
    descriptor: string;
    cost: string;
    setCost: (v: string) => void;
    mix: string;
    setMix: (v: string) => void;
  }> = [
    {
      level: "Entry",
      descriptor: "Individual contributor / staff",
      cost: replEntry,
      setCost: setReplEntry,
      mix: mixEntry,
      setMix: setMixEntry,
    },
    {
      level: "Mid",
      descriptor: "Technical / specialist",
      cost: replMid,
      setCost: setReplMid,
      mix: mixMid,
      setMix: setMixMid,
    },
    {
      level: "Senior",
      descriptor: "Manager or Director",
      cost: replSenior,
      setCost: setReplSenior,
      mix: mixSenior,
      setMix: setMixSenior,
    },
    {
      level: "Executive",
      descriptor: "VP and above",
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
      label: "HR-Attributable Share (applied to turnover, engagement productivity, and absenteeism)",
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
              The Shadow Budget
            </h1>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-gold md:text-sm">
              A CHRO&#39;s Span-of-Influence Calculator
            </p>
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
                  Pre-filled with illustrative defaults. Hover a{" "}
                  <span className="text-gold">&#9733;</span> for the source;
                  adjust the departure mix to your organization.
                </p>
              </div>

              {/* Replacement cost table */}
              <div className="mt-6 overflow-hidden rounded-lg border border-mid-gray">
                <div className="flex items-center bg-warm-gray px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-navy">
                    Replacement cost % by role level
                  </p>
                  <SourceTip source="SHRM and Work Institute benchmarks: replacement cost ranges from roughly 40% of salary for entry roles to 200%+ for executive roles, covering recruiting, onboarding, lost productivity, and ramp time. Entry = Individual contributor / staff; Mid = Technical / specialist; Senior = Manager or Director; Executive = VP and above." />
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
                          <span className="block text-xs font-normal text-muted-text">
                            {row.descriptor}
                          </span>
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
                        {blendedReplacement.toFixed(2)}%
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

            {/* Part B — risk, retention, coordination */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-navy">
                  Risk, retention and coordination
                </h3>
              </div>

              <div className="mt-6 border-t border-mid-gray pt-6">
                <p className="text-sm font-medium text-navy">
                  Compliance / employment claim risk
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    id="claim-cost"
                    label="Avg cost of an employment claim"
                    prefix="$"
                    value={claimCost}
                    onChange={setClaimCost}
                    source="Hiscox Employment Practices Liability report: the average cost to defend and settle an employment charge is roughly $160,000."
                  />
                  <NumberField
                    id="claim-probability"
                    label="Baseline annual claim probability"
                    suffix="%"
                    value={claimProbability}
                    onChange={setClaimProbability}
                    source="Hiscox: US employers face roughly a 10% chance of an employment charge being filed against them in a given year."
                  />
                  <NumberField
                    id="risk-reduction"
                    label="Risk reduction from HR programs"
                    suffix="%"
                    value={riskReduction}
                    onChange={setRiskReduction}
                    placeholder="your estimate"
                    estimate
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-mid-gray pt-6">
                <p className="text-sm font-medium text-navy">
                  Top performer retention
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    id="top-retained"
                    label="Top performers retained via HR intervention"
                    value={topRetained}
                    onChange={setTopRetained}
                    placeholder="your estimate"
                    estimate
                  />
                  <NumberField
                    id="top-salary"
                    label="Avg salary of a retained top performer"
                    prefix="$"
                    value={topSalary}
                    onChange={setTopSalary}
                    placeholder="your estimate"
                    estimate
                  />
                  <NumberField
                    id="performance-premium"
                    label="Performance premium multiplier"
                    suffix="x"
                    step="0.1"
                    value={performancePremium}
                    onChange={setPerformancePremium}
                    source="Research on individual output variance (Hunter, Schmidt &amp; Judiesch; O'Boyle &amp; Aguinis) finds high performers deliver roughly twice the output of an average performer in complex roles."
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-mid-gray pt-6">
                <p className="text-sm font-medium text-navy">
                  Policy coordination labor
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberField
                    id="coordination-hours"
                    label="Annual policy-coordination hours"
                    value={coordinationHours}
                    onChange={setCoordinationHours}
                    placeholder="your estimate"
                    estimate
                  />
                  <NumberField
                    id="hourly-cost"
                    label="Blended hourly cost"
                    prefix="$"
                    value={hourlyCost}
                    onChange={setHourlyCost}
                    source="Bureau of Labor Statistics Employer Costs for Employee Compensation: blended hourly cost of wages plus benefits for professional and management staff, rounded to $75."
                  />
                </div>
              </div>

              <p className="mt-8 rounded-lg bg-gold-light/60 px-4 py-3 text-xs leading-relaxed text-body-text">
                The HR-Attributable Share is not applied to compliance risk,
                top performer retention, or policy coordination. Each carries
                its own attribution: the risk-reduction % is itself an
                attribution variable, retention counts only saves already
                scoped to a specific HR intervention, and coordination is
                direct labor-hour accounting.
              </p>
            </div>


            {/* Calculated influence */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-lg font-semibold text-navy">
                Calculated influence
              </h3>
              <div className="mt-4">
                <ResultRow
                  title="Turnover / replacement cost"
                  amount={turnover}
                  formula={`${num(departures).toLocaleString()} departures x ${currency.format(num(avgSalary))} x ${blendedReplacement.toFixed(2)}% blended x ${num(hrShare)}% HR share`}
                />
                <div className="border-b border-mid-gray py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-navy">
                      Engagement productivity
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
                      title="Manager effectiveness share (within Engagement productivity)"
                      amount={managerEffectiveness}
                      formula={`${currency.format(engagement)} x ${num(managerShare)}% manager-attributable`}
                    />
                  </div>
                </div>
                <ResultRow
                  title="Absenteeism"
                  amount={absenteeism}
                  formula={`${num(headcount).toLocaleString()} employees x ${num(absenceDays)} days x ${currency.format(num(dailyAbsenceCost))} x ${num(absenceReduction)}% reduction x ${num(hrShare)}% HR share`}
                />
                <ResultRow
                  title="Compliance / employment claim risk"
                  amount={claimRisk}
                  formula={`${currency.format(num(claimCost))} x ${num(claimProbability)}% probability x ${num(riskReduction)}% risk reduction`}
                />
                <ResultRow
                  title="Top performer retention"
                  amount={topPerformer}
                  formula={`${num(topRetained).toLocaleString()} retained x ${currency.format(num(topSalary))} x ${num(performancePremium).toFixed(1)} performance premium`}
                />
                <ResultRow
                  title="Policy coordination labor"
                  amount={coordination}
                  formula={`${num(coordinationHours).toLocaleString()} hours x ${currency.format(num(hourlyCost))} blended hourly cost`}
                />
              </div>

              <p className="mt-6 rounded-lg bg-gold-light/60 px-4 py-3 text-xs leading-relaxed text-body-text">
                Manager effectiveness share is a breakdown of Engagement
                productivity, not an additional amount. The subtotal adds
                Turnover, Engagement productivity, Absenteeism, Compliance
                risk, Top performer retention, and Policy coordination so
                manager impact is never double-counted.
              </p>
              <p className="mt-3 rounded-lg bg-gold-light/60 px-4 py-3 text-xs leading-relaxed text-body-text">
                The HR-Attributable Share is applied to turnover, engagement
                productivity, and absenteeism only — reflecting that no
                outcome here happens through HR's programs alone.
              </p>
            </div>
          </section>

          {/* Section 03 — Output */}
          <section aria-labelledby="gap-heading" className="mt-20">
            <SectionHeading number="03" title="The Gap" />
            <p id="gap-heading" className="sr-only">
              The Gap
            </p>

            <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-warm-gray p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                    Accountable For
                  </p>
                  <p className="mt-3 font-display text-[34px] font-semibold leading-tight tabular-nums text-navy md:text-[44px]">
                    {currency.format(directTotal)}
                  </p>
                  <p className="mt-2 text-xs text-muted-text">
                    Budget lines HR owns outright
                  </p>
                </div>
                <div className="rounded-lg bg-navy p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/70">
                    Actually Influence
                  </p>
                  <p className="mt-3 font-display text-[34px] font-semibold leading-tight tabular-nums text-gold md:text-[44px]">
                    {currency.format(indirectTotal)}
                  </p>
                  <p className="mt-2 text-xs text-white/70">
                    Indirect value across all indirect categories
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-mid-gray pt-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                    The gap
                  </p>
                  <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-navy">
                    {currency.format(gap)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                    Ratio
                  </p>
                  <p className="mt-1 font-display text-3xl font-semibold tabular-nums text-navy">
                    {ratio.toFixed(1)}x
                  </p>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted-text">
                  You influence {ratio.toFixed(1)}x what you are accountable
                  for.
                </p>
              </div>

              {/* Bar chart */}
              <div className="mt-8 space-y-5 border-t border-mid-gray pt-8">
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                      Accountable For
                    </p>
                    <p className="text-sm font-semibold tabular-nums text-navy">
                      {currency.format(directTotal)}
                    </p>
                  </div>
                  <div className="mt-2 h-6 w-full overflow-hidden rounded-sm bg-warm-gray">
                    <div
                      className="h-full bg-navy transition-all duration-300"
                      style={{ width: `${(directTotal / chartMax) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                      Actually Influence
                    </p>
                    <p className="text-sm font-semibold tabular-nums text-navy">
                      {currency.format(indirectTotal)}
                    </p>
                  </div>
                  <div className="mt-2 h-6 w-full overflow-hidden rounded-sm bg-warm-gray">
                    <div
                      className="h-full bg-gold transition-all duration-300"
                      style={{ width: `${(indirectTotal / chartMax) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Collapsible breakdown */}
              <details className="group mt-8 rounded-lg border border-mid-gray">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-navy">
                  <span>Breakdown of Indirect Influence</span>
                  <span
                    aria-hidden="true"
                    className="text-gold transition-transform group-open:rotate-180"
                  >
                    &#9662;
                  </span>
                </summary>
                <div className="border-t border-mid-gray px-4 pb-4">
                  {[
                    { title: "Turnover / replacement cost", amount: turnover },
                    { title: "Engagement productivity", amount: engagement },
                    {
                      title: "Manager effectiveness share",
                      amount: managerEffectiveness,
                      nested: true,
                    },
                    { title: "Absenteeism", amount: absenteeism },
                    { title: "Compliance / claim risk", amount: claimRisk },
                    { title: "Top performer retention", amount: topPerformer },
                    { title: "Policy coordination labor", amount: coordination },
                  ].map((row) => (
                    <div
                      key={row.title}
                      className={`flex flex-wrap items-baseline justify-between gap-2 border-b border-mid-gray py-3 last:border-b-0 ${
                        row.nested ? "pl-4 md:pl-6" : ""
                      }`}
                    >
                      <p
                        className={
                          row.nested
                            ? "text-sm text-muted-text"
                            : "text-sm font-medium text-navy"
                        }
                      >
                        {row.title}
                        {row.nested ? (
                          <span className="ml-2 text-xs text-muted-text">
                            within Engagement productivity &mdash; not added
                          </span>
                        ) : null}
                      </p>
                      <p
                        className={`font-display font-semibold tabular-nums ${
                          row.nested
                            ? "text-base text-muted-text"
                            : "text-lg text-navy"
                        }`}
                      >
                        {currency.format(row.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </details>

              {/* Share your result */}
              {directTotal > 0 ? (
                <div className="mt-8 rounded-lg border border-mid-gray bg-warm-gray p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-text">
                    Share your result
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-body-text md:text-base">
                    {shareSentence}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="mt-4 rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <p className="mt-3 text-xs text-muted-text">
                    Defaults are illustrative. Adjust the assumptions to your
                    organization.
                  </p>
                </div>
              ) : null}
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
                Indirect Influence
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
