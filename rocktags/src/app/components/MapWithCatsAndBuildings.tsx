"use client";

import { useEffect, useRef, useState } from "react";
import type { Cat, Building } from "@/types";
import CatProfileModal from "./CatProfileModal";

interface Props {
  cats: Cat[];
  buildings: Building[];
  onCatClick?: (cat: Cat) => void;
}

/* ---------- UTA BOUNDS (strict) ---------- */
const UTA_BOUNDS = {
  north: 32.738,
  south: 32.725,
  east: -97.105,
  west: -97.118,
};

/* ---------- MAP STYLES (theme) ---------- */
const MAP_STYLES = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#E2C3A7" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F5E6D3" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#A7D2E2" }] },
];


/* ---------- TINY ROUND CAT SVG (50×58) ---------- */
const catSvg = (name: string) => encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 58" width="50" height="58">
  <defs>
    <filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#E2C3A7" flood-opacity="0.6"/></filter>
    <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E2C3A7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#D4A88C;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background circle -->
  <circle cx="25" cy="29" r="24" fill="url(#catGrad)" stroke="#4E2A17" stroke-width="1.8" filter="url(#glow)"/>

  <!-- Ears -->
  <path d="M13 13 L10 6 L16 11 Z" fill="#E2C3A7" stroke="#4E2A17" stroke-width="1.2"/>
  <path d="M37 13 L40 6 L34 11 Z" fill="#E2C3A7" stroke="#4E2A17" stroke-width="1.2"/>

  <!-- Face -->
  <circle cx="25" cy="29" r="17" fill="#E2C3A7" stroke="#4E2A17" stroke-width="1.3"/>

  <!-- Eyes -->
  <circle cx="19" cy="27" r="3.5" fill="white"/>
  <circle cx="31" cy="27" r="3.5" fill="white"/>
  <circle cx="19" cy="27" r="1.8" fill="#4E2A17"/>
  <circle cx="31" cy="27" r="1.8" fill="#4E2A17"/>

  <!-- Nose -->
  <path d="M25 32 Q23 34 21 35 Q25 34 29 35" fill="#D4A88C" stroke="#4E2A17" stroke-width="0.7"/>

  <!-- Mouth -->
  <path d="M21 36 Q25 38 29 36" fill="none" stroke="#4E2A17" stroke-width="1" stroke-linecap="round"/>

  <!-- Whiskers -->
  <path d="M12 29 L6 28 M12 31 L6 31 M12 33 L6 34" stroke="#4E2A17" stroke-width="1" stroke-linecap="round"/>
  <path d="M38 29 L44 28 M38 31 L44 31 M38 33 L44 34" stroke="#4E2A17" stroke-width="1" stroke-linecap="round"/>

  <!-- Tail -->
  <path d="M37 42 Q42 46 40 52" fill="none" stroke="#E2C3A7" stroke-width="3.5" stroke-linecap="round"/>

  <!-- Name (small but readable) -->
  <text x="25" y="56" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle" fill="#4E2A17" font-weight="bold">${name}</text>
</svg>
`);
/* ---------- BUILDING SVG (unchanged) ---------- */
const buildingSvg = (abbr: string) => encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
  <defs>
    <linearGradient id="buildGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E2C3A7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#D4A88C;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="8" y="10" width="24" height="30" rx="2" fill="url(#buildGrad)" stroke="#4E2A17" stroke-width="2"/>
  <rect x="12" y="15" width="4" height="4" fill="#F5E6D3" stroke="#4E2A17" stroke-width="0.5"/>
  <rect x="24" y="15" width="4" height="4" fill="#F5E6D3" stroke="#4E2A17" stroke-width="0.5"/>
  <rect x="12" y="23" width="4" height="4" fill="#F5E6D3" stroke="#4E2A17" stroke-width="0.5"/>
  <rect x="24" y="23" width="4" height="4" fill="#F5E6D3" stroke="#4E2A17" stroke-width="0.5"/>
  <rect x="18" y="31" width="4" height="4" fill="#F5E6D3" stroke="#4E2A17" stroke-width="0.5"/>
  <path d="M10 10 L20 5 L30 10 Z" fill="#D4A88C" stroke="#4E2A17" stroke-width="1"/>
  <rect x="17" y="38" width="6" height="8" fill="#8B6F47" rx="1"/>
  <text x="20" y="45" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle" fill="#4E2A17" font-weight="bold">${abbr}</text>
</svg>
`);

export default function MapWithEverything({ cats, buildings, onCatClick }: Props) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [zoom, setZoom] = useState(16);
  const markers = useRef<google.maps.Marker[]>([]);

  /* ---------- LOAD GOOGLE MAPS ---------- */
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      console.error("Missing Google Maps API key");
      return;
    }

    if (window.google?.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const initMap = () => {
    if (!mapDiv.current) return;

    const gMap = new window.google.maps.Map(mapDiv.current, {
      center: { lat: 32.7318, lng: -97.1115 },
      zoom: 16,
      styles: MAP_STYLES,
      restriction: { latLngBounds: UTA_BOUNDS, strictBounds: true },
      minZoom: 15,
      maxZoom: 18,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: "greedy",
    });

    gMap.addListener("zoom_changed", () => setZoom(gMap.getZoom() ?? 16));
    setMap(gMap);
  };

  /* ---------- MARKERS: SPREAD OUT + OVAL CATS ---------- */
  useEffect(() => {
    if (!map || cats.length === 0 || buildings.length === 0) return;

    markers.current.forEach(m => m.setMap(null));
    markers.current = [];

    const items = [
      ...cats.map(cat => ({ type: 'cat' as const, data: cat, key: `cat-${cat.id}` })),
      ...buildings.map(b => ({ type: 'building' as const, data: b, key: `bld-${b.abbr}` }))
    ];

    const groups = new Map<string, typeof items>();
    items.forEach(item => {
      const key = `${item.data.lat.toFixed(6)},${item.data.lng.toFixed(6)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    });

    // SPREAD: 25m apart, 60° steps → max 6 pins, very sparse
    const radiusMeters = 25;
    const earthRadius = 6371000;

    groups.forEach((group, posKey) => {
      const [latStr, lngStr] = posKey.split(',');
      const baseLat = parseFloat(latStr);
      const baseLng = parseFloat(lngStr);

      group.forEach((item, i) => {
        const angle = (i * 60) * (Math.PI / 180); // 60° steps
        const distance = radiusMeters * (i + 1);

        const dLat = (distance * Math.cos(angle)) / earthRadius;
        const dLng = (distance * Math.sin(angle)) / (earthRadius * Math.cos(baseLat * Math.PI / 180));

        const newLat = baseLat + (dLat * 180 / Math.PI);
        const newLng = baseLng + (dLng * 180 / Math.PI);

        const position = { lat: newLat, lng: newLng };

        // CAT: OVAL SVG
        if (item.type === 'cat') {
          const cat = item.data as Cat;
          const marker = new window.google.maps.Marker({
            position,
            map,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${catSvg(cat.name)}`,
              scaledSize: new google.maps.Size(50, 58),
              anchor: new google.maps.Point(25, 58),
            },
            title: `${cat.name} – ${cat.activity}`,
          });

          const info = new window.google.maps.InfoWindow({
            content: `<div style="padding:14px; font-family:system-ui; min-width:170px; background:#fff; border-radius:10px; box-shadow:0 3px 12px rgba(0,0,0,0.15);">
              <strong style="color:#4E2A17; font-size:15px;">${cat.name}</strong><br>
              <em style="color:#8B6F47; font-size:13px;">${cat.color}</em><br>
              <span style="color:#6B4E31; font-size:12px;">${cat.activity} • ${cat.favSpot}</span>
            </div>`,
            pixelOffset: new google.maps.Size(0, -50),
          });

          marker.addListener("mouseover", () => info.open(map, marker));
          marker.addListener("mouseout", () => info.close());
          marker.addListener("click", () => {
            setSelectedCat(cat);
            onCatClick?.(cat);
          });

          markers.current.push(marker);
        }

        // BUILDING
        else if (item.type === 'building') {
          const b = item.data as Building;
          const visible = zoom < 16 ? b.priority === 1 : true;
          if (!visible) return;

          const marker = new window.google.maps.Marker({
            position,
            map,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${buildingSvg(b.abbr)}`,
              scaledSize: new google.maps.Size(40, 50),
              anchor: new google.maps.Point(20, 50),
            },
            title: b.name,
          });
          markers.current.push(marker);
        }
      });
    });
  }, [map, cats, buildings, zoom, onCatClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapDiv} className="w-full h-full rounded-xl" />

      {/* LEGEND */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-lg p-3 text-xs font-medium text-gray-700">
        <div className="flex items-center gap-2 mb-1">Oval Cat Pin Campus Cats</div>
        <div className="flex items-center gap-2">Building Pin Buildings</div>
      </div>

      {/* MODAL */}
      {selectedCat && <CatProfileModal cat={selectedCat} onClose={() => setSelectedCat(null)} />}
    </div>
  );
}