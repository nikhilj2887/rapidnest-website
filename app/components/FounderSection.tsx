"use client";

import Image from "next/image";
import { Award, Globe, Briefcase } from "lucide-react";

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="scroll-mt-24 py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-[420px]">
              <Image
                src="/founder.png"
                alt="Nikhil Gupta Founder Rapidnest"
                width={420}
                height={500}
                className="rounded-3xl shadow-xl object-cover w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <p className="text-orange-600 font-semibold mb-3">
              Meet The Founder
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Hi, I’m Nikhil Gupta
            </h2>

            <p className="text-gray-600 mb-5 leading-relaxed">
              Founder of Rapidnest Software Solutions with over 15+ years of
              experience in business development, project management, and
              resource management.
            </p>

            <p className="text-gray-600 mb-5 leading-relaxed">
              Worked across EdTech, FinTech, Healthcare, Staffing, and
              Ecommerce industries while delivering scalable solutions.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Successfully served clients across the US, South Africa,
              Europe, UAE, and India.
            </p>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                <Award className="mx-auto text-orange-600 mb-2" />
                <p className="font-semibold text-gray-800">
                  PRINCE2 + CSM
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                <Briefcase className="mx-auto text-orange-600 mb-2" />
                <p className="font-semibold text-gray-800">
                  15+ Years
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-center">
                <Globe className="mx-auto text-orange-600 mb-2" />
                <p className="font-semibold text-gray-800">
                  Global Clients
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}