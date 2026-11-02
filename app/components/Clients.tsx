import Image from "next/image";
import { getApprovedRelationships } from "../data/relationships";

export default function Clients({ partnerships = false }: { partnerships?: boolean }) {
  const approved = getApprovedRelationships(partnerships ? "partner" : "client");
  if (!approved.length) return null;

  return (
    <section id={partnerships ? "partnerships" : "clients"} className="section relationships-section">
      <div className="container">
        <p className="eyebrow">{partnerships ? "PROFESSIONAL CONNECTIONS" : "SHARED BUSINESS CONTEXT"}</p>
        <h2>{partnerships ? "Strategic Partnerships & Professional Connections" : "Organizations We've Worked With"}</h2>
        <div className="logo-grid">
          {approved.map(organization => (
            <div className="logo-card" key={organization.name}>
              <Image src={organization.logo} alt={organization.name} width={160} height={80} sizes="160px" />
              {organization.url ? <a href={organization.url} target="_blank" rel="noopener noreferrer">Visit {organization.name} <span aria-hidden="true">↗</span></a> : <span>{organization.name}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
