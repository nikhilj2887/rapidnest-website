"use client";
import { MessageCircle } from "lucide-react";
export default function WhatsAppButton() { return <div className="whatsapp-rail"><a className="whatsapp-button" href="https://wa.me/916300675410?text=Hi%20Rapidnest,%20I%20want%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" aria-label="Discuss your project on WhatsApp" onClick={() => window.gtag?.("event", "rapidnest_whatsapp_click", { event_category: "engagement", event_label: "Floating WhatsApp Button", value: 1 })}><MessageCircle size={22} aria-hidden="true"/><span>WhatsApp</span></a></div>; }
