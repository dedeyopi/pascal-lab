// src/missions/MissionShell.tsx
import type { MissionMeta } from '../data/missions';
import { PHASE_LABEL } from '../data/missions';
import { useLab } from '../state/LabContext';

interface MissionShellProps {
  meta: MissionMeta;
  children: React.ReactNode;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  onBackToMap?: () => void;
}

export function MissionShell({
  meta,
  children,
  onNext,
  nextLabel = 'LANJUT KE MISI BERIKUTNYA →',
  nextDisabled = false,
  onBackToMap,
}: MissionShellProps) {
  const { state } = useLab();
  const done = state.completedMissions.includes(meta.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="Navigasi misi" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={onBackToMap}
          className="rounded-lg px-2 py-1 font-semibold text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-aqua
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
        >
          ← Peta Misi
        </button>
        <span aria-hidden="true">/</span>
        <span className="font-mono font-bold text-slate-400">MISI {meta.code}</span>
        {done && <span className="text-emerald-400">✓ Selesai</span>}
      </nav>

      <header className="mb-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="chip">{PHASE_LABEL[meta.phase]}</span>
          <span className="chip">
            ⏱ {meta.duration}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-aqua/30 bg-aqua/[0.08] text-2xl"
            aria-hidden="true"
          >
            {meta.icon}
          </span>
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-aqua">MISI {meta.code}</p>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
              {meta.title}
            </h1>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-electric/20 bg-electric/[0.06] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-electric-light">
            Tujuan Misi
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{meta.objective}</p>
        </div>
      </header>

      <div className="space-y-5">{children}</div>

      {onNext && (
        <div className="sticky bottom-4 z-30 mt-8">
          <div className="glass-strong flex flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-slate-400">
              {nextDisabled
                ? 'Selesaikan seluruh langkah misi ini terlebih dahulu.'
                : 'Kerja bagus! Kamu siap melanjutkan.'}
            </p>
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={onNext} disabled={nextDisabled}>
              {nextLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}