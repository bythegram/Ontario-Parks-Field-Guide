export interface Park {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  region: 'Northern' | 'Central' | 'Southwestern' | 'Eastern' | 'Golden Horseshoe';
  lore: string;
  features: string[];
  image: string;
  sticker?: string;
}

export interface Species {
  id: string;
  name: string;
  scientificName?: string;
  type: 'Plant' | 'Animal' | 'Bird' | 'Insect';
  description: string;
  habitat: string[];
  funFact: string;
  image?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  parkId?: string;
  title: string;
  content: string;
  speciesIds: string[];
  rating: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirementType: 'visit_count' | 'species_log';
  requirementValue: number;
}
