// src/data/missions.ts
export type MissionPhase = 'ENGAGE' | 'EXPLORE' | 'EXPLAIN' | 'ELABORATE' | 'EVALUATE';

export interface MissionMeta {
  id: number;
  code: string;
  title: string;
  icon: string;
  description: string;
  duration: string;
  phase: MissionPhase;
  objective: string;
}

export const MISSIONS: MissionMeta[] = [
  {
    id: 1,
    code: '01',
    title: 'Misteri Dongkrak',
    icon: '🚗',
    description:
      'Sebuah mobil yang sangat berat dapat diangkat oleh dongkrak kecil. Ada apa di baliknya?',
    duration: '± 7 menit',
    phase: 'ENGAGE',
    objective: 'Mengamati fenomena dan membuat prediksi awal tentang cara kerja dongkrak hidrolik.',
  },
  {
    id: 2,
    code: '02',
    title: 'Tekanan Tak Terlihat',
    icon: '🖐️',
    description:
      'Ubah besar gaya dan luas permukaan, lalu rasakan bagaimana tekanan berubah.',
    duration: '± 10 menit',
    phase: 'EXPLORE',
    objective: 'Menemukan hubungan antara gaya, luas permukaan, dan tekanan melalui percobaan.',
  },
  {
    id: 3,
    code: '03',
    title: 'Laboratorium Pascal',
    icon: '🧪',
    description:
      'Jalankan tiga percobaan hidrolik, catat datanya, dan temukan keteraturannya.',
    duration: '± 18 menit',
    phase: 'EXPLORE',
    objective: 'Mengumpulkan data dari sistem dua piston dan mengenali besaran yang tetap.',
  },
  {
    id: 4,
    code: '04',
    title: 'Temukan Polanya',
    icon: '💧',
    description:
      'Bandingkan P₁ dan P₂ dari datamu, lalu susun penjelasan ilmiahnya.',
    duration: '± 12 menit',
    phase: 'EXPLAIN',
    objective: 'Merumuskan Hukum Pascal dan menurunkan persamaan F₁/A₁ = F₂/A₂ dari bukti.',
  },
  {
    id: 5,
    code: '05',
    title: 'Insinyur Hidrolik',
    icon: '⚙️',
    description:
      'Rancang sistem pengangkat hidrolikmu sendiri dan hitung gaya keluarannya.',
    duration: '± 12 menit',
    phase: 'ELABORATE',
    objective: 'Menerapkan persamaan Pascal untuk menyelesaikan masalah teknik sederhana.',
  },
  {
    id: 6,
    code: '06',
    title: 'Dunia Hidrolik',
    icon: '🏗️',
    description:
      'Selidiki bagaimana prinsip ini bekerja pada rem, lift, dongkrak, dan mesin press.',
    duration: '± 10 menit',
    phase: 'ELABORATE',
    objective: 'Mengidentifikasi penerapan Hukum Pascal dalam teknologi sehari-hari.',
  },
  {
    id: 7,
    code: '07',
    title: 'Pascal Challenge',
    icon: '🏁',
    description:
      'Uji pemahamanmu melalui 10 tantangan konsep, hitungan, dan penalaran.',
    duration: '± 15 menit',
    phase: 'EVALUATE',
    objective: 'Membuktikan penguasaan konsep tekanan dan Hukum Pascal secara menyeluruh.',
  },
];

export const PHASE_LABEL: Record<MissionPhase, string> = {
  ENGAGE: 'Engage',
  EXPLORE: 'Explore',
  EXPLAIN: 'Explain',
  ELABORATE: 'Elaborate',
  EVALUATE: 'Evaluate',
};