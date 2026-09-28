// src/data/badges.ts
import type { BadgeDef } from '../types';

export const BADGES: Record<string, BadgeDef> = {
  pressure: {
    id: 'pressure',
    icon: '🔬',
    name: 'Pressure Explorer',
    desc: 'Menguasai hubungan gaya, luas, dan tekanan.',
  },
  pascal: {
    id: 'pascal',
    icon: '💧',
    name: 'Pascal Investigator',
    desc: 'Menemukan Hukum Pascal dari data eksperimen sendiri.',
  },
  engineer: {
    id: 'engineer',
    icon: '⚙️',
    name: 'Hydraulic Engineer',
    desc: 'Merancang sistem hidrolik dengan perhitungan yang tepat.',
  },
  thinker: {
    id: 'thinker',
    icon: '🧠',
    name: 'Physics Thinker',
    desc: 'Menalar penerapan hidrolik di dunia nyata.',
  },
  master: {
    id: 'master',
    icon: '🏆',
    name: 'Pascal Master',
    desc: 'Menuntaskan Pascal Challenge dengan baik.',
  },
};

export const BADGE_LIST: BadgeDef[] = Object.values(BADGES);