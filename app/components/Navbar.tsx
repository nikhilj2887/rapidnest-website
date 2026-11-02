"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
const links = [["/#services", "Services"], ["/work", "Our work"], ["/#why-us", "Approach"], ["/#about", "Company"], ["/#contact", "Discuss Your Project"]];
export default function Navbar() {
    const [open, setOpen] = useState(false);
    return <header className="site-header"><nav className="container nav" aria-label="Main navigation" onKeyDown={e => { if (e.key === "Escape")
        setOpen(false); }}>
 <Link href="/" className="brand" onClick={() => setOpen(false)}><Image src="/Rapidnest.png" alt="" width={42} height={42}/><span>RapidNest<small>SOFTWARE SOLUTIONS</small></span></Link>
 <button className="menu-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu +"}</button>
 <div id="nav-links" className={`nav-links ${open ? "is-open" : ""}`}>{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div>
 </nav></header>;
}
