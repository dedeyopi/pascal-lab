// src/missions/Mission03.tsx
import { useMemo, useState } from 'react';
import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { HydraulicSimulator } from '../components/HydraulicSimulator';
import { ExperimentControls, type ExperimentMode } from '../components/ExperimentControls';
import { ExperimentDataTable } from '../components/ExperimentDataTable';
import { PredictionCard } from '../components/PredictionCard';
import { ConceptCard } from '../components/ConceptCard';
import { useLab } from '../state/LabContext';
import { clamp, fmt, solveHydraulic } from '../lib/physics';

interface Props {
  onNext: () => void;
  onBackToMap: () => void;
}

const MODE_INFO: Record<ExperimentMode, { title: string; desc: string; keep: string; change: string }> = {
  A: {
    title: 'Percobaan A — Ubah Gaya Masukan',
    desc: 'A₁ dan A₂ dijaga tetap. Ubah F₁ dan amati F₂.',
    keep: 'A₁ tetap, A₂ tetap',
    change: 'F₁ diubah',
  },
  B: {
    title: 'Percobaan B — Ubah Luas Piston Besar',
    desc: 'F₁ dan A₁ dijaga tetap. Ubah A₂ dan amati F₂.',
    keep: 'F₁ tetap, A₁ tetap',
    change: 'A₂ diubah',
  },
  C: {
    title: 'Percobaan C — Ubah Luas Piston Kecil',
    desc: 'F₁ dan A₂ dijaga tetap. Ubah A₁ dan amati F₂.',
    keep: 'F₁ tetap, A₂ tetap',
    change: 'A₁ diubah',
  },
  FREE: {
    title: 'Mode Bebas — Jelajahi Sendiri',
    desc: 'Semua variabel dapat diubah sesukamu.',
    keep: '—',
    change: 'Semua variabel',
  },
};

const PREDICTION_OPTIONS = {
  A: [
    { id: 'a', label: 'A. F₂ bertambah besar ketika F₁ bertambah besar.' },
    { id: 'b', label: 'B. F₂ tidak berubah karena luasnya tetap.' },
    { id: 'c', label: 'C. F₂ mengecil karena fluida makin tertekan.' },
  ],
  B: [
    { id: 'a', label: 'A. F₂ bertambah besar sebanding dengan pertambahan A₂.' },
    { id: 'b', label: 'B. F₂ tetap karena tekanannya tetap.' },
    { id: 'c', label: 'C. F₂ mengecil karena piston besar lebih berat.' },
  ],
  C: [
    { id: 'a', label: 'A. F₂ bertambah besar ketika A₁ diperkecil.' },
    { id: 'b', label: 'B. F₂ tidak berubah.' },
    { id: 'c', label: 'C. F₂ mengecil ketika A₁ diperkecil.' },
  ],
};

const CORRECT = { A: 'a', B: 'a', C: 'a' } as const;

export function Mission03({ onNext, onBackToMap }: Props) {
  const meta = MISSIONS[2];
  const {
  state,
  completeMission,
  addExperimentRow,
  addXP,
  savePrediction,
  clearExperimentData,
  removeExperimentRow,
} = useLab();

  const [mode, setMode] = useState<ExperimentMode>('A');
  const [F1, setF1] = useState(60);
  const [A1, setA1] = useState(5);
  const [A2, setA2] = useState(50);

  // Nilai efektif sesuai mode
  const eff = useMemo(() => {
    switch (mode) {
      case 'A':
        return { F1, A1: 5, A2: 50 };
      case 'B':
        return { F1: 100, A1: 5, A2 };
      case 'C':
        return { F1: 100, A1, A2: 100 };
      default:
        return { F1, A1, A2 };
    }
  }, [mode, F1, A1, A2]);

  const locked = {
    F1: mode === 'B' || mode === 'C',
    A1: mode === 'A' || mode === 'B' || mode === 'C',
    A2: mode === 'A' || mode === 'C',
  };

  const { F2 } = useMemo(() => solveHydraulic(eff.F1, eff.A1, eff.A2), [eff]);

  const predKey = `m3-${mode}`;
  const hasPrediction = mode === 'FREE' || state.predictions[predKey] !== undefined;
  const rowsForMode = state.experimentData.filter((r) => r.experiment === mode);
  const recordedThisMode = rowsForMode.length > 0;

  const handleRecord = () => {
    if (!hasPrediction) return;
    const r = solveHydraulic(eff.F1, eff.A1, eff.A2);
    addExperimentRow({
      id: `${mode}-${Date.now()}`,
      experiment: mode === 'FREE' ? 'Bebas' : mode,
      label: `F₁=${fmt(eff.F1, 0)}N, A₁=${fmt(eff.A1, 0)}cm², A₂=${fmt(eff.A2, 0)}cm²`,
      F1: eff.F1,
      A1: eff.A1,
      P1: r.P1,
      A2: eff.A2,
      F2: r.F2,
      P2: r.P2,
    });
    if (mode !== 'FREE' && rowsForMode.length === 0) addXP(20);
    if (mode === 'FREE') addXP(5);
  };

  const handleReset = () => {
    setF1(60);
    setA1(5);
    setA2(50);
  };

  const handleModeChange = (m: ExperimentMode) => {
    setMode(m);
    if (m === 'A') {
      setF1(60);
      setA1(5);
      setA2(50);
    } else if (m === 'B') {
      setF1(100);
      setA1(5);
      setA2(50);
    } else if (m === 'C') {
      setF1(100);
      setA1(5);
      setA2(100);
    }
  };

  const allModesDone = (['A', 'B', 'C'] as const).every((m) =>
    state.experimentData.some((r) => r.experiment === m)
  );

  const pressureQuestion = state.predictions['m3-pattern'];
  const patternOptions = [
    { id: 'p', label: 'A. Tekanan (P) pada kedua piston.' },
    { id: 'f', label: 'B. Gaya (F) pada kedua piston.' },
    { id: 'a', label: 'C. Luas penampang (A) pada kedua piston.' },
  ];

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={() => {
        completeMission(3, 40);
        onNext();
      }}
      nextLabel="LANJUT KE MISI 04 →"
      nextDisabled={!allModesDone || !pressureQuestion}
    >
      <ConceptCard icon="🧪" title="Alat Laboratorium" tone="info">
        <p>
          Ini adalah sistem dua piston yang dihubungkan oleh fluida tertutup. Piston A berukuran kecil,
          piston B berukuran besar. Kamu dapat mengubah <strong className="text-slate-200">F₁</strong>,{' '}
          <strong className="text-slate-200">A₁</strong>, dan <strong className="text-slate-200">A₂</strong>.
          Perhatikan bagaimana nilai P₁, P₂, dan F₂ berubah.
        </p>
      </ConceptCard>

      {/* Pemilih mode */}
      <section className="glass p-4 sm:p-5">
        <p className="label-text mb-3">Pilih Percobaan</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Mode percobaan">
          {(['A', 'B', 'C', 'FREE'] as ExperimentMode[]).map((m) => {
            const done = m !== 'FREE' && state.experimentData.some((r) => r.experiment === m);
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => handleModeChange(m)}
                className={[
                  'rounded-xl border px-3.5 py-3 text-left transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                  mode === m
                    ? 'border-aqua/60 bg-aqua/[0.10]'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25',
                ].join(' ')}
              >
                <span className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${mode === m ? 'text-aqua' : 'text-slate-300'}`}>
                    {m === 'FREE' ? 'MODE BEBAS' : `PERCOBAAN ${m}`}
                  </span>
                  {done && <span className="text-emerald-400" aria-label="sudah dicatat">✓</span>}
                </span>
                <span className="mt-1 block text-[11px] leading-snug text-slate-500">
                  {MODE_INFO[m].change}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {mode !== 'FREE' && (
        <PredictionCard
          predKey={predKey}
          question={
            mode === 'A'
              ? 'Jika gaya F₁ diperbesar sementara luas kedua piston tetap, apa yang terjadi pada F₂?'
              : mode === 'B'
                ? 'Jika luas piston B (A₂) diperbesar sementara tekanan tetap, apa yang terjadi pada gaya F₂?'
                : 'Jika luas piston A (A₁) diperkecil sementara F₁ dan A₂ tetap, apa yang terjadi pada F₂?'
          }
          xp={10}
          correctId={CORRECT[mode]}
          feedbackMap={{
            [CORRECT[mode]]: {
              ok: true,
              text:
                mode === 'A'
                  ? 'Tepat! Ketika F₁ bertambah, P₁ bertambah, sehingga P₂ juga bertambah dan F₂ = P₂ × A₂ ikut bertambah.'
                  : mode === 'B'
                    ? 'Tepat! Tekanan diteruskan sama besar, sehingga luas A₂ yang lebih besar menghasilkan F₂ yang lebih besar.'
                    : 'Tepat! A₁ yang lebih kecil membuat P₁ = F₁/A₁ lebih besar, sehingga P₂ dan F₂ juga bertambah besar.',
            },
            ...Object.fromEntries(
              Object.keys(PREDICTION_OPTIONS[mode])
                .filter((k) => k !== CORRECT[mode])
                .map((k) => [
                  k,
                  {
                    ok: false,
                    text: 'Belum tepat. Ingat bahwa tekanan pada kedua piston sama besar, lalu bandingkan F/A pada masing-masing piston.',
                  },
                ])
            ),
          }}
          options={PREDICTION_OPTIONS[mode]}
        />
      )}

      <section className="glass-strong p-4 sm:p-6">
        <div className="mb-4">
          <p className="label-text">{MODE_INFO[mode].title}</p>
          <p className="mt-1 text-sm text-slate-400">{MODE_INFO[mode].desc}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="chip !text-[9px]">Dijaga: {MODE_INFO[mode].keep}</span>
            <span className="chip !border-aqua/30 !text-[9px] !text-aqua">
              Diubah: {MODE_INFO[mode].change}
            </span>
          </div>
        </div>

        <HydraulicSimulator F1={eff.F1} A1={eff.A1} A2={eff.A2} highlight={mode === 'A' ? 'A' : mode === 'B' ? 'B' : mode === 'C' ? 'A' : null} />

        <div className="mt-5">
          <ExperimentControls
            mode={mode}
            F1={eff.F1}
            A1={eff.A1}
            A2={eff.A2}
            onF1={(v) => setF1(clamp(v, 1, 300))}
            onA1={(v) => setA1(clamp(v, 1, 40))}
            onA2={(v) => setA2(clamp(v, 5, 200))}
            locked={locked}
            onRecord={handleRecord}
            onReset={handleReset}
            canRecord={hasPrediction}
            recorded={recordedThisMode}
          />
        </div>

        {recordedThisMode && (
          <p className="mt-3 rounded-xl border border-electric/25 bg-electric/[0.06] px-4 py-3 text-sm text-slate-300">
            Gaya keluaran sekarang <span className="font-mono font-bold text-grape-light">{fmt(F2, 1)} N</span>.
            Bandingkan dengan data yang sudah kamu catat.
          </p>
        )}
      </section>

      <ExperimentDataTable
  rows={state.experimentData}
  onClear={clearExperimentData}
  onRemove={removeExperimentRow}
/>

      {allModesDone && (
        <PredictionCard
          predKey="m3-pattern"
          question="Menurutmu, apa yang tetap sama pada kedua piston?"
          xp={25}
          correctId="p"
          feedbackMap={{
            p: {
              ok: true,
              text: 'Tepat! Tekanan pada kedua piston sama besar. Gaya dan luas penampangnya berbeda, tetapi tekanannya tetap.',
            },
            f: {
              ok: false,
              text: 'Belum tepat. Gaya pada kedua piston justru berbeda — lihat kembali kolom F₁ dan F₂ pada tabelmu.',
            },
            a: {
              ok: false,
              text: 'Belum tepat. Luas penampang kedua piston jelas berbeda — itulah yang membuat gayanya berbeda.',
            },
          }}
          options={patternOptions}
        />
      )}
    </MissionShell>
  );
}