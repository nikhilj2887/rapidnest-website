"use client";
import emailjs from "@emailjs/browser";
import { useRef, useState, type FormEvent } from "react";
import { services } from "../data/services";
export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "invalid" | "cooldown">("idle");
    const busy = useRef(false);
    const lastSent = useRef(0);
    async function sendEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (busy.current)
            return;
        const form = e.currentTarget;
        const data = new FormData(form);
        if (data.get("website"))
            return;
        const name = String(data.get("name") ?? "").trim(), email = String(data.get("email") ?? "").trim(), message = String(data.get("message") ?? "").trim();
        if (!name || !email || !message || !form.reportValidity()) {
            setStatus("invalid");
            return;
        }
        if (Date.now() - lastSent.current < 30000) { setStatus("cooldown"); return; }
        busy.current = true;
        setStatus("sending");
        const details = ["company", "phone", "service", "budget", "timeline"].map(k => [k, String(data.get(k) ?? "").trim()]).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
        try {
            await emailjs.send("service_s6mwk07", "template_274iknk", { name, email, message: details ? `${message}\n\nProject details\n${details}` : message }, { publicKey: "eJavp4TkqXR9RoRJR", blockHeadless: true, limitRate: { id: "rapidnest-contact", throttle: 30000 } });
            lastSent.current = Date.now();
            setStatus("success");
            form.reset();
            try {
                window.gtag?.("event", "contact_form_submit", { event_category: "lead", event_label: "Contact Form Submission", value: 1 });
            }
            catch { /* Analytics must not change delivery status. */ }
        }
        catch {
            setStatus("error");
        }
        finally {
            busy.current = false;
        }
    }
    return <section id="contact" className="section dark-section"><div className="container grid two"><div><p className="eyebrow">LET’S BUILD WHAT’S NEXT</p><h2>Your next chapter.<br />Let’s build it together.</h2><p>Start with a conversation about your goals. We’ll discuss the business challenge, understand your existing systems, and identify a practical next step.</p><ol className="discovery-steps"><li>Share your challenge</li><li>Explore the possibilities</li><li>Define the next step</li></ol><div className="contact-links"><a href="mailto:contact@therapidnest.com">contact@therapidnest.com ↗</a><a href="tel:+916300675410">+91 6300675410</a><a href="https://wa.me/916300675410?text=Hi%20I%20want%20to%20discuss%20my%20project" target="_blank" rel="noopener noreferrer" onClick={() => window.gtag?.("event", "contact_whatsapp_click", { event_category: "lead", event_label: "Contact Section WhatsApp", value: 1 })}>Connect on WhatsApp ↗</a></div></div>
 <form onSubmit={sendEmail} className="contact-form" aria-busy={status === "sending"}><div className="form-intro"><h3>Discuss your project</h3><p>A little context helps us start the right conversation.</p><span>* Required fields</span></div><div className="form-grid">
 <label htmlFor="name">Full name *<input id="name" name="name" autoComplete="name" required maxLength={120}/></label>
 <label htmlFor="email">Email address *<input id="email" name="email" type="email" autoComplete="email" required maxLength={254}/></label>
 <label htmlFor="company">Company (optional)<input id="company" name="company" autoComplete="organization" maxLength={150}/></label>
 <label htmlFor="phone">Phone (optional)<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40}/></label>
 <label htmlFor="service" className="full-width">Service of interest (optional)<select id="service" name="service" defaultValue=""><option value="">Select a service (optional)</option>{services.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}</select></label>
 <label htmlFor="budget">Estimated budget (optional)<input id="budget" name="budget" placeholder="Amount and currency" maxLength={80}/></label>
 <label htmlFor="timeline">Expected timeline (optional)<input id="timeline" name="timeline" placeholder="Your target date" maxLength={80}/></label>
 <label htmlFor="message" className="full-width">Project details *<textarea aria-describedby="contact-privacy" id="message" name="message" rows={4} required maxLength={5000}/></label>
 </div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
 <p id="contact-privacy" className="privacy-note">Your details are sent through EmailJS to respond to your inquiry. Please avoid sensitive or confidential information. For privacy questions, email contact@therapidnest.com.</p>
 <button className="button primary" type="submit" disabled={status === "sending"}>{status === "sending" && <span className="loading-indicator" aria-hidden="true" />}{status === "sending" ? "Sending…" : "Request a Consultation ↗"}</button>
 <div role="status" aria-live="polite">{status === "success" && <p className="form-feedback">Your message was sent. Thank you for contacting RapidNest.</p>}</div>
 {status === "invalid" && <p role="alert" className="form-feedback">Please enter your name, a valid email address, and a project description.</p>}
 {status === "cooldown" && <p role="alert" className="form-feedback">Your previous inquiry was sent. Please wait 30 seconds before sending another.</p>}
 {status === "error" && <p role="alert" className="form-feedback">We couldn’t send your message. Your details are still here. Please try again, or email contact@therapidnest.com.</p>}
 </form></div></section>;
}
