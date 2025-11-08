"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import type { Cat, Building } from "../../components/types";


import CatProfileModal from "@/app/components/CatProfileModal";
import { Footer } from "@/app/components/components_landing_page/Footer";
import { Navbar } from "@/app/components/components_landing_page/Navbar";


// Sample data
const campusCats: Cat[] = [
  {
    id: 1,
    name: "Microwave",
    lat: 32.7315,
    lng: -97.11,
    color: "Orange Tabby",
    personality: "Friendly",
    activity: "Lounging",
    age: 3,
    friendliness: 5,
    favSpot: "UC",
    bio: "Famous campus cat",
    sightings: 156,
    bestTime: "Noon",
  },
  {
    id: 2,
    name: "Professor Whiskers",
    lat: 32.7312,
    lng: -97.1147,
    color: "Gray",
    personality: "Wise",
    activity: "Sitting on steps",
    age: 7,
    friendliness: 3,
    favSpot: "Library",
    bio: "Thoughtful cat",
    sightings: 89,
    bestTime: "Morning",
  },
];

const campusBuildings: Building[] = [
  { name: "E.H. Hereford University Center", abbr: "UC", lat: 32.7315, lng: -97.11, priority: 1 },
  { name: "Central Library", abbr: "LIBR", lat: 32.7312, lng: -97.1147, priority: 1 },
  { name: "Maverick Stadium", abbr: "STAD", lat: 32.7351, lng: -97.1202, priority: 1 },
];

// Dynamic import with SSR disabled and proper loading state
// const DynamicMap = dynamic(
//   async () => {
//     const { default: MapComponent } = await import('@/app/components/MapComponent');
//     return MapComponent;
//   },
//   {
//     ssr: false,
//     loading: () => (
//       <div className="h-[72vh] rounded-xl overflow-hidden border-2 border-[#E2C3A7]/20 bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E2C3A7]"></div>
//       </div>
//     ),
//   }
// );
const DynamicMap = dynamic(
  () => import('@/app/components/MapComponent').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => {
  return (
    <div className="h-[72vh] rounded-xl overflow-hidden border-2 border-[#E2C3A7]/20 bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E2C3A7]"></div>
    </div>
  );
}
  }
);

export default function MapPage() {
  const [profileCat, setProfileCat] = useState<Cat | null>(null);

  // Inject Font Awesome only once on mount
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleCatClick = (cat: Cat) => {
    setProfileCat(cat);
  };

  const handleProfileClose = () => {
    setProfileCat(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF4] flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="h-[72vh] rounded-xl overflow-hidden border-2 border-[#E2C3A7]/20">
           <DynamicMap
  campusCats={campusCats}
  allBuildings={campusBuildings}
  onCatClick={handleCatClick}
  onBuildingClick={() => {}}
  onInfoWindowClose={() => {}}
/>
          </div>
        </div>
      </main>

      <Footer />

      {/* Cat Profile Modal */}
      {profileCat && (
        <CatProfileModal cat={profileCat} onClose={handleProfileClose} />
      )}
    </div>
  );
}