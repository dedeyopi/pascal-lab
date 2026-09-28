// src/state/LabContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  Confidence,
  ExperimentRow,
  LabState,
  QuizAnswer,
  StudentProfile,
} from '../types';

const STORAGE_KEY = 'pascal-lab-progress-v1';

const initialState: LabState = {
  student: null,
  currentMission: 1,
  completedMissions: [],
  xp: 0,
  badges: [],
  predictions: {},
  experimentData: [],
  quizAnswers: [],
  quizScore: 0,
  quizTotal: 0,
  reflection: { answers: {}, confidence: null },
  startedAt: null,
};

function loadState(): LabState {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<LabState>;
    return {
      ...initialState,
      ...parsed,
      reflection: { ...initialState.reflection, ...(parsed.reflection ?? {}) },
      predictions: { ...(parsed.predictions ?? {}) },
      experimentData: parsed.experimentData ?? [],
      quizAnswers: parsed.quizAnswers ?? [],
      completedMissions: parsed.completedMissions ?? [],
      badges: parsed.badges ?? [],
    };
  } catch {
    return initialState;
  }
}

interface LabContextValue {
  state: LabState;
  setStudent: (s: StudentProfile) => void;
  setCurrentMission: (id: number) => void;
  completeMission: (id: number, xpGain?: number, badge?: string) => void;
  addXP: (amount: number) => void;
  awardBadge: (badge: string) => void;
  savePrediction: (key: string, value: string) => void;
  addExperimentRow: (row: ExperimentRow) => void;
  clearExperimentData: () => void;
  removeExperimentRow: (id: string) => void;
  recordQuizAnswer: (a: QuizAnswer) => void;
  setQuizSummary: (score: number, total: number) => void;
  resetQuiz: () => void;
  setReflectionAnswer: (id: string, value: string) => void;
  setConfidence: (c: Confidence) => void;
  resetAll: () => void;
  progressPercent: number;
}

const LabContext = createContext<LabContextValue | null>(null);

export function LabProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LabState>(() => loadState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage penuh atau tidak tersedia — abaikan */
    }
  }, [state]);

  const setStudent = useCallback((student: StudentProfile) => {
    setState((s) => ({ ...s, student, startedAt: s.startedAt ?? Date.now() }));
  }, []);

  const setCurrentMission = useCallback((id: number) => {
    setState((s) => ({ ...s, currentMission: id }));
  }, []);

  const completeMission = useCallback((id: number, xpGain = 0, badge?: string) => {
    setState((s) => {
      const already = s.completedMissions.includes(id);
      return {
        ...s,
        completedMissions: already
          ? s.completedMissions
          : [...s.completedMissions, id].sort((a, b) => a - b),
        xp: already ? s.xp : s.xp + xpGain,
        badges: badge && !s.badges.includes(badge) ? [...s.badges, badge] : s.badges,
      };
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setState((s) => ({ ...s, xp: s.xp + amount }));
  }, []);

  const awardBadge = useCallback((badge: string) => {
    setState((s) => (s.badges.includes(badge) ? s : { ...s, badges: [...s.badges, badge] }));
  }, []);

  const savePrediction = useCallback((key: string, value: string) => {
    setState((s) =>
      s.predictions[key] !== undefined
        ? s
        : { ...s, predictions: { ...s.predictions, [key]: value } }
    );
  }, []);

  const addExperimentRow = useCallback((row: ExperimentRow) => {
    setState((s) => ({ ...s, experimentData: [...s.experimentData, row] }));
  }, []);

  const clearExperimentData = useCallback(() => {
    setState((s) => ({ ...s, experimentData: [] }));
  }, []);
  
 const removeExperimentRow = useCallback((id: string) => {
  setState((s) => ({
    ...s,
    experimentData: s.experimentData.filter((r) => r.id !== id),
  }));
}, []);

  const recordQuizAnswer = useCallback((a: QuizAnswer) => {
    setState((s) => {
      const others = s.quizAnswers.filter((x) => x.questionId !== a.questionId);
      return { ...s, quizAnswers: [...others, a] };
    });
  }, []);

  const setQuizSummary = useCallback((score: number, total: number) => {
    setState((s) => ({ ...s, quizScore: score, quizTotal: total }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState((s) => ({ ...s, quizAnswers: [], quizScore: 0, quizTotal: 0 }));
  }, []);

  const setReflectionAnswer = useCallback((id: string, value: string) => {
    setState((s) => ({
      ...s,
      reflection: { ...s.reflection, answers: { ...s.reflection.answers, [id]: value } },
    }));
  }, []);

  const setConfidence = useCallback((confidence: Confidence) => {
    setState((s) => ({ ...s, reflection: { ...s.reflection, confidence } }));
  }, []);

  const resetAll = useCallback(() => {
    setState(initialState);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* abaikan */
    }
  }, []);

  const progressPercent = useMemo(
    () => Math.round((state.completedMissions.length / 7) * 100),
    [state.completedMissions]
  );

  const value: LabContextValue = {
    state,
    setStudent,
    setCurrentMission,
    completeMission,
    addXP,
    awardBadge,
    savePrediction,
    addExperimentRow,
    clearExperimentData,
    removeExperimentRow,
    recordQuizAnswer,
    setQuizSummary,
    resetQuiz,
    setReflectionAnswer,
    setConfidence,
    resetAll,
    progressPercent,
  };

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}

export function useLab(): LabContextValue {
  const ctx = useContext(LabContext);
  if (!ctx) throw new Error('useLab harus dipakai di dalam <LabProvider>');
  return ctx;
}