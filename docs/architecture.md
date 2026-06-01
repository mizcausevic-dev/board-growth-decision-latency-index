# Architecture

Board Growth Decision Latency Index is a static-friendly TypeScript executive-intelligence surface for showing where approvals, committee lag, escalation loops, and decision throughput are slowing the board-backed growth story.

## Routes

- `/`
- `/decision-lane`
- `/approval-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample decision-latency items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores approval cycle time, committee lag, escalation loops, decision throughput, and board readiness.
3. `src/services/verticalBriefService.ts` shapes the board-readable latency packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
