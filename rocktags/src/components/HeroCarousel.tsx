'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";

const catSlides = [
  { src: "", alt: "Cat playing with toys" },
  { src: "", alt: "Cat sleeping in sunbath" },
  { src: "", alt: "Cat running on campus" },
];

export function HeroCarousel() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % catSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const goPrev = () => {
    if (animating) return;
    setAnimating(true);
    setSlide((s) => (s === 0 ? catSlides.length - 1 : s - 1));
    setTimeout(() => setAnimating(false), 600);
  };

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setSlide((s) => (s + 1) % catSlides.length);
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slides */}
      {catSlides.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === slide ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
          style={{ transform: `translateX(${(i - slide) * 100}%)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E2A17]/90 via-[#4E2A17]/50 to-transparent z-10" />
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/1920x1080/6D4C41/FFFFFF?text=${encodeURIComponent(img.alt)}`;
            }}
          />
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {catSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`transition-all ${i === slide ? "w-12 h-3 bg-yellow-400 rounded-full" : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/80"}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={goPrev} className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 group">
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button onClick={goNext} className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 group">
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-['Poppins'] mb-6 animate-fade-in">
          Track Campus Cats
          <span className="block text-yellow-400 mt-2">with Meovrick</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-white/90 font-['Roboto'] animate-fade-in-delay">
          Discover, follow, and connect with UTA’s beloved feline residents
        </p>

        <ButtonGroup className="mx-auto animate-fade-in-delay-2">
          <Button size="lg" onClick={() => router.push("/signin")}>
            <LogIn className="w-5 h-5 mr-2" /> Sign In
          </Button>
          <ButtonGroupSeparator orientation="vertical" className="hidden sm:block" />
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#4E2A17]" onClick={() => router.push("/signup")}>
            <UserPlus className="w-5 h-5 mr-2" /> Sign Up
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}