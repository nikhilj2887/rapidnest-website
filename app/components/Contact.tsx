"use client";

import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      await emailjs.send(
        "service_s6mwk07",
        "template_274iknk",
        formData,
        "eJavp4TkqXR9RoRJR"
      );

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "contact_form_submit", {
          event_category: "lead",
          event_label: "Contact Form Submission",
          value: 1,
        });
      }

      setSuccess(true);
      e.target.reset();

    } catch (error) {
      console.log("EMAILJS ERROR:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "contact_whatsapp_click", {
        event_category: "lead",
        event_label: "Contact Section WhatsApp",
        value: 1,
      });
    }

    setTimeout(() => {
      window.open(
        "https://wa.me/916300675410?text=Hi%20I%20want%20to%20discuss%20my%20project",
        "_blank"
      );
    }, 300);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-32 py-16 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Have a Project in Mind? Let’s Talk
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Need a website, mobile app, or custom software solution?
            Let’s discuss your project and get you a free quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <a
              href="mailto:nikhil@therapidnest.com"
              className="group flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Email Us
                </h3>

                <p className="text-gray-300">
                  nikhil@therapidnest.com
                </p>
              </div>
            </a>

            <a
              href="tel:+916300675410"
              className="group flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Schedule a Call
                </h3>

                <p className="text-gray-300">
                  +91 6300675410
                </p>
              </div>
            </a>

            <button
              onClick={handleWhatsAppClick}
              className="group flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-left w-full"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  WhatsApp Us
                </h3>

                <p className="text-gray-300">
                  Get instant responses for quick project discussions
                </p>
              </div>
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">

            {success && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-sm text-center">

                  <div className="text-green-500 text-5xl mb-4">
                    ✓
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Message Sent!
                  </h3>

                  <p className="text-gray-600 mb-6">
                    Thanks for contacting Rapidnest.
                    Our team will get back to you shortly.
                  </p>

                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg"
                  >
                    Close
                  </button>

                </div>
              </div>
            )}

            <form onSubmit={sendEmail} className="space-y-6">

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white resize-none"
                />
              </div>

              <p className="text-sm text-gray-400 text-center">
                Trusted by startups and businesses across USA, UAE & India
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Get Free Consultation"}

                <Send className="w-5 h-5" />
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}