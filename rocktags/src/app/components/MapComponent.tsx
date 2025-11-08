import { useState, useEffect, useRef } from "react";

// Sample data - replace with your actual data
const SAMPLE_CATS = [
  { id: "cat1", name: "Whiskers", lat: 32.7318, lng: -97.1115, color: "Orange tabby", activity: "Napping under a tree" },
  { id: "cat2", name: "Shadow", lat: 32.7328, lng: -97.1125, color: "Black", activity: "Hunting near the library" },
  { id: "cat3", name: "Mittens", lat: 32.7308, lng: -97.1105, color: "White with gray spots", activity: "Playing with students" },
];

const SAMPLE_BUILDINGS = [
  { id: "bld1", name: "Central Library", abbr: "LIB", lat: 32.7320, lng: -97.1120, priority: 1 },
  { id: "bld2", name: "Engineering Building", abbr: "ERB", lat: 32.7315, lng: -97.1110, priority: 1 },
  { id: "bld3", name: "Science Hall", abbr: "SH", lat: 32.7310, lng: -97.1118, priority: 2 },
  { id: "bld4", name: "Student Center", abbr: "UC", lat: 32.7325, lng: -97.1115, priority: 1 },
];

// Read API key from Next.js environment variable
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(16);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Check if API key is available
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file");
      return;
    }

    // Load Google Maps script
    if (window.google) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Google Maps API. Check your API key and network connection.");
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 32.7318, lng: -97.1115 },
      zoom: 16,
      styles: [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#E2C3A7" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F5E6D3" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#A7D2E2" }] },
      ],
      restriction: {
        latLngBounds: {
          north: 32.738,
          south: 32.725,
          east: -97.105,
          west: -97.118,
        },
        strictBounds: false,
      },
      minZoom: 15,
      maxZoom: 18,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: "greedy",
      clickableIcons: false,
    });

    googleMap.addListener("zoom_changed", () => {
      setCurrentZoom(googleMap.getZoom());
    });

    googleMap.addListener("click", () => {
      setSelectedCat(null);
      setSelectedBuilding(null);
    });

    setMap(googleMap);
  }, [isLoaded, map]);

  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    const catSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <circle cx="24" cy="24" r="20" fill="#E2C3A7" stroke="#D4A88C" stroke-width="2"/>
      <circle cx="18" cy="20" r="3" fill="#8B6F47"/>
      <circle cx="30" cy="20" r="3" fill="#8B6F47"/>
      <path d="M18 28 Q24 32 30 28" stroke="#8B6F47" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M15 14l-3-3m21 0l3-3" stroke="#D4A88C" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

    const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect x="8" y="10" width="24" height="24" rx="2" fill="#E2C3A7" stroke="#D4A88C" stroke-width="2"/>
      <rect x="12" y="14" width="4" height="4" fill="#8B6F47"/>
      <rect x="24" y="14" width="4" height="4" fill="#8B6F47"/>
      <rect x="12" y="22" width="4" height="4" fill="#8B6F47"/>
      <rect x="24" y="22" width="4" height="4" fill="#8B6F47"/>
      <rect x="18" y="22" width="4" height="4" fill="#8B6F47"/>
    </svg>`;

    // Add cat markers
    SAMPLE_CATS.forEach(cat => {
      const marker = new window.google.maps.Marker({
        position: { lat: cat.lat, lng: cat.lng },
        map: map,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(catSvg),
          scaledSize: new window.google.maps.Size(48, 48),
        },
        title: cat.name,
        animation: selectedCat?.id === cat.id ? window.google.maps.Animation.BOUNCE : null,
      });

      marker.addListener("click", () => {
        setSelectedCat(cat);
        setSelectedBuilding(null);
      });

      markersRef.current.push(marker);
    });

    // Add building markers (filter by zoom level)
    const visibleBuildings = currentZoom < 16 
      ? SAMPLE_BUILDINGS.filter(b => b.priority === 1)
      : currentZoom < 17
      ? SAMPLE_BUILDINGS.filter(b => b.priority <= 2)
      : SAMPLE_BUILDINGS;

    visibleBuildings.forEach(building => {
      const marker = new window.google.maps.Marker({
        position: { lat: building.lat, lng: building.lng },
        map: map,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(buildingSvg),
          scaledSize: new window.google.maps.Size(40, 40),
        },
        title: building.name,
        label: currentZoom >= 17 ? {
          text: building.abbr,
          color: "#ffffff",
          fontSize: "10px",
          fontWeight: "bold",
        } : undefined,
        animation: selectedBuilding?.id === building.id ? window.google.maps.Animation.DROP : null,
      });

      marker.addListener("click", () => {
        setSelectedBuilding(building);
        setSelectedCat(null);
      });

      markersRef.current.push(marker);
    });
  }, [map, selectedCat, selectedBuilding, currentZoom]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-xl mb-4">⚠️ API Key Missing</div>
          <div className="text-gray-700">
            Please add <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-2xl mb-4">🐱</div>
          <div className="text-gray-600 font-medium">Loading campus map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Info Panel */}
      {(selectedCat || selectedBuilding) && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
          <button
            onClick={() => {
              setSelectedCat(null);
              setSelectedBuilding(null);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          
          {selectedCat && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🐱</span>
                <h3 className="text-xl font-bold text-[#E2C3A7]">{selectedCat.name}</h3>
              </div>
              <div className="text-gray-700 mb-1">
                <strong>Color:</strong> {selectedCat.color}
              </div>
              <div className="text-gray-600 text-sm italic">
                {selectedCat.activity}
              </div>
            </div>
          )}
          
          {selectedBuilding && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏢</span>
                <h3 className="text-xl font-bold text-[#E2C3A7]">{selectedBuilding.name}</h3>
              </div>
              <div className="text-gray-600 text-sm">
                {selectedBuilding.abbr} • UTA Campus
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <div className="text-xs font-bold mb-2 text-gray-700">Legend</div>
        <div className="flex items-center gap-2 mb-1 text-xs">
          <span>🐱</span>
          <span className="text-gray-600">Campus Cats</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span>🏢</span>
          <span className="text-gray-600">Buildings</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;