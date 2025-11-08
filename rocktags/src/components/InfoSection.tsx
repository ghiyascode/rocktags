'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { MapPin, Cat } from "lucide-react";

export function InfoSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold font-['Poppins'] mb-6">Why Track Campus Cats?</h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-12" />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <FontAwesomeIcon icon={faPaw} className="w-10 h-10 text-yellow-400" />, title: "Community Building", desc: "Connect with fellow cat lovers and share sightings." },
            { icon: <MapPin className="w-10 h-10 text-yellow-400" />, title: "Real-Time Tracking", desc: "See where cats are spotted on the interactive map." },
            { icon: <Cat className="w-10 h-10 text-yellow-400" />, title: "Cat Profiles", desc: "Learn personality, favorite spots & sighting history." },
          ].map((c, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/20">
              <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                {c.icon}
              </div>
              <h3 className="text-2xl font-bold font-['Poppins'] mb-4">{c.title}</h3>
              <p className="text-white/80 font-['Roboto']">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}