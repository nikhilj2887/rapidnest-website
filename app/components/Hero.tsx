import Link from "next/link";
import { ArrowUpRight, Check, Code2, Database, GitBranch, Layers3, ShieldCheck } from "lucide-react";
import InterfacePreview from "./InterfacePreview";

export default function Hero() {
  return (
    <section className="hero hero-connected">
      <div className="hero-grid-texture" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="accent-line" />CUSTOM SOFTWARE · AI AUTOMATION · ENTERPRISE SOLUTIONS</p>
          <h1><span className="hero-phrase">Engineering<br className="desktop-break" /> Digital Solutions.</span>{" "}<span className="hero-phrase">Accelerating<br className="desktop-break" /> Business Growth.</span></h1>
          <p className="lead">From custom software and AI automation to CRM, cloud modernization, and data governance, RapidNest builds technology solutions around real business needs.</p>
          <div className="actions">
            <Link href="/work" className="button primary">Explore Solutions <ArrowUpRight size={17} /></Link>
            <Link href="/#contact" className="button secondary">Discuss Your Project</Link>
          </div>
          <div className="hero-principles"><span><Check size={13} />Clear requirements</span><span><Check size={13} />Reviewable releases</span></div>
        </div>
        <div className="hero-composition">
          <div className="composition-heading"><span>FROM COMPLEXITY TO CLARITY</span><span className="composition-line" /></div>
          <div className="hero-system-panel">
            <InterfacePreview />
            <div className="hero-system-footer">
              <div className="integration-note">
                <div className="hero-system-summary"><span className="note-icon"><Layers3 size={18} aria-hidden="true" /></span><strong>Systems that work together</strong></div>
                <div className="hero-system-map">
                  <span className="hero-system-node"><Code2 size={18} aria-hidden="true" /><span>Applications</span></span><span className="hero-system-link" aria-hidden="true"> · </span>
                  <span className="hero-system-node"><GitBranch size={18} aria-hidden="true" /><span>Workflows</span></span><span className="hero-system-link" aria-hidden="true"> · </span>
                  <span className="hero-system-node"><Database size={18} aria-hidden="true" /><span>Data</span></span>
                </div>
              </div>
              <div className="governance-note"><span className="hero-governance-symbol"><ShieldCheck size={17} aria-hidden="true" /></span><span>Designed with control in mind</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom"><div className="container"><span>STRATEGY MEETS ENGINEERING</span><span>Custom applications. Connected processes. Governed data.</span><a href="#services" aria-label="Explore services">Explore <span aria-hidden="true">↓</span></a></div></div>
    </section>
  );
}
