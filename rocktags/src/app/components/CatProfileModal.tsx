"use client";

import React from "react";
import type { Cat } from "./types";

interface Props {
  cat: Cat | null;
  onClose: () => void;
}

export default function CatProfileModal({ cat, onClose }: Props) {
  if (!cat) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="h-44 bg-gradient-to-r from-[var(--brand-brown)] to-[#E2C3A7] relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>{cat.name}</h2>
            <p className="text-sm text-white/90" style={{ fontFamily: "var(--font-body)" }}>{cat.personality} • {cat.age} yrs</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[var(--brand-brown)]/10 rounded-xl p-4 text-center">
              <div className="text-[var(--brand-brown)] text-lg font-semibold">{cat.sightings}</div>
              <div className="text-sm text-[var(--brand-brown)]/70">Sightings</div>
            </div>
            <div className="bg-[var(--brand-brown)]/10 rounded-xl p-4 text-center">
              <div className="text-[var(--brand-brown)] text-lg font-semibold">{cat.friendliness}/5</div>
              <div className="text-sm text-[var(--brand-brown)]/70">Friendliness</div>
            </div>
            <div className="bg-[var(--brand-brown)]/10 rounded-xl p-4 text-center">
              <div className="text-[var(--brand-brown)] text-lg font-semibold">{cat.color}</div>
              <div className="text-sm text-[var(--brand-brown)]/70">Color</div>
            </div>
            <div className="bg-[var(--brand-brown)]/10 rounded-xl p-4 text-center">
              <div className="text-[var(--brand-brown)] text-lg font-semibold">{cat.bestTime}</div>
              <div className="text-sm text-[var(--brand-brown)]/70">Best Time</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[var(--brand-brown)]">About {cat.name}</h3>
            <p className="text-[var(--brand-brown)]/80 leading-relaxed mt-2">{cat.bio}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[var(--brand-brown)]">Favorite Spot</h3>
            <div className="mt-2 bg-[var(--brand-brown)]/10 rounded-xl p-4">
              <div className="font-medium text-[var(--brand-brown)]">{cat.favSpot}</div>
              <div className="text-sm text-[var(--brand-brown)]/70">Usually {cat.activity}</div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
          aria-label="Close"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  );
}
