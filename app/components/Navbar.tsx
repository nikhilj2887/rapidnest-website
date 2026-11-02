"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";

const links = [["/#services", "Services"], ["/work", "Our work"], ["/#why-us", "Approach"], ["/#about", "Company"], ["/#contact", "Discuss Your Project"]];
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => { window.removeEventListener("hashchange", onChange); window.removeEventListener("popstate", onChange); };
}
const getHash = () => window.location.hash;
const emptyHash = () => "";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeHash, getHash, emptyHash);
  const [clickedHash, setClickedHash] = useState("");
  const current = pathname.startsWith("/services/") ? "/#services" : pathname.startsWith("/work") ? "/work" : `/${hash || clickedHash}`;

  return <header className="site-header"><nav className="container nav" aria-label="Main navigation" onKeyDown={event => {
    if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
  }}>
    <Link href="/" className="brand" onClick={() => { setOpen(false); setClickedHash(""); }}><Image src="/Rapidnest.png" alt="" width={42} height={42} /><span>RapidNest<small>SOFTWARE SOLUTIONS</small></span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu +"}</button>
    <div id="nav-links" className={`nav-links ${open ? "is-open" : ""}`}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={current === href ? (href === "/work" ? "page" : "location") : undefined} onClick={() => { setOpen(false); setClickedHash(href.includes("#") ? href.slice(1) : ""); }}>{label}</Link>)}</div>
  </nav></header>;
}
