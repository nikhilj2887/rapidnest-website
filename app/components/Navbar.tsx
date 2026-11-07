"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";

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
  const navigation = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [clickedHash, setClickedHash] = useState("");
  const subscribe = useCallback((onChange: () => void) => subscribeHash(() => {
    setClickedHash("");
    onChange();
  }), []);
  const hash = useSyncExternalStore(subscribe, getHash, emptyHash);
  const current = pathname.startsWith("/services/") ? "/#services" : pathname.startsWith("/work") ? "/work" : `/${hash || clickedHash}`;

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navigation.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return <header className="site-header"><nav ref={navigation} className="container nav" aria-label="Main navigation">
    <Link href="/" className="brand" onClick={() => { setOpen(false); setClickedHash(""); }}><Image src="/Rapidnest.png" alt="" width={42} height={42} /><span>RapidNest<small>SOFTWARE SOLUTIONS</small></span></Link>
    <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open} aria-controls="nav-links" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(value => !value)}>{open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}</button>
    <div id="nav-links" className={`nav-links ${open ? "is-open" : ""}`}>{links.map(([href, label]) => <Link key={href} href={href} aria-current={current === href ? (href === "/work" ? "page" : "location") : undefined} onClick={() => { setOpen(false); setClickedHash(href.includes("#") ? href.slice(1) : ""); }}>{label}</Link>)}</div>
  </nav></header>;
}
