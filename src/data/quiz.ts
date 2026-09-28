// src/data/quiz.ts
import type { QuizCategory } from '../types';

export interface BaseQ {
  id: string;
  category: QuizCategory;
  points: number;
  question: string;
}

export interface MCQuestion extends BaseQ {
  type: 'mc';
  options: { id: string; label: string }[];
  correctId: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface TFQuestion extends BaseQ {
  type: 'tf';
  correct: boolean;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface NumericQuestion extends BaseQ {
  type: 'numeric';
  unit: string;
  answer: number;
  tolerance: number;
  hint: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface ReasoningQuestion extends BaseQ {
  type: 'reasoning';
  keywords: string[][];
  minKeywords: number;
  modelAnswer: string;
}

export interface MatchingQuestion extends BaseQ {
  type: 'matching';
  pairs: { term: string; match: string }[];
  feedbackCorrect: string;
  feedbackWrong: string;
}

export type QuizQuestion =
  | MCQuestion
  | TFQuestion
  | NumericQuestion
  | ReasoningQuestion
  | MatchingQuestion;

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'mc',
    category: 'konsep',
    points: 1,
    question:
      'Pada sistem hidrolik, mengapa piston keluaran yang luasnya lebih besar dapat menghasilkan gaya keluaran yang lebih besar?',
    options: [
      { id: 'a', label: 'Karena tekanan di piston besar menjadi lebih besar.' },
      {
        id: 'b',
        label: 'Karena tekanan yang sama besar bekerja pada luas penampang yang lebih besar.',
      },
      { id: 'c', label: 'Karena fluida menciptakan energi tambahan di piston besar.' },
      { id: 'd', label: 'Karena massa fluida bertambah di dalam piston besar.' },
    ],
    correctId: 'b',
    feedbackCorrect:
      'Tepat! Tekanan yang diteruskan sama besar. Karena F = P × A, luas penampang yang lebih besar menghasilkan gaya yang lebih besar.',
    feedbackWrong:
      'Belum tepat. Ingat: tekanan pada kedua piston sama besar (P₁ = P₂). Yang berbeda adalah luas penampangnya, sehingga gaya keluarannya berbeda.',
  },
  {
    id: 'q2',
    type: 'mc',
    category: 'konsep',
    points: 1,
    question:
      'Menurut Hukum Pascal, tekanan yang diberikan pada fluida dalam ruang tertutup akan …',
    options: [
      { id: 'a', label: 'berkurang saat mencapai piston yang lebih besar' },
      { id: 'b', label: 'hilang saat melewati pipa penghubung' },
      { id: 'c', label: 'diteruskan ke segala arah dengan besar yang sama' },
      { id: 'd', label: 'bertambah besar di piston yang lebih besar' },
    ],
    correctId: 'c',
    feedbackCorrect:
      'Benar. Tekanan diteruskan ke segala arah dengan besar yang sama — itulah inti Hukum Pascal.',
    feedbackWrong:
      'Belum tepat. Hukum Pascal menyatakan tekanan diteruskan ke segala arah dengan besar yang sama, bukan berkurang atau bertambah.',
  },
  {
    id: 'q3',
    type: 'tf',
    category: 'konsep',
    points: 1,
    question:
      'Pada sistem hidrolik ideal, tekanan pada piston besar selalu lebih besar daripada tekanan pada piston kecil.',
    correct: false,
    feedbackCorrect:
      'Benar, pernyataan itu salah. Tekanan diteruskan sama besar (P₁ = P₂). Yang menjadi lebih besar adalah gaya keluaran, bukan tekanannya.',
    feedbackWrong:
      'Perhatikan: pada sistem hidrolik ideal, tekanan diteruskan sama besar. Yang bertambah besar adalah gaya, bukan tekanan.',
  },
  {
    id: 'q4',
    type: 'numeric',
    category: 'hitung',
    points: 1,
    question:
      'Sebuah sistem hidrolik memiliki A₁ = 4 cm², A₂ = 40 cm², dan F₁ = 15 N. Berapa besar F₂?',
    unit: 'N',
    answer: 150,
    tolerance: 1,
    hint: 'Gunakan F₂ = F₁ × (A₂ / A₁). Perhatikan bahwa satuan luas sudah sama (cm²).',
    feedbackCorrect:
      'Tepat! A₂/A₁ = 10, sehingga F₂ = 15 N × 10 = 150 N.',
    feedbackWrong:
      'Periksa kembali. Gunakan F₁/A₁ = F₂/A₂, sehingga F₂ = F₁ × (A₂/A₁). Pastikan satuan luas konsisten.',
  },
  {
    id: 'q5',
    type: 'numeric',
    category: 'hitung',
    points: 1,
    question:
      'A₁ = 2 cm², F₁ = 10 N, dan A₂ = 50 cm². Berapa besar gaya keluaran F₂?',
    unit: 'N',
    answer: 250,
    tolerance: 1,
    hint: 'Bandingkan luas: A₂ adalah 25 kali A₁.',
    feedbackCorrect:
      'Tepat! F₂ = 10 N × (50/2) = 10 N × 25 = 250 N.',
    feedbackWrong:
      'Belum tepat. F₂ = F₁ × (A₂/A₁) = 10 × 25 = 250 N. Periksa kembali perbandingan luasnya.',
  },
  {
    id: 'q6',
    type: 'numeric',
    category: 'hitung',
    points: 1,
    question:
      'F₁ = 10 N, A₁ = 5 cm², dan gaya keluaran yang diinginkan F₂ = 120 N. Berapa luas piston keluaran A₂? (dalam cm²)',
    unit: 'cm²',
    answer: 60,
    tolerance: 0.5,
    hint: 'Susun ulang: A₂ = A₁ × (F₂ / F₁).',
    feedbackCorrect:
      'Tepat! A₂ = 5 cm² × (120/10) = 5 × 12 = 60 cm².',
    feedbackWrong:
      'Belum tepat. Dari F₁/A₁ = F₂/A₂ diperoleh A₂ = A₁ × (F₂/F₁) = 5 × 12 = 60 cm².',
  },
  {
    id: 'q7',
    type: 'mc',
    category: 'hitung',
    points: 1,
    question:
      'Pada rem hidrolik, pengemudi hanya memberi gaya kecil pada pedal. Mengapa gaya itu dapat menjadi cukup besar untuk menekan kampas rem?',
    options: [
      { id: 'a', label: 'Karena pedal rem memperbesar tekanan fluida menjadi dua kali lipat.' },
      { id: 'b', label: 'Karena fluida rem menciptakan gaya baru di dalam pipa.' },
      {
        id: 'c',
        label:
          'Karena gaya diteruskan melalui fluida dan bekerja pada piston rem yang luas penampangnya lebih besar.',
      },
      { id: 'd', label: 'Karena gaya gravitasi membantu mendorong fluida rem.' },
    ],
    correctId: 'c',
    feedbackCorrect:
      'Benar. Tekanan dari pedal diteruskan melalui fluida, lalu bekerja pada piston rem yang lebih luas sehingga gayanya menjadi lebih besar.',
    feedbackWrong:
      'Belum tepat. Fluida tidak menciptakan gaya baru. Gaya membesar karena tekanan yang sama bekerja pada luas penampang piston rem yang lebih besar.',
  },
  {
    id: 'q8',
    type: 'reasoning',
    category: 'penalaran',
    points: 1,
    question:
      'Apa yang terjadi pada gaya keluaran jika luas piston keluaran diperbesar, tetapi gaya masukan dan luas piston masukan tetap? Jelaskan alasannya.',
    keywords: [
      ['tekanan'],
      ['luas', 'area', 'penampang'],
      ['gaya', 'keluaran', 'output'],
      ['lebih besar', 'bertambah', 'meningkat', 'naik', 'membesar'],
    ],
    minKeywords: 3,
    modelAnswer:
      'Gaya keluaran akan bertambah besar. Tekanan yang diteruskan tetap sama, sedangkan luas piston keluaran bertambah. Karena F = P × A, dengan P tetap dan A bertambah, maka F juga bertambah.',
  },
  {
    id: 'q9',
    type: 'matching',
    category: 'penalaran',
    points: 1,
    question: 'Pasangkan besaran berikut dengan penjelasannya yang tepat.',
    pairs: [
      { term: 'Tekanan', match: 'Gaya yang bekerja pada setiap satuan luas' },
      { term: 'Gaya', match: 'Dorongan atau tarikan yang bekerja pada suatu benda' },
      { term: 'Luas penampang', match: 'Ukuran bidang tempat gaya bekerja' },
      {
        term: 'Hukum Pascal',
        match: 'Tekanan pada fluida tertutup diteruskan sama besar ke segala arah',
      },
    ],
    feedbackCorrect: 'Tepat! Kamu dapat membedakan tekanan, gaya, luas penampang, dan Hukum Pascal.',
    feedbackWrong:
      'Belum tepat. Ingat: tekanan = gaya per satuan luas, dan Hukum Pascal berbicara tentang tekanan yang diteruskan sama besar.',
  },
  {
    id: 'q10',
    type: 'reasoning',
    category: 'penalaran',
    points: 1,
    question:
      'Sebuah dongkrak hidrolik mampu mengangkat mobil yang sangat berat dengan gaya tangan yang kecil. Apakah sistem hidrolik ini menciptakan energi? Jelaskan.',
    keywords: [
      ['tidak', 'bukan', 'tak', 'nggak'],
      ['energi', 'usaha'],
      ['jarak', 'perpindahan', 'gerak', 'langkah'],
      ['pendek', 'kecil', 'sedikit', 'jauh', 'panjang'],
    ],
    minKeywords: 3,
    modelAnswer:
      'Tidak. Sistem hidrolik tidak menciptakan energi. Gaya keluaran memang lebih besar, tetapi piston besar hanya bergerak naik dengan jarak yang lebih pendek. Pada sistem ideal, usaha F × d kira-kira tetap, sehingga tidak ada energi yang muncul dari ketiadaan.',
  },
];