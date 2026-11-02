import Image from "next/image";
import { relationships } from "../data/relationships";
export default function Clients({ partnerships = false }: {
    partnerships?: boolean;
}) {
    const approved = relationships.filter(r => r.kind === (partnerships ? "partner" : "client") && r.verification === "verified" && r.publicationApproved);
    if (partnerships && !approved.length) return null;
    return <section id={partnerships ? "partnerships" : "clients"} className={partnerships ? "section muted" : "credibility"}><div className="container">
 <p className="eyebrow">{partnerships ? "PROFESSIONAL PARTNERSHIPS" : "BUSINESS CONTEXT. ENGINEERING DISCIPLINE."}</p>
 {approved.length ? <div className="logo-grid">{approved.map(r => <div className="logo-card" key={r.name}><Image src={r.logo} alt={r.name} width={160} height={80}/>{r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer">Visit {r.name} ↗</a> : <span>{r.name}</span>}</div>)}</div> : <div className="credibility-items"><span>Business applications</span><span>Intelligent automation</span><span>Information governance</span><span>Technology delivery</span></div>}
 </div></section>;
}
