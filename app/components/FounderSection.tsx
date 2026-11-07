import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Globe2, ListChecks } from "lucide-react";

const highlights = [
  { title: "Cross-Industry Experience", description: "FinTech, payments, healthcare, education technology, and IT services.", icon: BriefcaseBusiness },
  { title: "Global Delivery Exposure", description: "Experience collaborating with international stakeholders and distributed technology teams.", icon: Globe2 },
  { title: "Structured Leadership", description: "Project governance, Agile delivery, stakeholder management, and operational excellence.", icon: ListChecks },
];

export default function FounderSection() {
  return (
    <section id="founder" className="section founder-section" aria-labelledby="founder-heading">
      <div className="container founder-grid">
        <div className="founder-heading">
          <p className="eyebrow">MEET THE FOUNDER</p>
          <h2 id="founder-heading">Leadership Built on Delivery Excellence</h2>
          <p className="founder-intro">A business perspective. A delivery mindset.</p>
        </div>
        <div className="founder-portrait">
          <div className="founder-photo"><Image src="/founder.png" alt="Nikhil Jogiparthy, Founder of RapidNest Software Solutions" width={784} height={1176} sizes="745px" /></div>
          <div className="portrait-caption"><strong>Nikhil Jogiparthy</strong><span>Founder | RapidNest Software Solutions</span></div>
        </div>
        <div className="founder-copy">
          <p>Nikhil Jogiparthy is a technology delivery and program management professional with over 14 years of experience across FinTech, payments, healthcare, education technology, and IT services. His background includes leading cross-functional teams, managing complex technology initiatives, and translating business requirements into practical software solutions.</p>
          <p>At RapidNest Software Solutions, he brings a structured approach to technology delivery, stakeholder collaboration, risk management, and continuous improvement, with a focus on maintainable solutions and meaningful business outcomes.</p>
        </div>
        <div className="founder-details">
          <ul className="founder-highlights">
            {highlights.map(({ title, description, icon: Icon }) => <li key={title}><Icon size={20} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></li>)}
          </ul>
          <div className="founder-qualifications"><h3>Professional Qualifications</h3><ul><li>PRINCE2 Practitioner</li><li>Certified ScrumMaster (CSM)</li><li>Senior Management Programme — Indian Institute of Management Visakhapatnam</li></ul></div>
          <blockquote className="founder-quote"><p>“Understand the business first. Build with purpose. Deliver with accountability.”</p><footer>— Nikhil Jogiparthy</footer></blockquote>
          <div className="founder-actions"><Link href="/#contact" className="button primary">Discuss Your Project <ArrowUpRight size={16} aria-hidden="true" /></Link><a href="https://www.linkedin.com/in/nikhil-jogiparthy/" target="_blank" rel="noopener noreferrer" className="text-link">Connect on LinkedIn <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
        </div>
      </div>
    </section>
  );
}
