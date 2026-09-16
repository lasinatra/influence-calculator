import { createFileRoute } from "@tanstack/react-router";
import { SpanOfInfluenceCalculator } from "@/components/SpanOfInfluenceCalculator";

const title = "The Shadow Budget — A CHRO's Span-of-Influence Calculator";
const description =
  "A CHRO's Span-of-Influence Calculator: quantify what HR owns outright and what HR moves indirectly — direct budgets plus turnover, engagement, absenteeism, and more.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SpanOfInfluenceCalculator />;
}
