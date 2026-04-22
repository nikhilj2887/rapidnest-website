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
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="scroll-mt-24 pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted By Brands Across Industries
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've helped businesses across ecommerce, travel, hospitality,
            and lifestyle industries build strong digital experiences.
          </p>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <a
              key={index}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-2xl p-6 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300 
              flex flex-col items-center text-center min-h-[240px]"
            >
              {/* Logo */}
              <div className="h-20 flex items-center justify-center mb-5 w-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={180}
                  height={80}
                  className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                    client.name === "Swadeshi"
                      ? "max-h-14"
                      : client.name === "The Lyft"
                      ? "max-h-12"
                      : client.name === "Mango Mist"
                      ? "max-h-16"
                      : client.name === "Lamara"
                      ? "max-h-12"
                      : "max-h-14"
                  }`}
                />
              </div>

              {/* Category */}
              <p className="text-gray-600 text-sm mb-6">
                {client.category}
              </p>

              {/* CTA */}
              <div className="mt-auto">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                  bg-orange-50 text-orange-600 font-semibold text-sm 
                  group-hover:bg-orange-600 group-hover:text-white 
                  transition-all duration-300"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}