import type { BoardGrowthDecisionLatencyExport } from "./types.js";

export function formatSummary(report: BoardGrowthDecisionLatencyExport) {
  return [
    "Board Growth Decision Latency Index",
    `Generated: ${report.generatedAt}`,
    `Lanes: ${report.summary.items}`,
    `Slow decision lanes: ${report.summary.slowDecisionLanes}`,
    `Escalation lanes: ${report.summary.escalationLanes}`,
    `Average board readiness: ${report.summary.averageBoardReadiness}`,
    `Value at stake: $${report.summary.valueAtStakeMillions}M`,
    `Lead: ${report.summary.leadingMessage}`
  ].join("\n");
}

export function formatJson(report: BoardGrowthDecisionLatencyExport) {
  return JSON.stringify(report, null, 2);
}
