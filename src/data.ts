export const ALPHABET = 'ABCDEFGHILMNOPQRSTUVZ'.split('');
export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export type IllustrationName =
  | 'casa'
  | 'sole'
  | 'mela'
  | 'gatto'
  | 'fiore'
  | 'pesce'
  | 'albero'
  | 'libro'
  | 'tartaruga'
  | 'elefante'
  | 'aquilone';

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
  words: Word[];
}

export const LEVELS: Level[] = [
  {
    id: 'prime-parole',
    name: 'Le prime parole',
    shortName: 'Prime parole',
    description: 'Lettere in ordine e parole corte',
    mechanic: 'Alfabeto in ordine',
    shuffled: false,
    words: [
      { id: 'casa', text: 'CASA', illustration: 'casa' },
      { id: 'sole', text: 'SOLE', illustration: 'sole' },
      { id: 'mela', text: 'MELA', illustration: 'mela' },
      { id: 'gatto', text: 'GATTO', illustration: 'gatto' },
    ],
  },
  {
    id: 'parole-in-salita',
    name: 'Parole in salita',
    shortName: 'In salita',
    description: 'Lettere mischiate, più attenzione',
    mechanic: 'Alfabeto mischiato',
    shuffled: true,
    words: [
      { id: 'fiore', text: 'FIORE', illustration: 'fiore' },
      { id: 'pesce', text: 'PESCE', illustration: 'pesce' },
      { id: 'albero', text: 'ALBERO', illustration: 'albero' },
      { id: 'libro', text: 'LIBRO', illustration: 'libro' },
    ],
  },
  {
    id: 'sfida-da-campione',
    name: 'Sfida da campione',
    shortName: 'Da campione',
    description: 'Parole lunghe per super lettori',
    mechanic: 'Parole lunghe + lettere mischiate',
    shuffled: true,
    words: [
      { id: 'tartaruga', text: 'TARTARUGA', illustration: 'tartaruga' },
      { id: 'elefante', text: 'ELEFANTE', illustration: 'elefante' },
      { id: 'aquilone', text: 'AQUILONE', illustration: 'aquilone' },
    ],
  },
];

export const TOTAL_WORDS = LEVELS.reduce(
  (total, level) => total + level.words.length,
  0,
);
