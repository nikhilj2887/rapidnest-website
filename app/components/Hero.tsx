"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function Hero() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/916300675410?text=Hi%20I%20am%20interested%20in%20your%20web/app%20development%20services",
      "_blank"
    );
  };

  const scrollToServices = () => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="
        relative 
        min-h-[100svh] 
        pt-24 md:pt-28
        flex items-center 
        justify-center 
        overflow-hidden 
        bg-gradient-to-br 
        from-slate-950 
        via-slate-900 
        to-gray-950
      "
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20 animate-blob"></div>

        <div
          className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-2 md:px-4 rounded-full bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-orange-500/20 mb-6 md:mb-8"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          
          <span className="text-xs sm:text-sm text-orange-300 font-medium">
            AI-Powered Software Solutions
          </span>

          <Zap className="w-4 h-4 text-cyan-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Build Faster.
          <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
            Launch Smarter.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-10 px-2"
        >
          We build websites, apps, and custom software that help businesses
          launch faster and scale smarter.
        </motion.p>

        
        {/* CTA Buttons */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none mx-auto"
>
  <button
    onClick={openWhatsApp}
    className="
      group
      w-full sm:w-auto
      px-5 sm:px-8
      py-3.5 sm:py-4
      text-base sm:text-lg
      bg-gradient-to-r 
      from-orange-600 
      to-amber-600 
      text-white 
      rounded-lg 
      font-semibold 
      hover:scale-105 
      transition-all 
      duration-300
    "
  >
    Get Free Quote
    <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>

  <button
    onClick={scrollToServices}
    className="
      w-full sm:w-auto
      px-5 sm:px-8
      py-3.5 sm:py-4
      text-base sm:text-lg
      bg-white/10
      border border-white/20
      text-white
      rounded-lg
      font-semibold
      hover:bg-white/20
      transition
    "
  >
    View Services
  </button>
</motion.div>

        {/* Trust text */}
        <p className="text-sm text-gray-400 mt-6 px-4">
          Trusted by startups & businesses across USA, UAE & India
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}