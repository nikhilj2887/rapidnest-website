import Link from "next/link";
import { Code2, Bot, Blocks, ShieldCheck, Cloud, Smartphone, Compass, ArrowUpRight, Check } from "lucide-react";
import { services } from "../data/services";
import InterfacePreview from "./InterfacePreview";
const icons = { Code2, Bot, Blocks, ShieldCheck, Cloud, Smartphone, Compass };

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <p className="eyebrow">OUR SERVICES</p>
        <div className="section-heading"><h2>Built for your business.<br /><span className="subtle-heading">Engineered for what’s next.</span></h2><p>Modernize an operation. Connect your systems. Bring a new idea to life. We help turn the right technology decisions into working solutions.</p></div>
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons];
            const visual = index === 0 ? "operations" : index === 3 ? "retention" : null;
            return (
              <article className={`service-card service-${index}${visual ? " service-featured" : ""}`} key={service.slug}>
                <div className="service-copy">
                  <div className="service-heading"><span className="service-icon"><Icon size={22} aria-hidden="true" /></span><h3>{service.title}</h3></div>
                  <p>{service.description}</p>
                  <ul className="service-capabilities">{service.capabilities.slice(0, 3).map(capability => <li key={capability}><Check size={12} aria-hidden="true" />{capability}</li>)}</ul>
                  <Link className="text-link" href={`/services/${service.slug}`}>Explore Service <ArrowUpRight size={16} /><span className="sr-only">: {service.title}</span></Link>
                </div>
                {visual && <div className="service-preview"><InterfacePreview kind={visual} /></div>}
                {index === 1 && <div className="ai-path" aria-hidden="true"><span>Input</span><i /><Bot size={19} /><i /><span>Human review</span></div>}
              </article>
            );
          })}
        </div>
        <div className="service-footer"><p>Have a challenge that spans more than one service?<br /><strong>Let’s find the right starting point.</strong></p><Link href="/#contact" className="button outline">Discuss Your Project <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>
  );
}
