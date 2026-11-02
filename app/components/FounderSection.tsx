import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FounderSection() {
  return (
    <section id="founder" className="section founder-section">
      <div className="container founder-grid">
        <div className="founder-portrait">
          <div className="founder-photo"><Image src="/founder.png" alt="Nikhil Gupta, founder of RapidNest Software Solutions" width={784} height={1176} sizes="(max-width: 480px) calc(100vw - 64px), 320px" /></div>
          <div className="portrait-caption"><strong>Nikhil Gupta</strong><span>Founder · RapidNest Software Solutions</span></div>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">07 / PEOPLE BEHIND THE TECHNOLOGY</p>
          <h2>Leadership Built on<br />Delivery Excellence</h2>
          <p className="founder-intro">A business perspective.<br />A delivery mindset.</p>
          <p>Nikhil Gupta is the founder of RapidNest Software Solutions, bringing experience across technology delivery, project and program management, and business operations.</p>
          <p>His professional background spans FinTech, healthcare, education technology, and IT services, with a focus on translating business requirements into structured technology initiatives.</p>
          <p>His approach emphasizes clear communication, practical technology decisions, accountable delivery, and sustainable business value.</p>
          <div className="founder-focus"><span>Clear communication</span><span>Accountable delivery</span><span>Sustainable value</span></div>
          <Link href="/#contact" className="text-link">Request a Consultation <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
