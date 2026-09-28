// src/components/MissionMap.tsx
import { MISSIONS } from '../data/missions';
import { MissionCard } from './MissionCard';
import { useLab } from '../state/LabContext';
import { BADGE_LIST } from '../data/badges';
import { BadgeCard } from './BadgeCard';

interface MissionMapProps {
  onOpenMission: (id: number) => void;
}

export function MissionMap({ onOpenMission }: MissionMapProps) {
  const { state, progressPercent } = useLab();

  const isUnlocked = (id: number) => {
    if (id === 1) return true;
    return state.completedMissions.includes(id - 1) || state.completedMissions.includes(id);
  };

  const nextMission =
    MISSIONS.find((m) => !state.completedMissions.includes(m.id)) ?? MISSIONS[MISSIONS.length - 1];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <span className="chip mb-3">Ruang Kendali</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Peta Misi</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
          Tujuh misi investigasi untuk mengungkap rahasia tekanan. Setiap misi dibuka setelah misi sebelumnya
          selesai.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="label-text">Kemajuan Investigasi</span>
              <span className="font-mono font-bold text-aqua">{progressPercent}%</span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Kemajuan investigasi"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric via-aqua to-grape transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => onOpenMission(nextMission.id)}
            disabled={state.completedMissions.length >= 7}
          >
            {state.completedMissions.length >= 7
              ? 'SEMUA MISI SELESAI'
              : state.completedMissions.length === 0
                ? '🚀 MULAI MISI 01'
                : `▶ LANJUTKAN MISI ${nextMission.code}`}
          </button>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {MISSIONS.map((meta) => {
            const done = state.completedMissions.includes(meta.id);
            const unlocked = isUnlocked(meta.id);
            const status = done ? 'done' : unlocked ? 'current' : 'locked';
            return (
              <MissionCard
                key={meta.id}
                meta={meta}
                status={status}
                onClick={() => unlocked && onOpenMission(meta.id)}
              />
            );
          })}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="glass p-5">
            <p className="label-text mb-3">Science Investigator</p>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-electric to-aqua text-xl">
                🧑‍🔬
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {state.student?.name ?? 'Investigator'}
                </p>
                <p className="truncate text-xs text-slate-400">
                  Kelas {state.student?.className ?? '—'}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-2 text-center">
              <Stat label="XP" value={String(state.xp)} tone="aqua" />
              <Stat label="Misi" value={`${state.completedMissions.length}/7`} tone="electric" />
              <Stat
                label="Lencana"
                value={`${BADGE_LIST.filter((b) => state.badges.includes(b.id)).length}/${BADGE_LIST.length}`}
                tone="grape"
              />
            </dl>
          </div>

          <div className="glass p-5">
            <p className="label-text mb-3">Lencana Investigator</p>
            <div className="space-y-2">
              {BADGE_LIST.map((b) => (
                <BadgeCard key={b.id} badgeId={b.id} earned={state.badges.includes(b.id)} compact />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  const colors: Record<string, string> = {
    aqua: 'text-aqua',
    electric: 'text-electric-light',
    grape: 'text-grape-light',
  };
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2.5">
      <dd className={`font-mono text-lg font-bold ${colors[tone]}`}>{value}</dd>
      <dt className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</dt>
    </div>
  );
}