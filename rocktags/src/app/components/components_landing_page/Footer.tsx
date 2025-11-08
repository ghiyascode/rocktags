'use client';

import Link from "next/link";
import { Cat } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#3d1f0f] py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Cat className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold font-['Poppins']">Meovrick</span>
          </div>
          <p className="text-white/70 text-sm font-['Roboto']">Tracking UTA’s campus cats since 2025</p>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400 mb-4 font-['Poppins']">Quick Links</h4>
          <ul className="space-y-2 text-sm font-['Roboto']">
            <li><Link href="/maps" className="text-white/70 hover:text-yellow-400">Maps</Link></li>
            <li><Link href="/about" className="text-white/70 hover:text-yellow-400">About Us</Link></li>
            <li><Link href="/acm" className="text-white/70 hover:text-yellow-400">ACM Chapter</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400 mb-4 font-['Poppins']">Resources</h4>
          <ul className="space-y-2 text-sm font-['Roboto']">
            <li><Link href="/privacy" className="text-white/70 hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-white/70 hover:text-yellow-400">Terms of Service</Link></li>
            <li><Link href="/contact" className="text-white/70 hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400 mb-4 font-['Poppins']">Stay Updated</h4>
          <p className="text-white/70 text-sm mb-4 font-['Roboto']">Get notifications about new cat sightings</p>
          <div className="flex">
            <input type="email" placeholder="your@uta.edu" className="flex-1 px-4 py-2 bg-white/10 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <Button className="rounded-l-none bg-yellow-400 text-[#4E2A17] hover:bg-yellow-300">Subscribe</Button>
          </div>
        </div>
      </div>

      <Separator className="my-8 bg-white/10" />

      <p className="text-center text-white/60 text-sm font-['Roboto']">
        © 2025 Meovrick. Made for UTA’s campus cats
      </p>
    </footer>
  );
}