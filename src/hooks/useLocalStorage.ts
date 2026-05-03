import { useState, useEffect } from 'react';
import { JournalEntry, Achievement } from '../types';
import { ACHIEVEMENTS } from '../data/constants';

export function useLocalStorage() {
  const [journal, setJournal] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('wild_ontario_journal');
    return saved ? JSON.parse(saved) : [];
  });

  const [visits, setVisits] = useState<string[]>(() => {
    const saved = localStorage.getItem('wild_ontario_visits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wild_ontario_journal', JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem('wild_ontario_visits', JSON.stringify(visits));
  }, [visits]);

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
    }
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
    addJournalEntry,
    addVisit,
    getBadges,
  };
}
