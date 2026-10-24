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
    ],
  },
];

export const TOTAL_WORDS = LEVELS.reduce(
  (total, level) => total + level.words.length,
  0,
);
