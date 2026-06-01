import type {
  BoardGrowthDecisionLatencyExport,
  BoardGrowthDecisionLatencyItem,
  BoardGrowthDecisionLatencyReportItem,
  DecisionAssessment,
  DecisionSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): DecisionAssessment {
  let severity: DecisionSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): DecisionAssessment {
  let severity: DecisionSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardGrowthDecisionLatencyItem[],
  options: { now?: string } = {}
): BoardGrowthDecisionLatencyExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardGrowthDecisionLatencyReportItem[] = items.map((item) => {
    const approvalAssessment = assessDelay(
      item.approvalCycleDays,
      13,
      20,
      "Approval cycle time remains inside the current growth cadence.",
      "Approval cycle time is stretching and may slow the next board-backed move.",
      "Approval cycle time is now a material drag on the current growth story."
    );

    const committeeAssessment = assessDelay(
      item.committeeLagScore,
      44,
      60,
      "Committee lag remains contained for the current lane.",
      "Committee lag is rising and needs tighter ownership before the next milestone.",
      "Committee lag is materially slowing the next board-safe decision."
    );

    const escalationAssessment = assessDelay(
      item.escalationLoopScore,
      40,
      56,
      "Escalation loops remain limited for the current lane.",
      "Escalation loops are rising and stretching decision handoffs.",
      "Escalation loops are now severe enough to distort operating speed."
    );

    const throughputAssessment = assessStrength(
      item.decisionThroughputScore,
      78,
      62,
      "Decision throughput is strong enough to support the current growth motion.",
      "Decision throughput is thinning and needs attention before more scope lands.",
      "Decision throughput is too weak to support the current pace of expansion."
    );

    const readinessAssessment = assessStrength(
      item.boardReadinessScore,
      76,
      60,
      "Board readiness is clear enough to keep the approval story credible.",
      "Board readiness is becoming dependent on extra explanation and follow-up.",
      "Board readiness is too thin to support confident approval decisions."
    );

    const compositeLatencyScore =
      Math.round(
        ((item.approvalCycleDays * 3 +
          item.committeeLagScore +
          item.escalationLoopScore +
          (100 - item.decisionThroughputScore) +
          (100 - item.boardReadinessScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      approvalAssessment,
      committeeAssessment,
      escalationAssessment,
      throughputAssessment,
      readinessAssessment,
      compositeLatencyScore
    };
  });

  const slowDecisionLanes = reportItems.filter(
    (item) =>
      item.approvalAssessment.severity === "HIGH" ||
      item.committeeAssessment.severity === "HIGH" ||
      item.escalationAssessment.severity === "HIGH" ||
      item.throughputAssessment.severity === "HIGH" ||
      item.readinessAssessment.severity === "HIGH"
  ).length;

  const escalationLanes = reportItems.filter(
    (item) => item.action === "ESCALATE" || item.action === "REASSIGN"
  ).length;

  const averageBoardReadiness =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardReadinessScore, 0) / reportItems.length) * 10) /
        10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    slowDecisionLanes === 0
      ? "Decision latency is contained and the current growth story can move without a reset."
      : slowDecisionLanes <= 2
        ? "A few lanes are accumulating enough approval and committee lag to warrant board-visible intervention."
        : "Decision latency is stacking across multiple lanes and now threatens the growth story more than demand does.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      slowDecisionLanes,
      escalationLanes,
      averageBoardReadiness,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardGrowthDecisionLatencyItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
