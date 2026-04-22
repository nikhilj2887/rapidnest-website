import { Target, Users, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "50+", label: "Happy Customers" },
  { icon: Award, value: "100+", label: "Projects Completed" },
  { icon: TrendingUp, value: "98%", label: "Success Rate" },
  { icon: Target, value: "5+", label: "Years Experience" },
];

export default function About() {
  return (
    <section
  id="about"
  className="scroll-mt-24 py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950 text-white"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Building Tomorrow's
              <span className="block mt-2 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Digital Solutions Today
              </span>
            </h2>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Rapidnest Software Solutions helps startups and businesses build
              scalable websites, mobile apps, and custom software products that
              accelerate growth.
            </p>

            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              From idea validation to full-scale product development, we focus
              on speed, innovation, and long-term partnerships that deliver real
              business value.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl hover:scale-105 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />

                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>

                    <div className="text-sm text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PROCESS CARD */}
          <div className="relative">

            {/* Subtle glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 blur-2xl rounded-3xl"></div>

            {/* Main card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
              <div className="space-y-8">

                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold">
                    1
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Discovery & Strategy
                    </h3>

                    <p className="text-gray-300">
                      We understand your business goals and define a clear roadmap.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                    2
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Design & Development
                    </h3>

                    <p className="text-gray-300">
                      We build scalable products with modern technology stacks.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                    3
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Launch & Support
                    </h3>

                    <p className="text-gray-300">
                      We deploy smoothly and provide continuous support for growth.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}