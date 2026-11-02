import Link from "next/link";
export default function Hero() { return <section className="hero"><div className="container hero-grid"><div>
 <p className="eyebrow">CUSTOM SOFTWARE · AI AUTOMATION · ENTERPRISE SOLUTIONS</p>
 <h1>Engineering Digital Solutions.<br/><span>Accelerating Business Growth.</span></h1>
 <p className="lead">From AI automation and enterprise applications to custom CRM platforms and data retention solutions, RapidNest Software Solutions helps businesses modernize operations and build scalable technology.</p>
 <div className="actions"><Link href="/work" className="button primary">Explore Our Work <span aria-hidden="true">↗</span></Link><Link href="/#contact" className="button secondary">Discuss Your Project</Link></div>
 <p className="trust">Business understanding. Structured delivery. Maintainable technology.</p></div>
 <div className="system-visual" aria-hidden="true"><div className="visual-top"><span>CONNECTED BY DESIGN</span><span>RN / 01</span></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="core">RN<span>ENGINEERING<br/>WITH PURPOSE</span></div><span className="node node-a">Intelligent workflows</span><span className="node node-b">Business applications</span><span className="node node-c">Connected data</span><div className="visual-bottom">STRATEGY → SYSTEMS → BUSINESS VALUE</div></div>
 </div></section>; }
