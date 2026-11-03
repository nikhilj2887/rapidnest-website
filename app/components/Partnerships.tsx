import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getApprovedRelationships } from "../data/relationships";

const profiles: Record<string, { subtitle?: string; width: number; height: number }> = {
  WICCI: { subtitle: "Women's Indian Chamber of Commerce & Industry", width: 191, height: 79 },
  G100: { width: 300, height: 300 },
};

export default function Partnerships() {
  const partners = getApprovedRelationships("partner").filter(partner => profiles[partner.name]);
  if (!partners.length) return null;

  return (
    <section id="partnerships" className="section partnerships-section" aria-labelledby="partnerships-heading">
      <div className="container">
        <p className="eyebrow">BUSINESS NETWORKS & PROFESSIONAL COMMUNITIES</p>
        <h2 id="partnerships-heading">Our Global Partnerships</h2>
        <p className="partnerships-intro">RapidNest Software Solutions collaborates with international business networks and professional communities to support innovation, technology adoption, and meaningful business connections.</p>
        <div className="partnership-grid">
          {partners.map(partner => {
            const profile = profiles[partner.name];
            return (
              <article className="partnership-card" key={partner.name}>
                <div className="partnership-logo"><Image src={partner.logo} alt={`${partner.name} logo`} width={profile.width} height={profile.height} sizes="180px" /></div>
                <span className="partnership-badge">Professional connection</span>
                <h3>{partner.name}</h3>
                {profile.subtitle && <p className="partnership-subtitle">{profile.subtitle}</p>}
                {partner.url && <a className="partnership-link text-link" href={partner.url} target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink size={16} aria-hidden="true" /><span className="sr-only">: {partner.name} (opens in a new tab)</span></a>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
