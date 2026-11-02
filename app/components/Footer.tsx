import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><Link href="/" className="footer-brand">RapidNest<span>SOFTWARE SOLUTIONS</span></Link><p>Purposeful technology.<br /><span>Practical business value.</span></p><Link href="/#contact" className="text-link">Let’s talk about your next step <ArrowUpRight size={17} /></Link></div>
    <div className="footer-grid"><div><p>Custom software, connected systems,<br />and intelligent business workflows.</p><a href="mailto:contact@therapidnest.com">contact@therapidnest.com ↗</a></div><nav aria-label="Footer navigation"><Link href="/#services">Services</Link><Link href="/work">Our work</Link><Link href="/#about">Company</Link><Link href="/#contact">Contact</Link></nav><nav aria-label="Featured capabilities"><Link href="/services/gdpr-data-retention">Data retention & governance</Link><Link href="/services/ai-intelligent-automation">AI & automation</Link><Link href="/services/crm-erp-solutions">CRM & ERP solutions</Link></nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} RapidNest Software Solutions</span><span>Business understanding. Engineering discipline.</span></div>
  </div></footer>;
}
