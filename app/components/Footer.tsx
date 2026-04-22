"use client";

import { Mail, MessageCircle, Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 bg-[#020817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Updated gap from gap-10 → gap-12 */}
        <div className="grid md:grid-cols-3 gap-12 items-start">

          {/* Brand Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              Rapidnest Software Solutions
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Building websites, mobile apps, and custom software solutions
              for startups and growing businesses worldwide.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-5">

              {/* Website / LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <Link size={18} />
              </a>

              {/* Email */}
              <a
                href="mailto:nikhil@therapidnest.com"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <Mail size={18} />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/916300675410"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="#services"
                className="text-gray-400 hover:text-orange-400"
              >
                Services
              </a>

              <a
                href="#clients"
                className="text-gray-400 hover:text-orange-400"
              >
                Clients
              </a>

              <a
                href="#why-us"
                className="text-gray-400 hover:text-orange-400"
              >
                Why Us
              </a>

              <a
                href="#about"
                className="text-gray-400 hover:text-orange-400"
              >
                About
              </a>

              <a
                href="#contact"
                className="text-gray-400 hover:text-orange-400"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right md:pr-10 lg:pr-16">
            <p className="text-gray-400 text-sm">
              © 2026 Rapidnest Software Solutions
            </p>

            <p className="text-gray-500 text-sm mt-2">
              All rights reserved.
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Built with ❤️ in India
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}