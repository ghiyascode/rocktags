"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import type { Cat, Building } from "../main/map/types";

const libraries = ["places"] as const;

interface MapComponentProps {
  campusCats: Cat[];
  allBuildings: Building[];
  onCatClick: (cat: Cat) => void;
  onBuildingClick: (building: Building) => void;
  onInfoWindowClose: () => void;
}

// === SVG Icons (outside component, safe) ===
const catSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="20" fill="#E2C3A7" stroke="#D4A88C" stroke-width="2"/>
  <path d="M18 18c-1 0-2 1-2 2s1 2 2 2m12 0c1 0 2-1 2-2s-1-2-2-2m-8 8c-2 2-6 2-8 0" stroke="#8B6F47" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M15 14l-3-3m18 0l3-3" stroke="#D4A88C" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <rect x="8" y="10" width="24" height="24" rx="2" fill="#E2C3A7" stroke="#D4A88C" stroke-width="2"/>
  <rect x="12" y="14" width="4" height="4" fill="#8B6F47"/>
  <rect x="24" y="14" width="4" height="4" fill="#8B6F47"/>
  <rect x="12" y="22" width="4" height="4" fill="#8B6F47"/>
  <rect x="24" y="22" width="4" height="4" fill="#8B6F47"/>
  <rect x="18" y="22" width="4" height="4" fill="#8B6F47"/>
</svg>`;

const MapComponent = ({
  campusCats,
  allBuildings,
  onCatClick,
  onBuildingClick,
  onInfoWindowClose,
}: MapComponentProps) => {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeBuildingId, setActiveBuildingId] = useState<string | null>(null);
  const [currentZoom, setCurrentZoom] = useState(16);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [catIcon, setCatIcon] = useState<google.maps.Icon | null>(null);
  const [buildingIcon, setBuildingIcon] = useState<google.maps.Icon | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // === Create icons & bounds only after Google Maps loads ===
  useEffect(() => {
    if (!isScriptLoaded || !window.google?.maps) return;

    const g = window.google.maps;

    // Create icons
    setCatIcon({
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(catSvg),
      scaledSize: new g.Size(48, 48),
      labelOrigin: new g.Point(24, -10),
    });

    setBuildingIcon({
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(buildingSvg),
      scaledSize: new g.Size(40, 40),
      labelOrigin: new g.Point(20, -10),
    });

    // Create bounds
    setBounds(
      new g.LatLngBounds(
        { lat: 32.725, lng: -97.118 },
        { lat: 32.738, lng: -97.105 }
      )
    );
  }, [isScriptLoaded]);

  const handleZoomChanged = useCallback(() => {
    if (!mapRef.current) return;
    const zoom = mapRef.current.getZoom();
    if (zoom) setCurrentZoom(Math.round(zoom));
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const visibleBuildings = useMemo(() => {
    if (currentZoom < 16) return allBuildings.filter((b) => b.priority === 1);
    if (currentZoom < 17) return allBuildings.filter((b) => b.priority <= 2);
    return allBuildings;
  }, [allBuildings, currentZoom]);

  const center = { lat: 32.7318, lng: -97.1115 };

  const mapOptions: google.maps.MapOptions = {
    styles: [
      { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
      { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#E2C3A7" }] },
      { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F5E6D3" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#A7D2E2" }] },
    ],
    restriction: bounds ? { latLngBounds: bounds, strictBounds: false } : undefined,
    minZoom: 15,
    maxZoom: 18,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    gestureHandling: "greedy",
    clickableIcons: false,
  };

  const closeInfoWindows = useCallback(() => {
    setActiveCatId(null);
    setActiveBuildingId(null);
    onInfoWindowClose();
  }, [onInfoWindowClose]);

  // === Show loading until everything is ready ===
  if (!isScriptLoaded || !catIcon || !buildingIcon || !bounds) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-600 font-medium">Loading campus map...</div>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
      onLoad={() => setIsScriptLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={16}
        options={mapOptions}
        onLoad={onLoad}
        onZoomChanged={handleZoomChanged}
        onClick={closeInfoWindows}
      >
        {/* === Buildings === */}
        {visibleBuildings.map((building) => {
          const isActive = activeBuildingId === building.id;
          return (
            <Marker
              key={building.id}
              position={{ lat: building.lat, lng: building.lng }}
              icon={buildingIcon}
              title={building.name}
              label={
                currentZoom >= 17
                  ? {
                      text: building.abbr,
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }
                  : undefined
              }
              onClick={() => {
                setActiveBuildingId(building.id);
                setActiveCatId(null);
                onBuildingClick(building);
              }}
            >
              {isActive && (
                <InfoWindow
                  position={{ lat: building.lat + 0.00045, lng: building.lng }}
                  onCloseClick={closeInfoWindows}
                >
                  <div className="p-3 max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <i className="fas fa-building text-[#E2C3A7] text-lg"></i>
                      <div className="font-bold text-[#E2C3A7] text-base">
                        {building.name}
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-gray-400"></i>
                      <span>{building.abbr} • UTA Campus</span>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}

        {/* === Cats === */}
        {campusCats.map((cat) => {
          const isActive = activeCatId === cat.id;
          return (
            <Marker
              key={cat.id}
              position={{ lat: cat.lat, lng: cat.lng }}
              icon={catIcon}
              animation={
                isActive && window.google?.maps?.Animation
                  ? window.google.maps.Animation.BOUNCE
                  : undefined
              }
              label={{
                text: cat.name,
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "bold",
              }}
              onClick={() => {
                setActiveCatId(cat.id);
                setActiveBuildingId(null);
                onCatClick(cat);
              }}
            >
              {isActive && (
                <InfoWindow
                  position={{ lat: cat.lat + 0.00045, lng: cat.lng }}
                  onCloseClick={closeInfoWindows}
                >
                  <div className="p-3 max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <i className="fas fa-cat text-[#E2C3A7] text-lg"></i>
                      <div className="font-bold text-[#E2C3A7] text-base">
                        {cat.name}
                      </div>
                    </div>
                    <div className="text-gray-700 text-sm mb-1">{cat.color}</div>
                    <div className="text-gray-600 text-xs italic">
                      {cat.activity}
                    </div>
                    <div className="mt-2 text-xs text-[#E2C3A7] font-semibold cursor-pointer hover:underline">
                      Click for full profile
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;