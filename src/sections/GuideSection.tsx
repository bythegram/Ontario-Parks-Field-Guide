import React, { useState, useEffect, useRef } from 'react';
import { SPECIES } from '../data/constants';
import { Search, Filter, Info, Sparkles, Binary, X } from 'lucide-react';
import { Species } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function GuideSection({ storage }: { storage: any }) {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const closeDetailsButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedSpecies) {
      closeDetailsButtonRef.current?.focus();
    }
  }, [selectedSpecies]);

  useEffect(() => {
    if (!selectedSpecies) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedSpecies(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedSpecies]);

  const types = ['Plant', 'Animal', 'Bird', 'Insect'];

  const filteredSpecies = SPECIES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                         s.scientificName?.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType ? s.type === activeType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-earth-200">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-forest-500 uppercase tracking-widest bg-forest-100 px-2 py-0.5 rounded">Reference Book</span>
          </div>
          <h2 className="text-4xl font-bold text-forest-900 font-serif italic">The Field Guide</h2>
          <p className="text-forest-600 mt-2 max-w-xl">
            A comprehensive catalog of flora and fauna native to Ontario's provincial parks. 
            Identify species and learn their secrets.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400" size={18} />
            <input 
              type="text" 
              placeholder="Search species..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-earth-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-forest-300 w-full md:w-72 shadow-sm transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveType(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                activeType === null ? "bg-forest-900 text-white" : "bg-white text-forest-600 border border-earth-200 hover:border-forest-300"
              )}
            >
              All
            </button>
            {types.map(type => (
              <button
                type="button"
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                  activeType === type ? "bg-forest-900 text-white" : "bg-white text-forest-600 border border-earth-200 hover:border-forest-300"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpecies.map((species, i) => (
          <motion.button
            type="button"
            key={species.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group text-left"
            onClick={() => setSelectedSpecies(species)}
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-earth-200 shadow-sm hover:shadow-xl hover:border-forest-200 transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={species.image} 
                  alt={species.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur text-[10px] font-bold text-forest-700 px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider border border-forest-100">
                    {species.type}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg text-forest-900 group-hover:text-forest-700 transition-colors">{species.name}</h3>
                <p className="text-[10px] font-mono text-forest-400 mt-0.5 italic">{species.scientificName}</p>
                
                <p className="text-xs text-forest-600 mt-4 line-clamp-2 leading-relaxed">
                  {species.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-earth-50 flex items-center justify-between">
                  <span className="text-[10px] text-forest-400 font-bold uppercase tracking-widest">Learn More</span>
                  <div className="w-6 h-6 rounded-full bg-forest-50 flex items-center justify-center group-hover:bg-forest-100 transition-colors">
                    <Info size={12} className="text-forest-400 group-hover:text-forest-600" />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedSpecies && (
          <div 
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-forest-950/40 backdrop-blur-md"
            onClick={() => setSelectedSpecies(null)}
          >
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="species-details-title"
              onClick={e => e.stopPropagation()}
              className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-earth-200"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img src={selectedSpecies.image} alt={selectedSpecies.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="md:w-1/2 p-8 flex flex-col">
                  <button 
                    ref={closeDetailsButtonRef}
                    type="button"
                    aria-label="Close species details"
                    onClick={() => setSelectedSpecies(null)}
                    className="self-end p-2 hover:bg-earth-50 rounded-xl transition-colors mb-2"
                  >
                    <X size={20} className="text-forest-400" />
                  </button>

                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-forest-500 uppercase tracking-[0.2em]">{selectedSpecies.type}</span>
                    <h3 id="species-details-title" className="text-3xl font-serif font-bold text-forest-900 mt-1">{selectedSpecies.name}</h3>
                    <p className="text-xs font-mono text-forest-500 italic mt-1">{selectedSpecies.scientificName}</p>
                  </div>

                  <div className="space-y-6 flex-1">
                    <section>
                      <h4 className="text-[10px] font-bold text-forest-400 uppercase tracking-widest mb-2">Description</h4>
                      <p className="text-sm text-forest-700 leading-relaxed">
                        {selectedSpecies.description}
                      </p>
                    </section>

                    <section>
                       <h4 className="text-[10px] font-bold text-forest-400 uppercase tracking-widest mb-2">Habitat</h4>
                       <div className="flex flex-wrap gap-2">
                        {selectedSpecies.habitat.map(h => (
                          <span key={h} className="text-[10px] px-2 py-0.5 bg-earth-50 text-forest-600 rounded-md border border-earth-100">
                            {h}
                          </span>
                        ))}
                       </div>
                    </section>

                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 mt-auto">
                      <div className="flex items-center gap-2 mb-2 text-amber-700">
                        <Sparkles size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Secret Lore</span>
                      </div>
                      <p className="text-xs text-amber-800 italic leading-relaxed">
                         "{selectedSpecies.funFact}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

