import { describe, expect, it } from "vitest";
import { approvalLedger, decisionLane, interventionPosture, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the latency summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the decision lane view", () => {
    expect(decisionLane().length).toBeGreaterThan(0);
  });

  it("returns the approval ledger view", () => {
    expect(approvalLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
