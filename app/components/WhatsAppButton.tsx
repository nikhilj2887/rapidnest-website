"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappLink =
    "https://wa.me/916300675410?text=Hi%20Rapidnest,%20I%20want%20to%20discuss%20my%20project.";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>

      {/* Optional tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
        Chat on WhatsApp
      </div>
    </a>
  );
}