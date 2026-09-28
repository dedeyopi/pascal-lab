// src/components/MissionCard.tsx
import type { MissionMeta } from '../data/missions';
import { PHASE_LABEL } from '../data/missions';

interface MissionCardProps {
  meta: MissionMeta;
  status: 'locked' | 'current' | 'done';
  onClick: () => void;
}

export function MissionCard({ meta, status, onClick }: MissionCardProps) {
  const locked = status === 'locked';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      aria-label={`Misi ${meta.code}: ${meta.title}${locked ? ' (terkunci)' : status === 'done' ? ' (selesai)' : ' (sedang berjalan)'}`}
      className={[
        'group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
        status === 'done'
  ? 'border-emerald-400/30 bg-gradient-to-br from-emerald-400/[0.09] to-transparent hover:border-emerald-400/50'
  : status === 'current'
    ? 'border-aqua/50 bg-gradient-to-br from-aqua/[0.12] via-electric/[0.07] to-transparent shadow-glow hover:brightness-110'
    : 'border-white/12 bg-navy-900/60 hover:border-white/20',
        !locked && 'cursor-pointer active:scale-[0.99]',
      ].join(' ')}
    >
      {status === 'current' && (
        <span className="absolute right-4 top-4 flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-aqua" />
        </span>
      )}

      <div className="flex items-start gap-4">
        <span
          className={[
            'grid h-12 w-12 shrink-0 place-items-center rounded-xl border text-xl',
            status === 'done'
              ? 'border-emerald-400/30 bg-emerald-400/10'
              : status === 'current'
                ? 'border-aqua/40 bg-aqua/10'
                : 'border-white/10 bg-white/[0.04]',
          ].join(' ')}
          aria-hidden="true"
        >
          {locked ? '🔒' : meta.icon}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-widest text-slate-500">
              MISI {meta.code}
            </span>
            <span className="chip !px-2 !py-0.5 !text-[9px]">{PHASE_LABEL[meta.phase]}</span>
            {status === 'done' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                ✓ Selesai
              </span>
            )}
          </div>

          <h3 className="text-base font-bold leading-snug text-white">{meta.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{meta.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span aria-hidden="true">⏱</span> {meta.duration}
            </span>
            {status === 'current' && (
              <span className="font-bold text-aqua">→ Lanjutkan misi ini</span>
            )}
          </div>
        </div>
      </div>

      {status === 'done' && (
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-aqua" aria-hidden="true" />
      )}
    </button>
  );
}