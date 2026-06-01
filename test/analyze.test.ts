import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardGrowthDecisionLatency } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardGrowthDecisionLatency, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardGrowthDecisionLatency.length);
  });

  it("counts slow decision lanes", () => {
    const report = analyze(sampleBoardGrowthDecisionLatency, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.slowDecisionLanes).toBeGreaterThan(0);
  });

  it("counts escalation actions", () => {
    const report = analyze(sampleBoardGrowthDecisionLatency, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.escalationLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardGrowthDecisionLatency, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(143);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardGrowthDecisionLatency, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });
});
