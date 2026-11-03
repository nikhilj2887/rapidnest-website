import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../../data/services";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

async function findService(params: Props["params"]) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await findService(params);
  return {
    title: `${service.title} | RapidNest`, description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.description, url: `/services/${service.slug}` },
    twitter: { card: "summary", title: service.title, description: service.description },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = await findService(params);
  const related = services.filter(item => service.relatedServices.includes(item.slug));
  const gdpr = service.slug === "gdpr-data-retention";
  return <>
    <section className="detail-hero"><div className="container">
      <Link href="/#services" className="text-link">← All services</Link>
      <p className="eyebrow">{service.title}</p>
      <h1>{gdpr ? "Smarter Data Retention. Better Information Governance." : service.title}</h1>
      <p className="lead">{service.detailedDescription}</p>
      <Link href="/#contact" className="button primary">{service.cta} ↗</Link>
    </div></section>
    <section className="section"><div className="container">
      <div className="grid two">
        <div><p className="eyebrow">BUSINESS CONTEXT</p><h2>Problems this service addresses</h2><ul className="detail-list">{service.challenges.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div><p className="eyebrow">TYPICAL DELIVERABLES</p><h2>What an engagement can include</h2><p>Deliverables and acceptance criteria are agreed during scoping.</p><ul className="detail-list">{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </div></section>
    <section className="section muted"><div className="container">
      <p className="eyebrow">SERVICE CAPABILITIES</p><h2>{gdpr ? "A controlled information lifecycle" : "From requirements to implementation"}</h2>
      <div className="capability-list">{service.capabilities.map((capability, index) => <article className="capability-item" key={capability}><h3>{capability}</h3><p>{service.capabilityDetails[index]}</p></article>)}</div>
    </div></section>
    {gdpr && <section className="section"><div className="container"><p className="eyebrow">RETENTION WORKFLOW</p><h2>From policy to accountable execution</h2><ol className="workflow">{["Data Catalogue", "Policy Configuration", "Job Setup", "Validation", "Authorized Execution", "Monitoring & Reporting"].map(item => <li key={item}>{item}<span aria-hidden="true"> →</span></li>)}</ol></div></section>}
    <section className="section"><div className="container grid two">
      <div><p className="eyebrow">IMPLEMENTATION</p><h2>How we approach the work</h2><p>{service.implementation}</p><h3>Relevant use cases</h3><ul className="detail-list">{service.useCases.map(item => <li key={item}>{item}</li>)}</ul></div>
      <div><p className="eyebrow">INTEGRATIONS & CONSTRAINTS</p><h2>Working with your environment</h2><p>{service.integrationConsiderations}</p>{service.technologies.length > 0 && <><h3>Relevant technologies</h3><div className="badges">{service.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><p>{service.technologyContext}</p></>}{gdpr && <p>This service supports technical information governance. It does not provide legal advice, certification, or a guarantee of GDPR compliance.</p>}</div>
    </div></section>
    <section className="section muted"><div className="container narrow"><p className="eyebrow">COMMON QUESTIONS</p><h2>Before we get started</h2>{service.faqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<nav className="related-services" aria-label="Related services"><h3>Related capabilities</h3>{related.map(item => <Link key={item.slug} className="text-link" href={`/services/${item.slug}`}>{item.title} <span aria-hidden="true">↗</span></Link>)}</nav><div className="actions"><Link className="button primary" href="/#contact">Request a Consultation ↗</Link></div></div></section>
  </>;
}
