export interface GameAttributes {
  // Positive
  sattva: number;
  vairagya: number;
  viveka: number;
  ekagrata: number;
  santosha: number;
  frustrationTolerance: number;
  impulseControl: number;
  egoConfrontation: number;
  sanga: number;
  
  // Negative
  rajas: number;
  tamas: number;
  addictionPotential: number;
  timeWasting: number;
  dissociation: number;
  samskaraFormation: number;
  ahimsaViolation: number;
  pratyaharaDisturbance: number;
  sankalpaUndermining: number;
}

export interface Comment {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
}

export interface Game {
  id: string;
  rank: number;
  title: string;
  tier: string;
  platform: string;
  activePlayers: string;
  originalRating: string;
  description: string; 
  criticism: string;
  attributes: GameAttributes;
  yogicScore: number;
  userRatings: Comment[];
  steamAppId?: string;
}