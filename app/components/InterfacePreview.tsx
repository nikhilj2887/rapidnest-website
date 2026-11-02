import {
  ArrowDown, ArrowRight, Check, CheckCheck, FileText, GitBranch,
  LayoutDashboard, LockKeyhole, Search, ShieldCheck, SlidersHorizontal, Users,
} from "lucide-react";

type PreviewKind = "overview" | "operations" | "retention" | "automation";
const labels: Record<PreviewKind, string> = {
  overview: "Business workspace",
  operations: "Connected operations",
  retention: "Information governance",
  automation: "Workflow studio",
};

/** Original illustrative UI. Never presented as a client screenshot or a live product. */
export default function InterfacePreview({ kind = "overview" }: { kind?: PreviewKind }) {
  return (
    <div className={`interface-preview preview-${kind}`}>
      <div className="app-chrome" aria-hidden="true">
        <div className="window-dots"><i /><i /><i /></div>
        <span>workspace / {kind === "overview" ? "overview" : kind}</span>
        <LockKeyhole size={11} />
      </div>
      <div className="app-shell" aria-hidden="true">
        {kind === "overview" && (
          <div className="app-sidebar">
            <div className="app-monogram">r<span>n</span></div>
            <LayoutDashboard size={16} /><Users size={16} />
            <GitBranch size={16} /><ShieldCheck size={16} />
            <SlidersHorizontal size={16} />
          </div>
        )}
        <div className="app-main">
          <div className="app-title"><div><span className="app-overline">{kind === "retention" ? "DATA LIFECYCLE" : "WORKSPACE"}</span><strong>{labels[kind]}</strong></div><Search size={15} /></div>
          {kind === "automation" ? <AutomationCanvas /> : kind === "retention" ? <RetentionPanel /> : <OperationsPanel overview={kind === "overview"} />}
        </div>
      </div>
      <p className="concept-caption"><span />Concept interface · Illustrative example</p>
    </div>
  );
}

function OperationsPanel({ overview }: { overview: boolean }) {
  return <>
    <div className="app-tabs"><span className="selected">Overview</span><span>Workflows</span><span>Reporting</span></div>
    {overview && <div className="workspace-modules">
      <div><Users size={15} /><span>Customer workspace</span><strong>Connected CRM</strong></div>
      <div><GitBranch size={15} /><span>Business processes</span><strong>Structured workflows</strong></div>
      <div><ShieldCheck size={15} /><span>Information controls</span><strong>Governed data</strong></div>
    </div>}
    <div className="pipeline-heading"><strong>Opportunity pipeline</strong><span>Board view</span></div>
    <div className="pipeline-board">
      {[
        { title: "Discovery", task: "Requirements review", detail: "Business context", initials: "BA" },
        { title: "In progress", task: "Solution design", detail: "Delivery planning", initials: "PM" },
        { title: "Review", task: "Stakeholder feedback", detail: "Acceptance review", initials: "QA" },
      ].map(column => <div className="pipeline-column" key={column.title}>
        <span className="column-label"><i />{column.title}</span>
        <div className="task-card"><span className="task-tag">{column.detail}</span><strong>{column.task}</strong><div className="task-lines"><i /><i /></div><div className="task-footer"><span className="avatar">{column.initials}</span><CheckCheck size={12} /></div></div>
      </div>)}
    </div>
    {overview && <div className="app-activity"><span className="activity-icon"><Check size={12} /></span><div><strong>A connected view of your business</strong><span>People, processes, and information in context.</span></div><ArrowRight size={15} /></div>}
  </>;
}

function RetentionPanel() {
  return <>
    <div className="policy-banner"><ShieldCheck size={22} /><div><strong>Policy-led processing</strong><span>Validation before authorized execution</span></div><LockKeyhole size={14} /></div>
    <div className="retention-table">
      <div className="retention-row table-label"><span>Data context</span><span>Job stage</span></div>
      <div className="retention-row"><span><FileText size={13} />Operational records</span><span className="status-pill amber">Pending review</span></div>
      <div className="retention-row"><span><FileText size={13} />Archive catalogue</span><span className="status-pill teal">Validation</span></div>
      <div className="retention-row"><span><FileText size={13} />Policy exceptions</span><span className="status-pill slate">On hold</span></div>
    </div>
    <div className="policy-flow"><span>Catalogue</span><ArrowRight size={12} /><span>Policy</span><ArrowRight size={12} /><span>Approval</span></div>
  </>;
}

function AutomationCanvas() {
  return <div className="automation-canvas">
    <div className="automation-step"><span className="step-symbol"><FileText size={16} /></span><div><strong>Document received</strong><span>Capture & classify</span></div><Check size={14} /></div>
    <ArrowDown className="flow-arrow" size={16} />
    <div className="automation-step"><span className="step-symbol violet"><GitBranch size={16} /></span><div><strong>Intelligent processing</strong><span>Extract & route information</span></div><Check size={14} /></div>
    <ArrowDown className="flow-arrow" size={16} />
    <div className="automation-step human-step"><span className="step-symbol orange"><Users size={16} /></span><div><strong>Human review</strong><span>Review before the next action</span></div><span className="review-dot" /></div>
  </div>;
}
