"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);

  if (element) {
    window.history.replaceState(null, "", `#${sectionId}`);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsMobileMenuOpen(false);
  }
};

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/916300675410?text=Hi%20I%20am%20interested%20in%20your%20services",
      "_blank"
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0b1220]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-[#07111f]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navbar container */}
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo Section */}
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer min-w-0"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <Image
              src="/Rapidnest.png"
              alt="Rapidnest Logo"
              width={45}
              height={45}
              priority
              className="object-contain w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
            />

            <div className="min-w-0">
              <div className="text-white font-semibold text-sm sm:text-base md:text-xl tracking-wide leading-tight truncate max-w-[180px] sm:max-w-[220px] md:max-w-none">
                Rapidnest Software Solutions
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["services", "clients", "why-us", "about", "founder","contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-orange-400 transition-colors font-medium capitalize"
                >
                  {item.replace("-", " ")}
                </button>
              )
            )}

            <button
              onClick={openWhatsApp}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-1 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b1220]/98 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-5 space-y-3">
            {["services", "clients", "why-us", "about", "founder", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium capitalize"
                >
                  {item.replace("-", " ")}
                </button>
              )
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="block w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}