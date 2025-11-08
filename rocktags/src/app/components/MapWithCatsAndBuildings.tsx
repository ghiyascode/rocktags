// src/app/components/MapWithCatsAndBuildings.tsx
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
} as const;

/* ---------- MAP STYLES (theme) ---------- */
const MAP_STYLES = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#E2C3A7" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F5E6D3" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#A7D2E2" }] },
] as google.maps.MapTypeStyle[];

/* ---------- SVG ICONS ---------- */
const catSvg = (name: string) => encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 58" width="50" height="58">
  <defs>
    <filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#E2C3A7" flood-opacity="0.6"/></filter>
    <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E2C3A7;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#D4A88C;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <path d="M13 13 L10 6 L16 11 Z M37 13 L40 6 L34 11 Z" fill="#E2C3A7" stroke="#4E2A17" stroke-width="1.2"/>
  <circle cx="25" cy="29" r="17" fill="#E2C3A7" stroke="#4E2A17" stroke-width="1.3"/>
  <circle cx="19" cy="27" r="3.5" fill="white"/><circle cx="31" cy="27" r="3.5" fill="white"/>
  <circle cx="19" cy="27" r="1.8" fill="#4E2A17"/><circle cx="31" cy="27" r="1.8" fill="#4E2A17"/>
  <path d="M25 32 Q23 34 21 35 Q25 34 29 35" fill="#D4A88C" stroke="#4E2A17" stroke-width="0.7"/>
  <path d="M21 36 Q25 38 29 36" fill="none" stroke="#4E2A17" stroke-width="1" stroke-linecap="round"/>
  <path d="M12 29 L6 28 M12 31 L6 31 M12 33 L6 34 M38 29 L44 28 M38 31 L44 31 M38 33 L44 34" stroke="#4E2A17" stroke-width="1" stroke-linecap="round"/>
  <path d="M37 42 Q42 46 40 52" fill="none" stroke="#E2C3A7" stroke-width="3.5" stroke-linecap="round"/>
  <text x="25" y="56" font-family="system-ui" font-size="8.5" text-anchor="middle" fill="#4E2A17" font-weight="bold">${name}</text>
</svg>
`);

const buildingSvg = (abbr: string) => encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
  <defs>
    <linearGradient id="buildGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E2C3A7;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#D4A88C;stop-opacity:1"/>
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
  <text x="20" y="45" font-family="system-ui" font-size="9" text-anchor="middle" fill="#4E2A17" font-weight="bold">${abbr}</text>
</svg>
`);

/* ---------- LEGEND ICONS (REUSABLE) ---------- */
const CatLegendIcon = () => (
  <div
    className="w-6 h-6"
    dangerouslySetInnerHTML={{
      __html: decodeURIComponent(catSvg(""))
        .replace(/width="50".*?height="58"/, 'width="24" height="28"')
        .replace(/<text.*?<\/text>/, ''),
    }}
  />
);

const BuildingLegendIcon = () => (
  <div
    className="w-5 h-6"
    dangerouslySetInnerHTML={{
      __html: decodeURIComponent(buildingSvg("B"))
        .replace(/width="40".*?height="50"/, 'width="20" height="25"')
        .replace(/<text.*?<\/text>/, ''),
    }}
  />
);

export default function MapWithEverything({ cats, buildings, onCatClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [zoom, setZoom] = useState(16);
  const markersRef = useRef<google.maps.Marker[]>([]);

  /* ---------- INIT MAP (waits for script from layout.tsx) ---------- */
  useEffect(() => {
    if (!window.google?.maps || !mapRef.current) return;

    const gMap = new window.google.maps.Map(mapRef.current, {
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
  }, []);

  /* ---------- MARKERS ---------- */
  useEffect(() => {
    if (!map) return;
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

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

    const radiusMeters = 25;
    const earthRadius = 6371000;

    groups.forEach((group, posKey) => {
      const [latStr, lngStr] = posKey.split(',');
      const baseLat = parseFloat(latStr);
      const baseLng = parseFloat(lngStr);

      group.forEach((item, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const distance = radiusMeters * (i + 1);
        const dLat = (distance * Math.cos(angle)) / earthRadius;
        const dLng = (distance * Math.sin(angle)) / (earthRadius * Math.cos(baseLat * Math.PI / 180));
        const newLat = baseLat + (dLat * 180 / Math.PI);
        const newLng = baseLng + (dLng * 180 / Math.PI);
        const position = { lat: newLat, lng: newLng };

        if (item.type === 'cat') {
          const cat = item.data as Cat;
          const marker = new google.maps.Marker({
            position,
            map,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${catSvg(cat.name)}`,
              scaledSize: new google.maps.Size(50, 58),
              anchor: new google.maps.Point(25, 58),
            },
            title: `${cat.name} – ${cat.activity}`,
          });

          const info = new google.maps.InfoWindow({
            content: `
              <div style="padding:10px 12px; font-family:system-ui; background:#fff; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.15); min-width:150px; font-size:13px; line-height:1.4;">
                <strong style="color:#4E2A17; font-size:14px;">${cat.name}</strong>
                <em style="color:#8B6F47; font-size:12px; display:block;">${cat.color}</em>
                <span style="color:#6B4E31; font-size:11px;">${cat.activity} • ${cat.favSpot}</span>
              </div>
            `,
            pixelOffset: new google.maps.Size(0, -64),
            disableAutoPan: true,
          });

          marker.addListener("mouseover", () => info.open(map, marker));
          marker.addListener("mouseout", () => info.close());
          marker.addListener("click", () => {
            setSelectedCat(cat);
            onCatClick?.(cat);
          });

          markersRef.current.push(marker);
        } else {
          const b = item.data as Building;
          if (zoom < 16 && b.priority !== 1) return;

          const marker = new google.maps.Marker({
            position,
            map,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${buildingSvg(b.abbr)}`,
              scaledSize: new google.maps.Size(40, 50),
              anchor: new google.maps.Point(20, 50),
            },
            title: b.name,
          });
          markersRef.current.push(marker);
        }
      });
    });
  }, [map, cats, buildings, zoom, onCatClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-xl" />

      {/* LEGEND */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-lg p-3 text-xs font-medium text-gray-700 space-y-1">
        <div className="flex items-center gap-2">
          <CatLegendIcon />
          <span>Campus Cats</span>
        </div>
        <div className="flex items-center gap-2">
          <BuildingLegendIcon />
          <span>Buildings</span>
        </div>
      </div>

      {/* MODAL */}
      {selectedCat && (
        <CatProfileModal cat={selectedCat} onClose={() => setSelectedCat(null)} />
      )}
    </div>
  );
}