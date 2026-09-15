import { createFileRoute } from "@tanstack/react-router";
import { SpanOfInfluenceCalculator } from "@/components/SpanOfInfluenceCalculator";

const title = "Span of Influence Calculator | Sirius People, LLC";
const description =
  "Quantify what HR owns outright and what HR moves indirectly: direct budget accountability plus turnover, engagement, manager effectiveness, and absenteeism influence.";

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
