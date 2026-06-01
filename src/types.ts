export type DecisionLatencyTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type DecisionAction = "ACCELERATE" | "ESCALATE" | "PAUSE" | "REASSIGN";

export type DecisionSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardGrowthDecisionLatencyItem {
  id: string;
  lane: string;
  track: DecisionLatencyTrack;
  action: DecisionAction;
  latencyTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  approvalHeadline: string;
  queueSignal: string;
  escalationOwner: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  approvalCycleDays: number;
  committeeLagScore: number;
  escalationLoopScore: number;
  decisionThroughputScore: number;
  boardReadinessScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface DecisionAssessment {
  severity: DecisionSeverity;
  ok: boolean;
  message: string;
}

export interface BoardGrowthDecisionLatencyReportItem extends BoardGrowthDecisionLatencyItem {
  approvalAssessment: DecisionAssessment;
  committeeAssessment: DecisionAssessment;
  escalationAssessment: DecisionAssessment;
  throughputAssessment: DecisionAssessment;
  readinessAssessment: DecisionAssessment;
  compositeLatencyScore: number;
}

export interface BoardGrowthDecisionLatencySummary {
  items: number;
  slowDecisionLanes: number;
  escalationLanes: number;
  averageBoardReadiness: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardGrowthDecisionLatencyExport {
  generatedAt: string;
  summary: BoardGrowthDecisionLatencySummary;
  items: BoardGrowthDecisionLatencyReportItem[];
}

export interface BoardGrowthDecisionLatencyPayload {
  report: BoardGrowthDecisionLatencyExport;
  decisionLane: ReturnType<typeof import("./services/verticalBriefService.js").decisionLane>;
  approvalLedger: ReturnType<typeof import("./services/verticalBriefService.js").approvalLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardGrowthDecisionLatencyItem[];
}
