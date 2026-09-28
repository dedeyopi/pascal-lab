// src/missions/Mission04.tsx
import { useState } from 'react';
import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { ExperimentDataTable } from '../components/ExperimentDataTable';
import { FormulaCard } from '../components/FormulaCard';
import { ConceptCard } from '../components/ConceptCard';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { useLab } from '../state/LabContext';
import { fmt } from '../lib/physics';

interface Props {
  onNext: () => void;
  onBackToMap: () => void;
}

export function Mission04({ onNext, onBackToMap }: Props) {
  const meta = MISSIONS[3];
  const { state, completeMission, awardBadge, clearExperimentData, removeExperimentRow } = useLab();
  const [step, setStep] = useState(0);

  const rows = state.experimentData;
  const hasData = rows.length > 0;
  const first = rows[0];

  const steps = [
    {
      key: 'p1',
      title: 'Langkah 1 — Hitung P₁',
      body: hasData ? (
        <>
          <p>
            Ambil satu baris datamu. Misalnya F₁ = {fmt(first.F1, 1)} N dan A₁ = {fmt(first.A1, 1)} cm².
            Ubah dulu luas ke m²: {fmt(first.A1, 1)} cm² = {fmt(first.A1 / 10000, 5)} m².
          </p>
          <div className="mt-3 rounded-xl border border-white/10 bg-navy-900/60 px-4 py-3 font-mono text-sm text-aqua">
            P₁ = F₁ / A₁ = {fmt(first.F1, 1)} N ÷ {fmt(first.A1 / 10000, 5)} m² = {fmt(first.P1, 0)} Pa
          </div>
        </>
      ) : (
        <p>Belum ada data. Kembali ke Misi 03 dan catat minimal satu data percobaan.</p>
      ),
    },
    {
      key: 'p2',
      title: 'Langkah 2 — Hitung P₂',
      body: hasData ? (
        <>
          <p>
            Sekarang hitung tekanan di piston B dengan cara yang sama, menggunakan F₂ dan A₂ dari baris data
            yang sama.
          </p>
          <div className="mt-3 rounded-xl border border-white/10 bg-navy-900/60 px-4 py-3 font-mono text-sm text-grape-light">
            P₂ = F₂ / A₂ = {fmt(first.F2, 1)} N ÷ {fmt(first.A2 / 10000, 5)} m² = {fmt(first.P2, 0)} Pa
          </div>
        </>
      ) : (
        <p>Data masih kosong.</p>
      ),
    },
    {
      key: 'cmp',
      title: 'Langkah 3 — Bandingkan P₁ dan P₂',
      body: hasData ? (
        <>
          <p>Bandingkan kedua nilai yang baru saja kamu hitung.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="readout border-aqua/25 bg-aqua/[0.06]">
              <p className="readout-label">P₁</p>
              <p className="font-mono text-base font-bold text-aqua">{fmt(first.P1, 0)} Pa</p>
            </div>
            <div className="readout border-grape/25 bg-grape/[0.06]">
              <p className="readout-label">P₂</p>
              <p className="font-mono text-base font-bold text-grape-light">{fmt(first.P2, 0)} Pa</p>
            </div>
          </div>
          <div className="mt-3">
            <FeedbackPanel status="correct" title="Apa yang kamu lihat?">
              P₁ dan P₂ nilainya sama. Tekanan di piston kecil dan piston besar ternyata sama besar.
            </FeedbackPanel>
          </div>
        </>
      ) : (
        <p>Data masih kosong.</p>
      ),
    },
  ];

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={() => {
        completeMission(4, 25, 'pascal');
        onNext();
      }}
      nextLabel="LANJUT KE MISI 05 →"
      nextDisabled={step < 3}
    >
      <ConceptCard icon="🔍" title="Apa yang Ditemukan?" tone="violet">
        <p>
          Sekarang saatnya membaca datamu sendiri. Jangan terburu-buru — ikuti tiga langkah berikut untuk
          menemukan pola yang tersembunyi di dalam tabel.
        </p>
      </ConceptCard>

     <ExperimentDataTable
  rows={rows}
  highlightPressure
  onClear={clearExperimentData}
  onRemove={removeExperimentRow}
/>

      {hasData && (
        <section className="glass p-5 sm:p-6">
          <p className="label-text mb-3">Penemuan Terbimbing</p>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={s.key}>
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
                        ? 'border-aqua/50 bg-aqua/[0.08] cursor-pointer'
                        : 'border-white/8 bg-white/[0.02] opacity-50',
                  ].join(' ')}
                >
                  <span className="text-sm font-bold text-white">{s.title}</span>
                  <span className="text-xs font-semibold text-aqua">
                    {i < step ? '✓ Terbuka' : i === step ? 'Klik untuk membuka' : '🔒'}
                  </span>
                </button>
                {i < step && <div className="mt-2 pl-1 text-sm leading-relaxed text-slate-300">{s.body}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {step >= 3 && (
        <>
          <section className="glass-strong animate-riseIn border-aqua/30 p-5 sm:p-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-aqua">
              Kesimpulan Ilmiah
            </p>
            <h2 className="mb-3 text-lg font-extrabold text-white">Hukum Pascal</h2>
            <blockquote className="rounded-xl border-l-4 border-aqua bg-aqua/[0.06] px-4 py-3 text-sm leading-relaxed text-slate-200">
              “Tekanan yang diberikan pada fluida dalam ruang tertutup diteruskan ke segala arah dengan besar
              yang sama.”
            </blockquote>
          </section>

          <FormulaCard
            title="Bentuk Matematis Hukum Pascal"
            question="Jika tekanannya sama di kedua piston, bagaimana kita menuliskannya?"
            formula={
              <div className="flex flex-col items-center gap-2">
                <span>P₁ = P₂</span>
                <span className="text-aqua">↓</span>
                <span className="text-lg sm:text-2xl">F₁ / A₁ = F₂ / A₂</span>
              </div>
            }
            meaning={[
              { symbol: 'F₁', text: 'Gaya pada piston masukan (N)' },
              { symbol: 'A₁', text: 'Luas penampang piston masukan (m²)' },
              { symbol: 'F₂', text: 'Gaya pada piston keluaran (N)' },
              { symbol: 'A₂', text: 'Luas penampang piston keluaran (m²)' },
            ]}
            note={
              <p>
                Dari bentuk ini kita bisa menyusun ulang menjadi{' '}
                <span className="font-mono text-slate-200">F₂ = F₁ × (A₂ / A₁)</span>. Perhatikan: yang
                diperbesar adalah <strong className="text-slate-200">gaya</strong>, bukan tekanan.
              </p>
            }
          />

          <ConceptCard icon="💡" title="Mengapa Gaya Bisa Menjadi Lebih Besar?" tone="success">
            <p>
              Jika tekanan diteruskan sama besar, maka memperbesar luas piston keluaran membuat gaya keluaran
              menjadi lebih besar. Perhatikan perbedaannya:
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Piston kecil: luas kecil, tekanan sama → gaya kecil.</li>
              <li>• Piston besar: luas besar, tekanan sama → gaya besar.</li>
            </ul>
            <p className="mt-2 font-semibold text-aqua">
              Yang diperbesar bukan tekanannya, tetapi gaya keluaran dapat menjadi lebih besar karena luas
              piston keluaran lebih besar.
            </p>
          </ConceptCard>

          <section className="glass p-5 sm:p-6">
            <p className="label-text mb-3">Cek Miskonsepsi</p>
            <div className="space-y-3">
              {[
                {
                  salah: 'Tekanan menjadi lebih besar pada piston besar.',
                  benar:
                    'Pada sistem hidrolik ideal, tekanan diteruskan sama besar. Gaya keluaran yang menjadi lebih besar karena luas piston keluaran lebih besar.',
                },
                {
                  salah: 'Fluida menghasilkan energi.',
                  benar:
                    'Sistem tidak menciptakan energi dari ketiadaan. Gaya keluaran lebih besar, tetapi piston besar bergerak dengan jarak yang lebih pendek.',
                },
                {
                  salah: 'Tekanan bergerak dari piston kecil ke piston besar.',
                  benar:
                    'Tekanan yang diberikan diteruskan melalui fluida tertutup ke segala arah — bukan “mengalir” seperti aliran air.',
                },
              ].map((m) => (
                <div key={m.salah} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-amber-200">
                    <span className="font-bold">Miskonsepsi:</span> {m.salah}
                  </p>
                  <p className="mt-1.5 text-sm text-emerald-200">
                    <span className="font-bold">Koreksi:</span> {m.benar}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Mode Peneliti — pengayaan opsional */}
          <details className="glass group p-5 sm:p-6">
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-bold text-grape-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua">
              <span aria-hidden="true">🔬</span>
              MODE PENELITI (Opsional) — Apakah kita mendapatkan keuntungan gaya secara gratis?
            </summary>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <p>
                Saat piston kecil didorong turun, ia bergerak sejauh d₁. Fluida yang berpindah volumenya sama
                dengan yang mengisi silinder besar, sehingga:
              </p>
              <div className="rounded-xl border border-grape/25 bg-grape/[0.06] px-4 py-3 text-center font-mono text-base text-grape-light">
                A₁ × d₁ ≈ A₂ × d₂
              </div>
              <p>
                Karena A₂ jauh lebih besar daripada A₁, maka d₂ menjadi jauh lebih kecil daripada d₁. Piston
                besar memang menghasilkan gaya yang besar, tetapi hanya bergerak naik dengan jarak yang sangat
                pendek.
              </p>
              <div className="rounded-xl border border-white/12 bg-navy-900/60 px-4 py-3 text-center font-mono text-base text-aqua">
                F₁ × d₁ ≈ F₂ × d₂
              </div>
              <p>
                Jadi pada sistem hidrolik ideal, usaha kira-kira tetap. Kita memperoleh keuntungan gaya, tetapi
                “membayarnya” dengan jarak perpindahan yang lebih pendek. Tidak ada energi yang diciptakan.
              </p>
            </div>
          </details>
        </>
      )}
    </MissionShell>
  );
}