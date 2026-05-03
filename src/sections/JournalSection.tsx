import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Scroll, Plus, Calendar, Tag, Trash2, Edit3, Map as MapIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PARKS, SPECIES } from '../data/constants';
import { cn } from '../lib/utils';

export function JournalSection({ storage }: { storage: any }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [parkId, setParkId] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPark = parkId ? PARKS.find(p => p.id === parkId) : null;
    const hadVisitBeforeSubmit = parkId ? storage.visits.includes(parkId) : false;

    if (parkId) {
      storage.addVisit(parkId);
    }

    storage.addJournalEntry({
      title,
      content,
      parkId,
      speciesIds: selectedSpecies,
      rating: 5,
    });

    if (selectedPark?.sticker) {
      setSubmitNotice(
        hadVisitBeforeSubmit
          ? `Entry saved for ${selectedPark.name}. Sticker already in your collection.`
          : `Entry saved for ${selectedPark.name}. Sticker added to your collection.`
      );
    } else if (selectedPark) {
      setSubmitNotice(`Entry saved for ${selectedPark.name}.`);
    } else {
      setSubmitNotice('Entry saved.');
    }

    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setParkId('');
    setSelectedSpecies([]);
  };

  const activePark = PARKS.find(p => p.id === parkId);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-forest-900">My Nature Journal</h2>
          <p className="text-forest-600 mt-1">Capture your memories and sightings in the wild.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-forest-900 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-forest-900/20 hover:bg-forest-800 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span>New Entry</span>
          </button>
        )}
      </header>

      {submitNotice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 bg-forest-50 border border-forest-200 text-forest-800 rounded-2xl px-4 py-3"
        >
          <p className="text-sm font-medium">{submitNotice}</p>
          <button
            type="button"
            onClick={() => setSubmitNotice(null)}
            className="text-xs font-bold uppercase tracking-wider text-forest-600 hover:text-forest-800"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-3xl border border-earth-200 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest-500 uppercase tracking-widest pl-1">Entry Title</label>
                  <input 
                    required
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., A Misty Morning at Canoe Lake"
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-300 focus:outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest-500 uppercase tracking-widest pl-1">Park Location</label>
                  <select 
                    value={parkId}
                    onChange={(e) => setParkId(e.target.value)}
                    className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl focus:ring-2 focus:ring-forest-300 focus:outline-none transition-all"
                  >
                    <option value="">Select a park (optional)</option>
                    {PARKS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-forest-500 uppercase tracking-widest pl-1">Your Observations</label>
                <textarea 
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe what you saw, felt, or discovered..."
                  className="w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-forest-300 focus:outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-forest-500 uppercase tracking-widest pl-1 flex items-center gap-2">
                  <Tag size={12} /> Species Sighted
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIES.map(species => {
                    const isSelected = selectedSpecies.includes(species.id);
                    return (
                      <button
                        key={species.id}
                        type="button"
                        onClick={() => {
                          setSelectedSpecies(prev => 
                            isSelected ? prev.filter(id => id !== species.id) : [...prev, species.id]
                          );
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          isSelected 
                            ? "bg-forest-600 text-white border border-forest-600 shadow-md" 
                            : "bg-white text-forest-600 border border-earth-200 hover:border-forest-300"
                        )}
                      >
                        {species.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 text-sm font-bold text-forest-400 hover:text-forest-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-forest-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-forest-900/20 hover:bg-forest-800 transition-all active:scale-95"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {storage.journal.length === 0 && !isAdding ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-earth-300">
            <Scroll size={48} className="mx-auto text-earth-300 mb-4" />
            <h3 className="text-xl font-bold text-forest-900 mb-2">No entries yet</h3>
            <p className="text-forest-500 max-w-xs mx-auto">Start your journey today by logging your first observation in nature.</p>
          </div>
        ) : (
          storage.journal.map((entry: any, i: number) => {
            const park = PARKS.find(p => p.id === entry.parkId);
            return (
              <motion.article 
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white p-8 rounded-3xl border border-earth-200 hover:border-forest-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-forest-50 -mr-16 -mt-16 rounded-full group-hover:bg-forest-100 transition-colors" />
                
                <div className="relative">
                  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-forest-400">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em]">
                          <Calendar size={12} /> {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {park && (
                          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600">
                            <MapIcon size={12} /> {park.name}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-forest-950 group-hover:text-forest-700 transition-colors leading-tight">
                        {entry.title}
                      </h3>
                    </div>
                    {park?.sticker && (
                      <motion.div 
                        initial={{ scale: 0.8, rotate: -10 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 md:w-20 md:h-20 shrink-0"
                      >
                        <div className="w-full h-full rounded-full bg-white p-1 shadow-md border-2 border-forest-50 overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                          <img src={park.sticker} alt="Memorial Sticker" className="w-full h-full object-contain" />
                        </div>
                      </motion.div>
                    )}
                  </header>

                  <p className="text-forest-700 leading-relaxed font-serif text-lg italic border-l-2 border-earth-100 pl-6 mb-6">
                    "{entry.content}"
                  </p>

                  {entry.speciesIds.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.speciesIds.map((sid: string) => {
                        const species = SPECIES.find(s => s.id === sid);
                        return species ? (
                          <span key={sid} className="px-3 py-1 bg-forest-50 text-forest-600 rounded-full text-xs font-bold border border-forest-100 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest-400" />
                            {species.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })
        )}
      </div>
    </div>
  );
}
