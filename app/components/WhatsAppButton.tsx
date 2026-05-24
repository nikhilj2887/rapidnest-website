"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappLink =
    "https://wa.me/916300675410?text=Hi%20Rapidnest,%20I%20want%20to%20discuss%20my%20project.";

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "rapidnest_whatsapp_click", {
        event_category: "engagement",
        event_label: "Floating WhatsApp Button",
        value: 1,
      });
    }

    // Delay redirect slightly so GA can send event
    setTimeout(() => {
      window.open(whatsappLink, "_blank");
    }, 300);
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
    >
      <div
        className="
          w-12 h-12 
          md:w-14 md:h-14 
          bg-green-500 
          hover:bg-green-600 
          rounded-full 
          shadow-xl 
          flex 
          items-center 
          justify-center 
          transition-all 
          duration-300 
          hover:scale-110
        "
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </div>

      <div
        className="
          hidden md:block
          absolute 
          right-16 
          top-1/2 
          -translate-y-1/2 
          bg-black 
          text-white 
          text-sm 
          px-3 
          py-1 
          rounded-lg 
          opacity-0 
          group-hover:opacity-100 
          transition 
          duration-300 
          whitespace-nowrap
        "
      >
        Chat on WhatsApp
      </div>
    </button>
  );
}