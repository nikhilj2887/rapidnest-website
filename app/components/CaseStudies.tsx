import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getApprovedCaseStudies } from "../data/case-studies";

const solutions = [
  { name: "Connected Operations", text: "One workspace for customer relationships, operational processes, and the people who move them forward.", slug: "crm-erp-solutions", kind: "operations", flow: ["Customer information", "Operational workflows", "Reporting"], tag: "CRM & BUSINESS APPLICATIONS" },
  { name: "Controlled Data Lifecycles", text: "Bring retention policies, processing jobs, and approval workflows into a structured information lifecycle.", slug: "gdpr-data-retention", kind: "retention", flow: ["Catalogue", "Policy", "Approval"], tag: "INFORMATION GOVERNANCE" },
  { name: "Intelligent Workflows", text: "Connect document intake and intelligent processing with human review at the moments that matter.", slug: "ai-intelligent-automation", kind: "automation", flow: ["Document received", "Intelligent processing", "Human review"], tag: "AI & AUTOMATION" },
] as const;

export default function CaseStudies() {
  const approved = getApprovedCaseStudies();
  return (
    <section id="work" className="section solutions-section">
      <div className="container">
        <p className="eyebrow">SOLUTIONS WE BUILD</p>
        <div className="section-heading"><h2>{approved.length ? "Selected Work" : "Solutions We Build"}</h2><p>{approved.length ? "Explore our work through business challenges and the solutions built to address them." : "A closer look at how connected applications, governed data, and intelligent automation can take shape."}</p></div>
        {!approved.length && <p className="solution-disclaimer">Illustrative solution flows · Not client project results</p>}
        <div className={approved.length ? "grid three" : "solution-stories"}>
          {approved.length ? approved.map(study => <article className="card" key={study.slug}><p className="eyebrow">{study.industry}</p><h3>{study.projectTitle}</h3><p>{study.challenge}</p><Link className="text-link" href={`/work/${study.slug}`}>Read case study <ArrowUpRight size={16} /></Link></article>) : solutions.map(solution => (
            <article className={`solution-card solution-${solution.kind}`} key={solution.slug}>
              <div className="solution-copy"><p className="eyebrow">{solution.tag}</p><h3>{solution.name}</h3><p>{solution.text}</p><Link className="text-link" href={`/services/${solution.slug}`}>Explore capability <ArrowUpRight size={16} /></Link></div>
              <ol className="solution-flow" aria-label={`${solution.name}: illustrative flow`}>{solution.flow.map(step => <li key={step}>{step}</li>)}</ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
