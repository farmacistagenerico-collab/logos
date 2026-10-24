export const ALPHABET = 'ABCDEFGHILMNOPQRSTUVZ'.split('');
export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export type IllustrationName =
  | 'casa'
  | 'sole'
  | 'mela'
  | 'gatto'
  | 'cane'
  | 'luna'
  | 'palla'
  | 'nave'
  | 'fiore'
  | 'pesce'
  | 'albero'
  | 'libro'
  | 'gelato'
  | 'fungo'
  | 'tartaruga'
  | 'elefante'
  | 'aquilone'
  | 'bicicletta'
  | 'dinosauro';

export type GuideMode = 'full' | 'half' | 'first' | 'none';

export interface Word {
  id: string;
  text: string;
  illustration: IllustrationName;
}

export interface Level {
  id: string;
  name: string;
  shortName: string;
  description: string;
  mechanic: string;
  shuffled: boolean;
  guide: GuideMode;
  words: Word[];
}

export interface Unicorn {
  id: string;
  name: string;
  body: string;
  bodyLight: string;
  mane: string;
  accent: string;
  accessory: 'star' | 'heart' | 'crown' | 'moon';
}

export const UNICORNS: Unicorn[] = [
  {
    id: 'stellina',
    name: 'Stellina',
    body: '#f3a5c5',
    bodyLight: '#ffd2e2',
    mane: '#9678db',
    accent: '#ffd84d',
    accessory: 'star',
  },
  {
    id: 'nuvoletta',
    name: 'Nuvoletta',
    body: '#87d2e8',
    bodyLight: '#c9f0f7',
    mane: '#fffaf0',
    accent: '#f3a5c5',
    accessory: 'heart',
  },
  {
    id: 'arcobaleno',
    name: 'Arcobaleno',
    body: '#ffd56b',
    bodyLight: '#fff0ad',
    mane: '#ef665f',
    accent: '#67c9e8',
    accessory: 'crown',
  },
  {
    id: 'galassia',
    name: 'Galassia',
    body: '#a58bdd',
    bodyLight: '#d5c6f1',
    mane: '#5261a8',
    accent: '#ffd84d',
    accessory: 'moon',
  },
];

export const LEVELS: Level[] = [
  {
    id: 'impariamo-a-leggere',
    name: 'Impariamo a leggere',
    shortName: 'Con la guida',
    description: 'La parola è tutta visibile',
    mechanic: 'Parola completa + alfabeto in ordine',
    shuffled: false,
    guide: 'full',
    words: [
      { id: 'guida-casa', text: 'CASA', illustration: 'casa' },
      { id: 'guida-sole', text: 'SOLE', illustration: 'sole' },
      { id: 'guida-mela', text: 'MELA', illustration: 'mela' },
      { id: 'guida-cane', text: 'CANE', illustration: 'cane' },
      { id: 'guida-luna', text: 'LUNA', illustration: 'luna' },
    ],
  },
  {
    id: 'prime-parole',
    name: 'Le prime parole',
    shortName: 'Prime parole',
    description: 'Alcune lettere come indizio',
    mechanic: 'Metà parola visibile',
    shuffled: false,
    guide: 'half',
    words: [
      { id: 'casa', text: 'CASA', illustration: 'casa' },
      { id: 'sole', text: 'SOLE', illustration: 'sole' },
      { id: 'mela', text: 'MELA', illustration: 'mela' },
      { id: 'gatto', text: 'GATTO', illustration: 'gatto' },
      { id: 'palla', text: 'PALLA', illustration: 'palla' },
      { id: 'nave', text: 'NAVE', illustration: 'nave' },
    ],
  },
  {
    id: 'parole-in-salita',
    name: 'Parole in salita',
    shortName: 'In salita',
    description: 'Solo la prima lettera visibile',
    mechanic: 'Prima lettera + alfabeto mischiato',
    shuffled: true,
    guide: 'first',
    words: [
      { id: 'fiore', text: 'FIORE', illustration: 'fiore' },
      { id: 'pesce', text: 'PESCE', illustration: 'pesce' },
      { id: 'albero', text: 'ALBERO', illustration: 'albero' },
      { id: 'libro', text: 'LIBRO', illustration: 'libro' },
      { id: 'gelato', text: 'GELATO', illustration: 'gelato' },
      { id: 'fungo', text: 'FUNGO', illustration: 'fungo' },
    ],
  },
  {
    id: 'sfida-da-campione',
    name: 'Sfida da campione',
    shortName: 'Da campione',
    description: 'Solo immagine e parole lunghe',
    mechanic: 'Parola nascosta + lettere mischiate',
    shuffled: true,
    guide: 'none',
    words: [
      { id: 'tartaruga', text: 'TARTARUGA', illustration: 'tartaruga' },
      { id: 'elefante', text: 'ELEFANTE', illustration: 'elefante' },
      { id: 'aquilone', text: 'AQUILONE', illustration: 'aquilone' },
      { id: 'bicicletta', text: 'BICICLETTA', illustration: 'bicicletta' },
      { id: 'dinosauro', text: 'DINOSAURO', illustration: 'dinosauro' },
    ],
  },
];

export const TOTAL_WORDS = LEVELS.reduce(
  (total, level) => total + level.words.length,
  0,
);
