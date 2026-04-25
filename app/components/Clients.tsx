"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";

const clients = [
  {
    name: "Swadeshi",
    category: "Ecommerce / Retail",
    url: "https://swadeshi.co.za/",
    logo: "/clients/swadeshi.png",
    showWebsite: true,
  },
  {
    name: "The Lyft",
    category: "HR Staffing",
    url: "https://thelyft.in/",
    logo: "/clients/thelyft.png",
    showWebsite: true,
  },
  {
    name: "Mango Mist",
    category: "Hospitality / Resort",
    url: "https://www.mangomist.com/",
    logo: "/clients/mangomist.png",
    showWebsite: true,
  },
  {
    name: "Lamara",
    category: "Luxury Desserts / Bakery",
    url: "https://lamara.in/",
    logo: "/clients/lamara.png",
    showWebsite: true,
  },
  {
  name: "Clarion Talent Forge",
  category: "Accounting Training Institute / Staffing Firm",
  url: "https://www.clariontf.com/",
  logo: "/clients/clarion.png",
  showWebsite: true,
  largeLogo: true,
},
  {
    name: "Baseline Retention Solution",
    category: "Consulting Firm",
    logo: "/clients/Baseline_logo_Hexcode_ADBABC.png",
    showWebsite: false,
  },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="scroll-mt-24 pt-16 md:pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted By Brands Across Industries
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            We've helped businesses across ecommerce, travel, hospitality,
            and lifestyle industries build strong digital experiences.
          </p>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5 md:p-6
                min-h-[180px] md:min-h-[220px]
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
              {/* Logo */}
              <div className="flex items-center justify-center mb-3 w-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={70}
                  className={`
                  w-auto
                h-auto
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
                ${
                  client.largeLogo
                    ? "max-h-[70px] md:max-h-[90px]"
                    : "max-h-[50px] md:max-h-[65px]"
  }
`}
                />
              </div>

              {/* Category */}
              <p className="text-gray-600 text-sm md:text-base mb-3">
                {client.category}
              </p>

              {/* CTA - Conditional */}
              <div className="mt-auto">
                {client.showWebsite && (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-lg
                      bg-orange-50
                      text-orange-600
                      font-semibold
                      text-sm
                      hover:bg-orange-600
                      hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}