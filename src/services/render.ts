import { approvalLedger, decisionLane, interventionPosture, payload, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Growth Decision Latency Index";
const domain = "https://latency.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/decision-lane", "Decision lane"],
    ["/approval-ledger", "Approval ledger"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = decisionLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Latency theme:</strong> ${escapeHtml(item.latencyTheme)}</p>
        <p><strong>Board readiness:</strong> ${item.boardReadinessScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.lane)}</strong> · latency ${item.compositeLatencyScore} · $${item.valueAtStakeMillions}M at stake</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Decision latency</span>
      <h1>Where are approvals, committee lag, and escalation loops slowing board-backed growth decisions?</h1>
      <p class="lede">Board Growth Decision Latency Index turns AI, identity, revenue, FinTech, biotech, and procurement approval drag into one board-readable packet for acceleration, reassignment, pause, or escalation decisions.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Decision lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current decision-latency packet.</div></div>
        <div class="metric"><span class="metric-label">Slow lanes</span><span class="metric-value">${executiveSummary.slowDecisionLanes}</span><div class="metric-copy">Lanes with severe approval, committee, escalation, throughput, or readiness pressure.</div></div>
        <div class="metric"><span class="metric-label">Escalations</span><span class="metric-value">${executiveSummary.escalationLanes}</span><div class="metric-copy">Lanes that already warrant escalation or ownership reassignment.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unresolved decision latency.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Decision lane</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible exposures</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready decision-latency surface for approval queues, committee lag, intervention posture, and value-at-stake across the executive estate."
  );
}

export function renderDecisionLane() {
  const rows = decisionLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.latencyTheme)}</td>
        <td>${item.boardReadinessScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Decision lane",
    "/decision-lane",
    `<section class="hero">
      <span class="eyebrow">Decision lane</span>
      <h1>Every growth lane stays tied to one latency theme, one board audience, and one safe next move.</h1>
      <p class="lede">The decision lane keeps approval drag readable instead of hiding committee lag across scattered status updates and explanation loops.</p>
      <div class="nav">${navLinks("/decision-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Latency theme</th><th>Board readiness</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Decision-latency view showing actions, themes, and board-readiness strength."
  );
}

export function renderApprovalLedger() {
  const rows = approvalLedger()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.approvalHeadline)}</td>
        <td>${escapeHtml(item.queueSignal)}</td>
        <td>${escapeHtml(item.escalationOwner)}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Approval ledger",
    "/approval-ledger",
    `<section class="hero">
      <span class="eyebrow">Approval ledger</span>
      <h1>Approval headlines, queue signals, escalation owners, and required evidence stay visible before decision latency compounds.</h1>
      <p class="lede">This view makes it obvious which approval bottlenecks are slowing the next growth milestone and who must respond before the board funds more scope.</p>
      <div class="nav">${navLinks("/approval-ledger")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Approval headline</th><th>Queue signal</th><th>Escalation owner</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Approval-ledger view for committee lag, queue signals, and named escalation ownership."
  );
}

export function renderInterventionPosture() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeLatencyScore}</td>
        <td>${escapeHtml(item.approval.severity)}</td>
        <td>${escapeHtml(item.committee.severity)}</td>
        <td>${escapeHtml(item.escalation.severity)}</td>
        <td>${escapeHtml(item.readiness.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>See where leadership can accelerate, reassign, pause, or escalate before decision latency erodes the board story.</h1>
      <p class="lede">This posture view keeps latency scores and severity signals connected so leadership can respond before approval drag multiplies across adjacent lanes.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Composite latency</th><th>Approval</th><th>Committee</th><th>Escalation</th><th>Readiness</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture view for decision-latency severities, composite latency, and board-safe action."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this decision-latency packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, latency assumptions, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Growth Decision Latency Index sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Growth Decision Latency Index docs</h1>
      <p class="lede">This surface packages board-readable decision latency into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/decision-lane</code> keeps actions, latency themes, and next moves readable.</li>
        <li><code>/approval-ledger</code> compares approval headlines, queue signals, and escalation ownership.</li>
        <li><code>/intervention-posture</code> shows which lanes should accelerate, reassign, pause, or escalate.</li>
        <li><code>/api/payload</code> exposes the reproducible decision-latency packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Growth Decision Latency Index and its board-ready routes."
  );
}
