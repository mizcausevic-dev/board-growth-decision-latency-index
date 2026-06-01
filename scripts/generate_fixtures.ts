import { writeFileSync } from "node:fs";
import { sampleBoardGrowthDecisionLatency } from "../src/data/sampleVerticalBrief.js";
import { toExport } from "../src/analyze.js";

const clean = sampleBoardGrowthDecisionLatency.map((item) => ({
  ...item,
  relatedSurfaces: [],
  companyTags: [],
  narrative: "[redacted]",
  nextMove: "[redacted]"
}));

writeFileSync("fixtures/board-growth-decision-latency-index.json", JSON.stringify(toExport(sampleBoardGrowthDecisionLatency), null, 2));
writeFileSync("fixtures/board-growth-decision-latency-index-clean.json", JSON.stringify(toExport(clean), null, 2));
