import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { PARKS } from '../data/constants';
import { Search, MapPin, Wind, Info, X, Scroll, Activity, CheckCircle2 } from 'lucide-react';
import { Park } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ExploreSectionProps {
  storage: any;
}

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapFocus({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 7);
  }, [center, map]);
  return null;
}

export function ExploreSection({ storage }: ExploreSectionProps) {
  const [search, setSearch] = useState('');
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([46.5, -81]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [sortBy, setSortBy] = useState<'alpha' | 'nearest'>('alpha');
  const [locationError, setLocationError] = useState<string | null>(null);

  const getErrorCode = (error: unknown): number | null => {
    if (!error || typeof error !== 'object') {
      return null;
    }
    const code = (error as { code?: unknown }).code;
    return typeof code === 'number' ? code : null;
  };

  const getCurrentPosition = (options: PositionOptions) =>
    new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

  const resolveCurrentPosition = async () => {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by your browser.');
    }

    const isLocalDevHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!window.isSecureContext && !isLocalDevHost) {
      throw new Error('Location requires a secure origin (HTTPS) or localhost.');
    }

    const attempts: PositionOptions[] = [
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 10 * 60 * 1000 },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: Infinity }
    ];

    let lastError: GeolocationPositionError | null = null;
    for (const attempt of attempts) {
      try {
        return await getCurrentPosition(attempt);
      } catch (error) {
        lastError = error as GeolocationPositionError;
      }
    }

    throw lastError ?? new Error('Could not determine location.');
  };

  const resolveApproximatePosition = async () => {
    const providers = [
      {
        url: 'https://ipapi.co/json/',
        parse: (data: any) => ({ lat: Number(data?.latitude), lng: Number(data?.longitude) })
      },
      {
        url: 'https://ipwho.is/',
        parse: (data: any) => ({ lat: Number(data?.latitude), lng: Number(data?.longitude) })
      }
    ];

    for (const provider of providers) {
      try {
        const response = await fetch(provider.url);
        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const coords = provider.parse(data);
        if (Number.isFinite(coords.lat) && Number.isFinite(coords.lng)) {
          return coords;
        }
      } catch {
        // Ignore and try next provider.
      }
    }

    throw new Error('Could not determine approximate location.');
  };

  const toLocationErrorMessage = (error: unknown) => {
    const code = getErrorCode(error);
    if (code === 1) {
      return 'Location access denied. Please enable it in your browser settings to sort by distance.';
    }
    if (code === 2) {
      return 'Position update unavailable. Try enabling Wi-Fi, disabling VPN, or moving to an open area, then retry.';
    }
    if (code === 3) {
      return 'Location request timed out. Please retry in a few seconds.';
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Could not determine location. Please try again.';
  };

  const requestLocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    try {
      const position = await resolveCurrentPosition();
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    } catch (error) {
      console.warn('Geolocation denied or failed:', error);
      const code = getErrorCode(error);

      if (code !== 1) {
        try {
          const approximate = await resolveApproximatePosition();
          setUserLocation(approximate);
          setLocationError('Using approximate location from your network. Distances may be less precise.');
          return;
        } catch (fallbackError) {
          console.warn('Approximate location fallback failed:', fallbackError);
        }
      }

      setLocationError(toLocationErrorMessage(error));
    } finally {
      setIsLocating(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredParks = [...PARKS]
    .filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.region.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'nearest' && userLocation) {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.location.lat, a.location.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.location.lat, b.location.lng);
        return distA - distB;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-forest-900 flex items-center gap-2">
            Explore Ontario
            {userLocation && sortBy === 'nearest' && (
              <span className="text-[10px] bg-forest-100 text-forest-600 px-2 py-1 rounded-md font-bold uppercase tracking-widest animate-pulse">
                Nearest First
              </span>
            )}
          </h2>
          <p className="text-forest-600 mt-1">Discover the wild heart of the province.</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400 group-focus-within:text-forest-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search parks or regions..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-transparent w-full md:w-80 transition-all shadow-sm"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[700px] lg:min-h-[75vh]">
        {/* Map View */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-earth-200 relative z-10">
          <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapFocus center={mapCenter} />
            {filteredParks.map(park => (
              <Marker 
                key={park.id} 
                position={[park.location.lat, park.location.lng]}
                eventHandlers={{
                  click: () => setSelectedPark(park)
                }}
              >
                <Popup>
                  <div className="p-1 max-w-[200px]">
                    <h3 className="font-bold text-forest-900 border-b border-earth-100 pb-1 mb-2">{park.name}</h3>
                    <p className="text-xs text-forest-600 mb-2 line-clamp-2">{park.lore}</p>
                    <button 
                      onClick={() => setSelectedPark(park)}
                      className="text-xs font-bold text-forest-700 hover:text-forest-800 underline uppercase tracking-wider"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* List View */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[10px] font-bold text-forest-400 uppercase tracking-widest">
              {filteredParks.length} Results Found
            </span>
            <div className="flex bg-forest-50 p-1 rounded-xl border border-forest-100">
              <button 
                onClick={() => setSortBy('alpha')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  sortBy === 'alpha' 
                    ? "bg-white text-forest-700 shadow-sm" 
                    : "text-forest-400 hover:text-forest-600"
                )}
              >
                A-Z
              </button>
              <button 
                onClick={() => {
                  setSortBy('nearest');
                  if (!userLocation) {
                    void requestLocation();
                  }
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                  sortBy === 'nearest' 
                    ? "bg-white text-forest-700 shadow-sm" 
                    : "text-forest-400 hover:text-forest-600"
                )}
              >
                {isLocating ? 'Locating...' : 'Nearest'}
              </button>
            </div>
          </div>

          {locationError && sortBy === 'nearest' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-2xl text-xs mb-4 flex items-center gap-3"
            >
              <MapPin size={16} className="text-amber-500 shrink-0" />
              <p className="flex-1">{locationError}</p>
              <button 
                onClick={requestLocation}
                className="px-3 py-1 bg-white border border-amber-200 rounded-lg font-bold hover:bg-amber-100 transition-colors shrink-0"
              >
                Retry
              </button>
            </motion.div>
          )}

          <div className="space-y-4 overflow-y-auto pr-2 max-h-[calc(100vh-320px)] lg:max-h-[calc(75vh-100px)]">
            {filteredParks.map(park => (
              <button
                key={park.id}
                onClick={() => {
                  setSelectedPark(park);
                  setMapCenter([park.location.lat, park.location.lng]);
                }}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all duration-300 group relative",
                  selectedPark?.id === park.id 
                    ? "bg-forest-900 border-forest-900 text-white shadow-lg" 
                    : "bg-white border-earth-200 hover:border-forest-300 hover:shadow-md"
                )}
              >
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col gap-1">
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full inline-block w-fit",
                    selectedPark?.id === park.id ? "bg-forest-800 text-forest-100" : "bg-forest-50 text-forest-600"
                  )}>
                    {park.region}
                  </span>
                  {userLocation && (
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-tight",
                      selectedPark?.id === park.id ? "text-forest-300" : "text-forest-400"
                    )}>
                      {Math.round(calculateDistance(userLocation.lat, userLocation.lng, park.location.lat, park.location.lng))} km away
                    </span>
                  )}
                </div>
                <MapPin size={14} className={selectedPark?.id === park.id ? "text-forest-400" : "text-forest-300"} />
              </div>
              <h4 className="font-bold text-lg mb-1">{park.name}</h4>
              <p className={cn(
                "text-xs line-clamp-2",
                selectedPark?.id === park.id ? "text-forest-200" : "text-forest-500"
              )}>
                {park.lore}
              </p>
            </button>
          ))}
          {filteredParks.length === 0 && (
            <div className="text-center py-10 px-4">
              <Wind className="mx-auto text-earth-300 mb-3" size={40} />
              <p className="text-forest-500 font-medium">No parks found matching your search.</p>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedPark && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest-950/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
          >
            <div className="h-64 md:h-80 relative">
              <img src={selectedPark.image} alt={selectedPark.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Optional Sticker Badge */}
              {selectedPark.sticker && (
                <div className="absolute top-4 left-4 z-20">
                  <motion.div 
                    initial={{ rotate: -15, scale: 0.8 }}
                    animate={{ rotate: 10, scale: 1 }}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white p-1 shadow-2xl border-4 border-white/50 overflow-hidden"
                  >
                    <img src={selectedPark.sticker} alt="Park Crest" className="w-full h-full object-contain" />
                  </motion.div>
                </div>
              )}

              <button 
                onClick={() => setSelectedPark(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8">
                <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">{selectedPark.region}</span>
                <h3 className="text-3xl font-serif text-white mt-1">{selectedPark.name}</h3>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h4 className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Scroll size={14} /> Local Lore
                  </h4>
                  <p className="text-forest-800 leading-relaxed font-serif text-lg italic">
                    "{selectedPark.lore}"
                  </p>
                </section>
                
                <section>
                  <h4 className="text-forest-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Info size={14} /> Park Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPark.features.map(f => (
                      <span key={f} className="bg-forest-50 text-forest-700 px-3 py-1.5 rounded-full text-xs font-medium border border-forest-100">
                        {f}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-4">
                <div className="bg-earth-50 rounded-2xl p-5 border border-earth-200">
                  <h5 className="text-forest-900 font-bold mb-3 text-sm flex items-center justify-between">
                    Visited this park?
                    {storage.visits.includes(selectedPark.id) && <CheckCircle2 size={16} className="text-forest-500" />}
                  </h5>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        storage.addVisit(selectedPark.id);
                      }}
                      disabled={storage.visits.includes(selectedPark.id)}
                      className={cn(
                        "w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2",
                        storage.visits.includes(selectedPark.id)
                          ? "bg-forest-100 text-forest-400 cursor-not-allowed shadow-none"
                          : "bg-forest-600 text-white hover:bg-forest-700 active:scale-95"
                      )}
                    >
                       <Scroll size={16} />
                      {storage.visits.includes(selectedPark.id) ? 'Visit Logged' : 'Manual Log'}
                    </button>

                    {!storage.visits.includes(selectedPark.id) && (
                      <button 
                        onClick={async () => {
                          try {
                            const position = await resolveCurrentPosition();
                            const userLat = position.coords.latitude;
                            const userLng = position.coords.longitude;
                            
                            // Haversine formula for distance
                            const R = 6371; // km
                            const dLat = (userLat - selectedPark.location.lat) * Math.PI / 180;
                            const dLng = (userLng - selectedPark.location.lng) * Math.PI / 180;
                            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                      Math.cos(selectedPark.location.lat * Math.PI / 180) * Math.cos(userLat * Math.PI / 180) * 
                                      Math.sin(dLng/2) * Math.sin(dLng/2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                            const distance = R * c;

                            if (distance <= 5) { // 5km radius
                              storage.addVisit(selectedPark.id);
                              alert(`Verified! You are at ${selectedPark.name}.`);
                            } else {
                              alert(`Too far! You are approximately ${Math.round(distance)}km away from this park. Check-in requires being within 5km.`);
                            }
                          } catch (error) {
                            alert(toLocationErrorMessage(error));
                          }
                        }}
                        className="w-full py-3 rounded-xl font-bold text-xs bg-white text-forest-600 border border-forest-200 hover:bg-forest-50 transition-all flex items-center justify-center gap-2"
                      >
                        <MapPin size={16} />
                        Verify via GPS
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-forest-500 mt-3 text-center uppercase font-medium tracking-wider">
                    {storage.visits.includes(selectedPark.id) 
                      ? 'Memory preserved in your journal' 
                      : 'Earn badges for visiting parks'}
                  </p>
                </div>

                <div className="bg-forest-900 rounded-2xl p-5 text-white">
                  <h5 className="font-bold flex items-center gap-2 text-sm mb-2">
                    <Activity size={16} className="text-forest-400" /> Strava Sync
                  </h5>
                  <p className="text-xs text-forest-300 leading-relaxed mb-4">
                    Sync your hiking activities to automatically verify your park visits.
                  </p>
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all">
                    Link Activity
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Icons needed for components
// cleaned up
