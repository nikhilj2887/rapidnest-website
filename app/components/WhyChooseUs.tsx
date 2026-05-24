"use client";

import {
  Clock,
  Bot,
  DollarSign,
  Globe,
  ArrowRight,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/916300675410?text=Hi%20I%20want%20to%20discuss%20my%20project";

const benefits = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Launch websites, apps, and software products in weeks—not months.",
  },
  {
    icon: Bot,
    title: "AI-Powered Development",
    description:
      "We build AI-enabled workflows, automation tools, and intelligent software solutions tailored to your business.",
  },
  {
    icon: DollarSign,
    title: "Cost Effective",
    description:
      "Get premium software solutions without paying expensive agency pricing.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    description:
      "Serving startups and businesses across USA, UAE, India, and globally.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
  id="why-us"
  className="scroll-mt-24 pt-10 pb-24 bg-white"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Businesses Choose Rapidnest
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We help businesses launch faster, reduce development costs,
            and build scalable digital products that actually drive growth.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            Trusted by startups, founders, and growing businesses looking to
            build faster and scale smarter.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Free Quote
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}