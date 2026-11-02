"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Content starts visible; motion is added only when an element enters the viewport. */
export default function MotionEnhancements() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!window.IntersectionObserver) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      ".section-heading, .service-card, .solution-card, .value-row, .process li, .technology-panel, .founder-portrait, .founder-copy, .contact-form, .logo-grid, .detail-hero h1"
    ));
    let observer: IntersectionObserver | undefined;
    const clear = () => {
      observer?.disconnect();
      elements.forEach(element => {
        element.classList.remove("reveal-enter");
        element.style.removeProperty("--reveal-delay");
      });
    };
    const start = () => {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("reveal-enter");
          observer?.unobserve(element);
        });
      }, { threshold: 0.08 });
      elements.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${(index % 3) * 80}ms`);
        observer?.observe(element);
      });
    };
    start();
    preference.addEventListener("change", start);
    return () => { clear(); preference.removeEventListener("change", start); };
  }, [pathname]);
  return null;
}
