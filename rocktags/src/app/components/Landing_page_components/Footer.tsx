'use client';

import Link from "next/link";
import { Cat } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#3d1f0f] to-[#2a1508] py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Cat className="w-9 h-9 text-yellow-400 drop-shadow-lg" />
            <span className="text-3xl font-bold text-white tracking-tight font-['Poppins']">Meowrick</span>
          </div>
          <p className="text-white text-base leading-relaxed font-['Roboto']">
            Tracking UTA's campus cats since 2025
          </p>
        </div>

        <div>
           <h4 className="font-semibold text-white text-lg mb-5 font-['Poppins'] tracking-wide">Quick Links</h4>
          <ul className="space-y-3 text-base font-['Inter']">
            <li>
              <Link href="/maps" className="text-white/85 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                Maps
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white/85 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/acm" className="text-white/85 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                ACM Chapter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-lg mb-5 font-['Poppins'] tracking-wide">Resources</h4>
          <ul className="space-y-3 text-base font-['Roboto']">
            <li>
              <Link href="/privacy" className="text-white hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white text-lg mb-5 font-['Inter'] tracking-wide">Stay Updated</h4>
          <p className="text-white/80 text-base mb-5 leading-relaxed font-['Inter']">
            Get notifications about new cat sightings
          </p>
          <div className="flex shadow-lg">
            <input 
              type="email" 
              placeholder="your@uta.edu" 
              className="flex-1 px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-l-lg text-base text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/20 transition-all font-['Inter']" 
            />
            <Button className="rounded-l-none bg-yellow-400 text-[#4E2A17] hover:bg-yellow-300 font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-200 font-['Inter']">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-10 bg-white/20" />

      <p className="text-center text-white/70 text-base font-['Inter']">
        © 2025 Meovrick. Made  for UTA's campus cats
      </p>
    </footer>
  );
}