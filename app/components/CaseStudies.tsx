import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getApprovedCaseStudies } from "../data/case-studies";
import InterfacePreview from "./InterfacePreview";
const solutions = [
  { name: "Connected Operations", text: "One workspace for customer relationships, operational processes, and the people who move them forward.", slug: "crm-erp-solutions", kind: "operations", tag: "CRM & BUSINESS APPLICATIONS" },
  { name: "Controlled Data Lifecycles", text: "Bring retention policies, processing jobs, and approval workflows into a structured information lifecycle.", slug: "gdpr-data-retention", kind: "retention", tag: "INFORMATION GOVERNANCE" },
  { name: "Intelligent Workflows", text: "Connect document intake and intelligent processing with human review at the moments that matter.", slug: "ai-intelligent-automation", kind: "automation", tag: "AI & AUTOMATION" },
] as const;

export default function CaseStudies() {
  const approved = getApprovedCaseStudies();
  return (
    <section id="work" className="section solutions-section">
      <div className="container">
        <p className="eyebrow">02 / TECHNOLOGY IN CONTEXT</p>
        <div className="section-heading"><h2>{approved.length ? "Selected Work" : "Solutions We Build"}</h2><p>{approved.length ? "Explore our work through business challenges and the solutions built to address them." : "A closer look at how connected applications, governed data, and intelligent automation can take shape."}</p></div>
        <div className="grid three">
          {approved.length ? approved.map(study => <article className="card" key={study.slug}><p className="eyebrow">{study.industry}</p><h3>{study.projectTitle}</h3><p>{study.challenge}</p><Link className="text-link" href={`/work/${study.slug}`}>Read case study <ArrowUpRight size={16} /></Link></article>) : solutions.map(solution => (
            <article className={`solution-card solution-${solution.kind}`} key={solution.slug}>
              <div className="solution-stage"><InterfacePreview kind={solution.kind} /></div>
              <div className="solution-copy"><p className="eyebrow">{solution.tag}</p><h3>{solution.name}</h3><p>{solution.text}</p><Link className="text-link" href={`/services/${solution.slug}`}>Explore capability <ArrowUpRight size={16} /></Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
