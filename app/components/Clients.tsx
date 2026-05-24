"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

const clients = [
  {
    name: "Swadeshi",
    category: "Ecommerce / Retail",
    url: "https://swadeshi.co.za/",
    logo: "/clients/swadeshi.png",
  },
  {
    name: "The Lyft",
    category: "HR Staffing",
    url: "https://thelyft.in/",
    logo: "/clients/thelyft.png",
  },
  {
    name: "Mango Mist",
    category: "Hospitality / Resort",
    url: "https://www.mangomist.com/",
    logo: "/clients/mangomist.png",
  },
  {
    name: "Lamara",
    category: "Luxury Desserts / Bakery",
    url: "https://lamara.in/",
    logo: "/clients/lamara.png",
  },
  {
    name: "Clarion Talent Forge",
    category: "Accounting Training Institute / Staffing Firm",
    url: "https://www.clariontf.com/",
    logo: "/clients/Clarion.png",
  },
  {
    name: "Baseline Retention Solution",
    category: "Consulting Firm",
    url: "#",
    logo: "/clients/Baseline_logo_Hexcode_ADBABC.png",
  },
];

const partners = [
  {
    name: "WICCI",
    url: "https://wicci.au/",
    logo: "/partners/wicci.png",
  },
  {
    name: "G100",
    url: "https://g100.in/",
    logo: "/partners/g100.png",
  },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="scroll-mt-24 pt-16 md:pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION 1 */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted By Brands Across Industries
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            We've helped businesses across ecommerce, travel, hospitality,
            and lifestyle industries build strong digital experiences.
          </p>
        </div>

        {/* CLIENT MARQUEE */}
        <div className="relative overflow-hidden py-10">
          <div className="flex animate-marquee gap-8 w-max">

            {[...clients, ...clients].map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  min-w-[240px]
                  h-[180px]
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  flex
                  flex-col
                  items-center
                  justify-center
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  duration-300
                  px-6
                "
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={70}
                  className="object-contain w-auto h-auto max-h-[60px]"
                />

                <p className="text-sm text-gray-600 mt-4 text-center">
                  {client.category}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 text-orange-600 text-sm font-semibold">
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}

          </div>
        </div>

        {/* SECTION 2 */}
        <div className="text-center mt-16 mb-10">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Official Digital Partnerships
          </h3>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Rapidnest Software Solutions proudly partners with global
            organizations, NGOs, and business councils to support
            digital transformation initiatives.
          </p>
        </div>

        {/* PARTNERS */}
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
                w-full
                sm:w-[280px]
                min-h-[220px]
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                flex
                flex-col
                items-center
                text-center
              "
            >
              <div className="flex items-center justify-center mb-4 w-full h-[90px]">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={70}
                  className="
                    w-auto
                    h-auto
                    max-h-[70px]
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-4">
                Official Digital Partner
              </span>

              <h4 className="text-lg font-bold text-gray-900 mb-4">
                {partner.name}
              </h4>

              <div className="mt-auto inline-flex items-center gap-2 text-orange-600 text-sm font-semibold">
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}