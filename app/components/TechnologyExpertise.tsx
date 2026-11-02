import { Braces, Code2, Layers3 } from "lucide-react";
const frontend = [
  { name: "React", detail: "Component-based interfaces", icon: Layers3 },
  { name: "Next.js", detail: "Modern web applications", icon: Code2 },
  { name: "TypeScript", detail: "Typed application development", icon: Braces },
];
export default function TechnologyExpertise() {
  return <section id="technology" className="section technology-section"><div className="container technology-layout">
    <div><p className="eyebrow">05 / TECHNOLOGY</p><h2>Technology Selected for the Problem, Not the Trend</h2><p>A focused frontend stack for clear, responsive digital experiences.</p><p className="technology-context">These examples reflect the frontend technologies used on this website. The implementation stack for a client engagement is agreed during discovery.</p></div>
    <div className="technology-panel"><div className="technology-label"><span>FRONTEND</span><span>ENGINEERING TOOLKIT</span></div>{frontend.map(({ name, detail, icon: Icon }) => <div className="technology-row" key={name}><span className="tech-mark"><Icon size={23} aria-hidden="true" /></span><div><strong>{name}</strong><span>{detail}</span></div><span className="tech-badge">Web</span></div>)}</div>
  </div></section>;
}
