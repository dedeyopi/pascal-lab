// src/components/TopBar.tsx
import { useLab } from '../state/LabContext';
import { BADGE_LIST } from '../data/badges';

interface TopBarProps {
  onOpenMap: () => void;
  onOpenResult?: () => void;
}

export function TopBar({ onOpenMap, onOpenResult }: TopBarProps) {
  const { state, progressPercent } = useLab();
  const earned = BADGE_LIST.filter((b) => state.badges.includes(b.id)).length;

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onOpenMap}
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
          aria-label="Kembali ke Peta Misi"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric to-aqua text-base font-black text-navy-950">
            P
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-extrabold leading-none tracking-wide text-white">
              PASCAL LAB
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-aqua">
              Science Investigator
            </span>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {state.student && (
            <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 md:flex">
              <span className="text-sm" aria-hidden="true">
                🧑‍🔬
              </span>
              <span className="max-w-[140px] truncate text-xs font-semibold text-white">
                {state.student.name}
              </span>
              <span className="text-[11px] text-slate-400">{state.student.className}</span>
            </div>
          )}

          <div
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5"
            aria-label={`Total XP ${state.xp}`}
          >
            <span className="text-sm" aria-hidden="true">
              ⚡
            </span>
            <span className="font-mono text-xs font-bold text-aqua">{state.xp}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">XP</span>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 sm:flex">
            <span className="text-sm" aria-hidden="true">
              🏅
            </span>
            <span className="font-mono text-xs font-bold text-grape-light">
              {earned}/{BADGE_LIST.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="h-2 w-16 overflow-hidden rounded-full bg-white/10 sm:w-24"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Kemajuan misi"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric to-aqua transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-400">{progressPercent}%</span>
          </div>

          {onOpenResult && state.completedMissions.length > 0 && (
            <button type="button" onClick={onOpenResult} className="btn-quiet hidden !px-3 !py-2 lg:inline-flex">
              Hasil
            </button>
          )}
        </div>
      </div>
    </header>
  );
}