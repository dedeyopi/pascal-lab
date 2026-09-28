// src/missions/Mission05.tsx
import { useMemo, useState } from 'react';
import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { HydraulicSimulator } from '../components/HydraulicSimulator';
import { UnitConverter } from '../components/UnitConverter';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { Slider } from '../components/Slider';
import { ConceptCard } from '../components/ConceptCard';
import { useLab } from '../state/LabContext';
import { fmt } from '../lib/physics';

interface Props {
  onNext: () => void;
  onBackToMap: () => void;
}

export function Mission05({ onNext, onBackToMap }: Props) {
  const meta = MISSIONS[4];
  const { completeMission, awardBadge } = useLab();

  const [A1, setA1] = useState(5);
  const [A2, setA2] = useState(100);
  const [F1, setF1] = useState(20);
  const [step, setStep] = useState(0);

  const ratio = A2 / A1;
  const F2 = F1 * ratio;

  const steps = useMemo(
    () => [
      {
        title: 'LANGKAH 1 — Tulis persamaannya',
        content: (
          <div className="rounded-xl border border-white/10 bg-navy-900/60 px-4 py-3 font-mono text-sm text-aqua">
            F₁ / A₁ = F₂ / A₂
          </div>
        ),
      },
      {
        title: 'LANGKAH 2 — Substitusikan nilainya',
        content: (
          <div className="rounded-xl border border-white/10 bg-navy-900/60 px-4 py-3 font-mono text-sm text-slate-200">
            {fmt(F1, 0)} N / {fmt(A1, 0)} cm² = F₂ / {fmt(A2, 0)} cm²
          </div>
        ),
      },
      {
        title: 'LANGKAH 3 — Hitung hasilnya',
        content: (
          <div className="space-y-2">
            <div className="rounded-xl border border-white/10 bg-navy-900/60 px-4 py-3 font-mono text-sm text-slate-200">
              F₂ = F₁ × (A₂ / A₁)
              <br />
              F₂ = {fmt(F1, 0)} × ({fmt(A2, 0)} / {fmt(A1, 0)})
              <br />
              F₂ = {fmt(F1, 0)} × {fmt(ratio, 2)}
            </div>
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] px-4 py-3 font-mono text-base font-bold text-emerald-200">
              F₂ = {fmt(F2, 2)} N
            </div>
          </div>
        ),
      },
      {
        title: 'LANGKAH 4 — Artikan hasilnya',
        content: (
          <FeedbackPanel status="correct" title="Interpretasi:">
            Dengan menekan {fmt(F1, 0)} N pada piston kecil seluas {fmt(A1, 0)} cm², sistem menghasilkan gaya{' '}
            {fmt(F2, 0)} N pada piston besar seluas {fmt(A2, 0)} cm². Gaya keluaran menjadi{' '}
            {fmt(ratio, 1)} kali lebih besar, karena luas piston keluaran {fmt(ratio, 1)} kali lebih besar.
            Tekanannya sendiri tetap sama di kedua piston.
          </FeedbackPanel>
        ),
      },
    ],
    [F1, A1, A2, F2, ratio]
  );

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={() => {
        completeMission(5, 30, 'engineer');
        onNext();
      }}
      nextLabel="LANJUT KE MISI 06 →"
      nextDisabled={step < 4}
    >
      <ConceptCard icon="⚙️" title="Tantangan Desain" tone="info">
        <p>
          Kamu adalah seorang insinyur yang sedang merancang sistem pengangkat hidrolik sederhana untuk
          bengkel sekolah. Tentukan ukuran piston, lalu hitung gaya angkat yang dihasilkan sistemmu.
        </p>
      </ConceptCard>

      <section className="glass-strong p-4 sm:p-6">
        <p className="label-text mb-4">Panel Desain Insinyur</p>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <Slider
              label="Luas piston masukan"
              symbol="A₁"
              value={A1}
              min={1}
              max={20}
              step={1}
              unit="cm²"
              thumbColor="#2f7bff"
              onChange={setA1}
            />
            <Slider
              label="Luas piston keluaran"
              symbol="A₂"
              value={A2}
              min={10}
              max={200}
              step={5}
              unit="cm²"
              thumbColor="#8b5cf6"
              onChange={setA2}
            />
            <Slider
              label="Gaya yang kamu berikan"
              symbol="F₁"
              value={F1}
              min={5}
              max={100}
              step={5}
              unit="N"
              thumbColor="#22d3ee"
              onChange={setF1}
            />

            <div className="grid grid-cols-3 gap-2">
              <div className="readout">
                <p className="readout-label">A₂ : A₁</p>
                <p className="font-mono text-sm font-bold text-aqua">{fmt(ratio, 1)}×</p>
              </div>
              <div className="readout">
                <p className="readout-label">F₁</p>
                <p className="font-mono text-sm font-bold text-electric-light">{fmt(F1, 0)} N</p>
              </div>
              <div className="readout">
                <p className="readout-label">F₂</p>
                <p className="font-mono text-sm font-bold text-grape-light">{fmt(F2, 0)} N</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-navy-900/40 p-3">
            <HydraulicSimulator F1={F1} A1={A1} A2={A2} showReadouts={false} />
          </div>
        </div>
      </section>

      <UnitConverter />

      <section className="glass p-5 sm:p-6">
        <p className="label-text mb-3">Solusi Terbimbing</p>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Jangan langsung melihat jawabannya. Coba hitung dulu di bukumu, lalu buka langkah satu per satu
          untuk memeriksa pekerjaanmu.
        </p>

        <div className="space-y-2">
          {steps.map((s, i) => (
            <div key={s.title}>
              <button
                type="button"
                onClick={() => setStep((v) => Math.max(v, i + 1))}
                disabled={i > step}
                className={[
                  'flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                  i < step
                    ? 'border-white/12 bg-white/[0.04]'
                    : i === step
                      ? 'border-aqua/50 bg-aqua/[0.08]'
                      : 'border-white/8 bg-white/[0.02] opacity-50',
                ].join(' ')}
              >
                <span className="text-sm font-bold text-white">{s.title}</span>
                <span className="text-xs font-semibold text-aqua">
                  {i < step ? '✓' : i === step ? 'Buka' : '🔒'}
                </span>
              </button>
              {i < step && <div className="mt-2">{s.content}</div>}
            </div>
          ))}
        </div>

        {step >= 4 && (
          <div className="mt-5">
            <FeedbackPanel status="correct" title="Pertanyaan refleksi desain:">
              Apakah memperbesar piston keluaran selalu berarti sistem menjadi lebih baik? Pikirkan tentang
              jarak perpindahan piston dan ukuran fisik alat yang dibutuhkan. Sistem yang terlalu besar bisa
              memakan ruang dan membutuhkan lebih banyak fluida.
            </FeedbackPanel>
          </div>
        )}
      </section>
    </MissionShell>
  );
}