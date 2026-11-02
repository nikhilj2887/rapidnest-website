import { Compass, ListChecks, Lightbulb, Wrench } from "lucide-react";
const values = [
  { title: "Business-First Thinking", text: "We begin by understanding the operational challenge before recommending technology.", icon: Compass },
  { title: "Structured Delivery", text: "Clear requirements, milestones, reviews, and communication guide our delivery approach.", icon: ListChecks },
  { title: "Practical Innovation", text: "We evaluate modern technologies and automation based on their usefulness to the business.", icon: Lightbulb },
  { title: "Long-Term Maintainability", text: "We prioritize solutions that can be supported, improved, and extended.", icon: Wrench },
];
export default function WhyChooseUs() {
  return <section id="why-us" className="section why-section"><div className="container why-layout">
    <div className="why-intro"><p className="eyebrow">03 / THE RAPIDNEST APPROACH</p><h2>Technology Expertise with a Delivery-First Mindset</h2><p>Good technology starts with understanding what the business actually needs.</p><div className="approach-signature"><span>Think clearly.</span><span>Build purposefully.</span></div></div>
    <div className="values-list">{values.map(({ title, text, icon: Icon }, index) => <article className="value-row" key={title}><span className="value-icon"><Icon size={22} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div><span className="index">0{index + 1}</span></article>)}</div>
  </div></section>;
}
