'use client';

import Link from "next/link";
import { Cat, Sparkles } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  return (
    <nav className="py-5 fixed inset-x-0 top-0 z-50 bg-gradient-to-br from-[#3d1f0f] to-[#2a1508]  backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* LOGO – CLICKABLE → HOME PAGE */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Cat className="w-8 h-8 text-white animate-pulse group-hover:text-yellow-300 transition-colors" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
          </div>
          <span className="text-4xl font-bold font-['Poppins'] tracking-tight text-white group-hover:text-yellow-300 transition-colors">
            Meowvrick
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          
          <Link href="/about" className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105">
            <FontAwesomeIcon icon={faInfoCircle} className="w-5 h-5" />
            <span className="font-medium">About</span>
          </Link>
          <Link href="/acm" className="flex items-center space-x-2 hover:text-yellow-400 transition-all duration-300 hover:scale-105">
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
            <span className="font-medium">ACM</span>
          </Link>
         
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-md hover:bg-white/10">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>
    </nav>
  );
}