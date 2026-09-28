// src/types.ts
export interface StudentProfile {
  name: string;
  className: string;
}

export interface ExperimentRow {
  id: string;
  experiment: string;
  label: string;
  F1: number;
  A1: number;
  P1: number;
  A2: number;
  F2: number;
  P2: number;
}

export type Confidence = 'bingung' | 'mulai' | 'memahami' | 'sangat';

export type QuizCategory = 'konsep' | 'hitung' | 'penalaran';

export interface QuizAnswer {
  questionId: string;
  category: QuizCategory;
  correct: boolean;
  points: number;
  earned: number;
}

export interface ReflectionState {
  answers: Record<string, string>;
  confidence: Confidence | null;
}

export interface LabState {
  student: StudentProfile | null;
  currentMission: number;
  completedMissions: number[];
  xp: number;
  badges: string[];
  predictions: Record<string, string>;
  experimentData: ExperimentRow[];
  quizAnswers: QuizAnswer[];
  quizScore: number;
  quizTotal: number;
  reflection: ReflectionState;
  startedAt: number | null;
}

export interface BadgeDef {
  id: string;
  icon: string;
  name: string;
  desc: string;
}