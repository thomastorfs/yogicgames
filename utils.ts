import { GameAttributes } from './types';

export const ATTRIBUTE_DEFINITIONS: Record<keyof GameAttributes, { label: string; description: string }> = {
  // Positive
  sattva: { label: "Sattva (Purity)", description: "Quality of harmony, balance, clarity, and light in the mind." },
  vairagya: { label: "Vairagya (Detachment)", description: "Dispassion towards outcomes, rewards, and worldly objects." },
  viveka: { label: "Viveka (Discernment)", description: "Ability to distinguish between the Real (permanent) and Unreal (temporary)." },
  ekagrata: { label: "Ekagrata (Focus)", description: "One-pointed concentration and unbroken attention flow." },
  santosha: { label: "Santosha (Contentment)", description: "Acceptance of the present moment; lack of craving for 'more'." },
  frustrationTolerance: { label: "Frustration Tol.", description: "Capacity to endure setbacks and failure without mental agitation." },
  impulseControl: { label: "Impulse Control", description: "Ability to resist immediate desires, loot, or reactive behaviors." },
  egoConfrontation: { label: "Ego Confrontation", description: "Mechanisms that challenge self-importance or humble the player." },
  sanga: { label: "Sanga (Company)", description: "Association with wise company; positive community interaction." },

  // Negative
  rajas: { label: "Rajas (Passion)", description: "Frenetic energy, restlessness, anxiety, and desire-driven activity." },
  tamas: { label: "Tamas (Inertia)", description: "Lethargy, dullness, ignorance, and darkness of mind." },
  addictionPotential: { label: "Addiction Pot.", description: "Design features (loops, loot boxes) creating dependency." },
  timeWasting: { label: "Time Wasting", description: "Consumption of time without productive yield or true rest." },
  dissociation: { label: "Dissociation", description: "Disconnecting from physical reality/self; 'zoning out'." },
  samskaraFormation: { label: "Samskara Form.", description: "Deepening of negative mental grooves or habitual patterns." },
  ahimsaViolation: { label: "Ahimsa Violation", description: "Engaging in, witnessing, or normalizing violence/harm." },
  pratyaharaDisturbance: { label: "Pratyahara Dist.", description: "Sensory overload preventing withdrawal/rest of the senses." },
  sankalpaUndermining: { label: "Sankalpa Underm.", description: "Weakening of willpower or distraction from life's core purpose." }
};

export const POSITIVE_ATTRS: (keyof GameAttributes)[] = [
  'sattva', 'vairagya', 'viveka', 'ekagrata', 'santosha', 
  'frustrationTolerance', 'impulseControl', 'egoConfrontation', 'sanga'
];

export const NEGATIVE_ATTRS: (keyof GameAttributes)[] = [
  'rajas', 'tamas', 'addictionPotential', 'timeWasting', 'dissociation', 
  'samskaraFormation', 'ahimsaViolation', 'pratyaharaDisturbance', 'sankalpaUndermining'
];

export const calculateScore = (attrs: GameAttributes): number => {
  const positive = 
    (attrs.sattva * 3) + 
    (attrs.vairagya * 2) + 
    (attrs.viveka * 2) + 
    (attrs.ekagrata * 1.5) + 
    (attrs.santosha * 1.5) + 
    (attrs.frustrationTolerance * 1) + 
    (attrs.impulseControl * 1) + 
    (attrs.egoConfrontation * 1.5) + 
    (attrs.sanga * 2);

  const negative = 
    (attrs.rajas * 0.5) + 
    (attrs.tamas * 2.5) + 
    (attrs.addictionPotential * 2) + 
    (attrs.timeWasting * 1.5) + 
    (attrs.dissociation * 1) + 
    (attrs.samskaraFormation * 4) + 
    (attrs.ahimsaViolation * 3) + 
    (attrs.pratyaharaDisturbance * 2) + 
    (attrs.sankalpaUndermining * 2.5);

  return parseFloat((positive - negative).toFixed(2));
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};