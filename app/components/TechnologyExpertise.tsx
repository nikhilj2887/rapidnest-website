import { Cloud, Workflow, Code2, Database, PanelsTopLeft, AppWindow } from "lucide-react";
import { getApprovedTechnologyNames, technologyCategories } from "../data/technology";

const icons = { cloud: Cloud, automation: Workflow, dotnet: Code2, data: Database, power: PanelsTopLeft, web: AppWindow };

export default function TechnologyExpertise() {
  const approved = new Set(getApprovedTechnologyNames());
  return (
    <section id="technology" className="section technology-section">
      <div className="container">
        <p className="eyebrow">TECHNOLOGY EXPERTISE</p>
        <div className="section-heading technology-heading">
          <h2>Technology Expertise Across the Digital Ecosystem</h2>
          <p>Our engineering capabilities cover application development, cloud deployment, workflow automation, and reporting. Technology choices reflect your existing platforms, integration needs, and support requirements.</p>
        </div>
        <div className="technology-categories">
          {technologyCategories.map(category => {
            const Icon = icons[category.id];
            const names = category.technologies.filter(name => approved.has(name));
            return (
              <article className="technology-category" key={category.id}>
                <span className="technology-category-icon"><Icon size={22} aria-hidden="true" /></span>
                <div><h3>{category.title}</h3><p>{category.description}</p>
                  {names.length > 0 && <ul className="technology-tools" aria-label={`${category.title} technologies`}>{names.map(name => <li key={name}>{name}</li>)}</ul>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
