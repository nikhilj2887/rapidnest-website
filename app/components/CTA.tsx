"use client";

export default function CTA() {
  const handleCTAWhatsApp = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cta_whatsapp_click", {
        event_category: "lead",
        event_label: "CTA Section WhatsApp",
        value: 1,
      });
    }

    setTimeout(() => {
      window.open(
        "https://wa.me/916300675410?text=Hi%20Rapidnest,%20I%20want%20to%20discuss%20my%20project.",
        "_blank"
      );
    }, 300);
  };

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Get Your Free Consultation Today
      </h2>

      <p className="mb-6">
        Limited slots available this week
      </p>

      <button
        onClick={handleCTAWhatsApp}
        className="bg-black text-white px-8 py-4 rounded"
      >
        Chat on WhatsApp Now
      </button>
    </section>
  );
}