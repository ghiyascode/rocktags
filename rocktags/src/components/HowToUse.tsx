'use client';

import { LogIn, MapPin, Cat } from "lucide-react";

export function HowToUse() {
  const steps = [
    { step: 1, title: "Sign in with UTA email", icon: <LogIn className="w-6 h-6" />, desc: "Use your official UTA email to join the community." },
    { step: 2, title: "Open Maps", icon: <MapPin className="w-6 h-6" />, desc: "Navigate to the interactive campus map." },
    { step: 3, title: "See your favourite cat", icon: <Cat className="w-6 h-6" />, desc: "Find, follow, and view cat profiles." },
  ];

  return (
    <section className="py-20 px-4 bg-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold font-['Poppins'] mb-6">How to Use Meovrick</h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-12" />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="w-16 h-16 bg-yellow-400 text-[#4E2A17] rounded-full flex items-center justify-center text-2xl font-bold font-['Poppins'] mb-6">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold font-['Poppins'] mb-4 flex items-center text-yellow-400">
                  {s.icon} <span className="ml-2 text-white">{s.title}</span>
                </h3>
                <p className="text-white/80 font-['Roboto']">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}