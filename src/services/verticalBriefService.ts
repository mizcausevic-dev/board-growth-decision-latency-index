import { analyze } from "../analyze.js";
import { sampleBoardGrowthDecisionLatency } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardGrowthDecisionLatency, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Accelerate procurement and AI approvals first, reset identity and biotech review cadence, and reassign fragmented FinTech sign-off before widening the next growth claim."
  };
}

export function decisionLane() {
  return sampleBoardGrowthDecisionLatency.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    latencyTheme: item.latencyTheme,
    boardReadinessScore: item.boardReadinessScore,
    nextMove: item.nextMove
  }));
}

export function approvalLedger() {
  return sampleBoardGrowthDecisionLatency.map((item) => ({
    lane: item.lane,
    approvalHeadline: item.approvalHeadline,
    queueSignal: item.queueSignal,
    escalationOwner: item.escalationOwner,
    requiredEvidence: item.requiredEvidence
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeLatencyScore: item.compositeLatencyScore,
    approval: item.approvalAssessment,
    committee: item.committeeAssessment,
    escalation: item.escalationAssessment,
    throughput: item.throughputAssessment,
    readiness: item.readinessAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeLatencyScore: item.compositeLatencyScore,
    boardReadinessScore: item.boardReadinessScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic decision-latency data only - no live board packets, approval logs, or actual committee records are included.",
    "Scores are modeled to show how Kinetic Gain can convert approval drag into board-readable intervention priorities.",
    "All routes are read-only and meant to demonstrate decision-latency packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    decisionLane: decisionLane(),
    approvalLedger: approvalLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardGrowthDecisionLatency
  };
}
