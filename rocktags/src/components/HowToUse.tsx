'use client';

import { LogIn, MapPin, Cat, LucideIcon } from "lucide-react";

interface Step {
  step: number;
  title: string;
  icon: LucideIcon;
  desc: string;
}

const STEPS: Step[] = [
  {
    step: 1,
    title: "Sign in with UTA email",
    icon: LogIn,
    desc: "Use your official UTA email to join the community.",
  },
  {
    step: 2,
    title: "Open Maps",
    icon: MapPin,
    desc: "Navigate to the interactive campus map.",
  },
  {
    step: 3,
    title: "See your favourite cat",
    icon: Cat,
    desc: "Find, follow, and view cat profiles.",
  },
];

interface StepCardProps {
  step: Step;
}

function StepCard({ step }: StepCardProps) {
  const Icon = step.icon;

  return (
    <div className="relative group">
      <article className="relative bg-white/10 backdrop-blur-sm border-2 border-yellow-400/60 rounded-2xl p-8 shadow-[0_0_20px_rgba(250,204,21,0.4)] h-full transition-all duration-300 group-hover:scale-105 group-hover:border-yellow-400 group-hover:shadow-[0_0_40px_rgba(250,204,21,0.6)]">
        {/* Step Number Badge */}
        <div 
          className="w-16 h-16 bg-yellow-400 text-[#4E2A17] rounded-full flex items-center justify-center text-2xl font-bold font-poppins mb-6"
          aria-label={`Step ${step.step}`}
        >
          {step.step}
        </div>

        {/* Title + Icon – SAME SIZE AS DESC */}
        <h3 className="text-lg font-bold font-roboto mb-3 flex items-center gap-2 text-[#4E2A17]">
          <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span>{step.title}</span>
        </h3>

        {/* Description – SAME SIZE, SAME STYLE */}
        <p className="text-lg font-bold font-roboto text-[#4E2A17] leading-relaxed">
          {step.desc}
        </p>
      </article>
    </div>
  );
}

export function HowToUse() {
  return (
    <section 
      className="py-20 px-4 bg-white/5"
      aria-labelledby="how-to-use-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 
            id="how-to-use-heading"
            className="text-4xl sm:text-5xl font-bold font-poppins mb-6 text-white"
          >
            How to Use Meovrick
          </h2>
          <div 
            className="w-24 h-1 bg-yellow-400 mx-auto"
            aria-hidden="true"
          />
        </header>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {STEPS.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <StepCard step={step} />
              
              {/* Arrow between steps */}
              {index < STEPS.length - 1 && (
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 80 80" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] mx-4 md:rotate-0 rotate-90"
                >
                  <path 
                    d="M10 40H70M70 40L50 20M70 40L50 60" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}