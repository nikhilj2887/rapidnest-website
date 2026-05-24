"use client";

import {
  Globe,
  Smartphone,
  Code2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const whatsappNumber = "916300675410";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    subtitle: "High-converting websites built for growth",
    features: [
      "Business websites",
      "SaaS platforms",
      "Ecommerce stores",
      "SEO-ready architecture",
    ],
    gradient: "from-orange-500 to-amber-500",
    cta: "Get Website Quote",
    whatsappMessage:
      "Hi Rapidnest, I need a quote for a website project.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    subtitle: "Launch iOS & Android apps faster",
    features: [
      "Startup MVP apps",
      "Customer apps",
      "Internal apps",
      "Scalable backend systems",
    ],
    gradient: "from-cyan-500 to-blue-500",
    cta: "Build My App",
    whatsappMessage:
      "Hi Rapidnest, I want to build a mobile app.",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    subtitle: "Software built around your business operations",
    features: [
      "CRM systems",
      "ERP tools",
      "Workflow automation",
      "AI integrations",
      "Internal business software",
    ],
    gradient: "from-orange-600 to-red-500",
    cta: "Book Free Consultation",
    whatsappMessage:
      "Hi Rapidnest, I need custom software development consultation.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Software Solutions That Help You Scale Faster
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We build websites, mobile apps, and custom software solutions that
            help startups and businesses grow faster while reducing development
            delays and unnecessary costs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden p-8 bg-white rounded-2xl border border-gray-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Background hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />

                {/* Content wrapper */}
                <div className="relative z-10">
                  
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-gray-600 font-medium mb-5">
                    {service.subtitle}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      service.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-50 text-orange-600 font-semibold hover:bg-orange-100 hover:gap-3 transition-all duration-300 cursor-pointer"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hi Rapidnest, I want to discuss my project."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}