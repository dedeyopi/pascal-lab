// src/components/Hero.tsx
import { HeroHydraulicArt } from './Illustrations';

interface HeroProps {
  onStart: () => void;
  onSeeMap: () => void;
  hasProgress: boolean;
}

export function Hero({ onStart, onSeeMap, hasProgress }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Teks */}
          <div className="animate-riseIn">
            <span className="chip mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" aria-hidden="true" />
              Laboratorium Virtual IPA · Fase D
            </span>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              PASCAL
              <span className="bg-gradient-to-r from-electric via-aqua to-grape bg-clip-text text-transparent">
                {' '}
                LAB
              </span>
            </h1>

            <p className="mt-3 text-lg font-bold tracking-tight text-aqua sm:text-xl">
              Misi Mengungkap Rahasia Tekanan
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              “Bagaimana gaya kecil dapat membantu mengangkat benda yang sangat berat?”
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
              Di laboratorium ini kamu tidak akan membaca teori terlebih dahulu. Kamu akan mengamati,
              memprediksi, bereksperimen, menemukan pola, lalu menyusun penjelasanmu sendiri tentang Hukum
              Pascal.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="btn-primary text-base" onClick={onStart}>
                {hasProgress ? '▶ LANJUTKAN EKSPERIMEN' : '🚀 MULAI EKSPERIMEN'}
              </button>
              <button type="button" className="btn-ghost text-base" onClick={onSeeMap}>
                🗺️ LIHAT PETA MISI
              </button>
            </div>

            <dl className="mt-9 grid grid-cols-3 gap-3 border-t border-white/8 pt-6">
              {[
                { k: '7', v: 'Misi Investigasi' },
                { k: '3', v: 'Percobaan Interaktif' },
                { k: '10', v: 'Tantangan Akhir' },
              ].map((s) => (
                <div key={s.v}>
                  <dd className="font-mono text-2xl font-extrabold text-white sm:text-3xl">{s.k}</dd>
                  <dt className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {s.v}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Ilustrasi */}
          <div className="relative animate-riseIn [animation-delay:120ms]">
            <div className="glass-strong relative overflow-hidden p-4 sm:p-6">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-grape/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <span className="label-text">Diagram Sistem Hidrolik</span>
                  <span className="chip !px-2 !py-0.5 !text-[9px]">P₁ = P₂</span>
                </div>
                <HeroHydraulicArt />
              </div>
            </div>

            <div className="glass absolute -bottom-5 left-4 right-4 flex items-center gap-3 px-4 py-3 sm:left-8 sm:right-8">
              <span className="text-lg" aria-hidden="true">
                💡
              </span>
              <p className="text-xs leading-snug text-slate-300">
                Tekanan yang sama, luas yang lebih besar, gaya yang lebih besar.
              </p>
            </div>
          </div>
        </div>

        {/* Alur pembelajaran */}
        <section className="mt-20" aria-labelledby="alur-heading">
          <h2 id="alur-heading" className="label-text mb-4">
            Alur Investigasi
          </h2>
          <ol className="flex flex-wrap gap-2">
            {[
              'Prediksi',
              'Eksperimen',
              'Observasi',
              'Temukan Pola',
              'Jelaskan',
              'Terapkan',
              'Refleksi',
            ].map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-slate-300"
              >
                <span className="font-mono text-[10px] font-bold text-aqua">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step}
                {i < 6 && <span className="ml-1 text-slate-600" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}