import { useState, useEffect } from 'react';
import { JournalEntry, Achievement } from '../types';
import { ACHIEVEMENTS } from '../data/constants';
import { PARKS } from '../data/constants';

const STORAGE_KEYS = [
  'wild_ontario_journal',
  'wild_ontario_visits',
  'wild_ontario_stickers',
] as const;

export function useLocalStorage() {
  const [journal, setJournal] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('wild_ontario_journal');
    return saved ? JSON.parse(saved) : [];
  });

  const [visits, setVisits] = useState<string[]>(() => {
    const saved = localStorage.getItem('wild_ontario_visits');
    return saved ? JSON.parse(saved) : [];
  });

  const [stickerCollection, setStickerCollection] = useState<string[]>(() => {
    const saved = localStorage.getItem('wild_ontario_stickers');
    if (saved) {
      return JSON.parse(saved);
    }

    // Backfill stickers for existing visits when this feature is first introduced.
    return visits.filter(parkId => PARKS.some(park => park.id === parkId && park.sticker));
  });

  useEffect(() => {
    localStorage.setItem('wild_ontario_journal', JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem('wild_ontario_visits', JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem('wild_ontario_stickers', JSON.stringify(stickerCollection));
  }, [stickerCollection]);

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setJournal(prev => [newEntry, ...prev]);
  };

  const addVisit = (parkId: string) => {
    if (!visits.includes(parkId)) {
      setVisits(prev => [...prev, parkId]);

      const park = PARKS.find(p => p.id === parkId);
      if (park?.sticker) {
        setStickerCollection(prev => (prev.includes(parkId) ? prev : [...prev, parkId]));
      }
    }
  };

  const clearAllStorage = () => {
    setJournal([]);
    setVisits([]);
    setStickerCollection([]);
    STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
  };

  const getBadges = (): Achievement[] => {
    return ACHIEVEMENTS.filter(badge => {
      if (badge.requirementType === 'visit_count') {
        return visits.length >= badge.requirementValue;
      }
      if (badge.requirementType === 'species_log') {
        const uniqueSpecies = new Set(journal.flatMap(e => e.speciesIds));
        return uniqueSpecies.size >= badge.requirementValue;
      }
      return false;
    });
  };

  return {
    journal,
    visits,
    stickerCollection,
    addJournalEntry,
    addVisit,
    clearAllStorage,
    getBadges,
  };
}
