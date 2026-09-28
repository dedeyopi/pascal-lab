// src/components/BadgeCard.tsx
import { BADGES } from '../data/badges';

interface BadgeCardProps {
  badgeId: string;
  earned: boolean;
  compact?: boolean;
}

export function BadgeCard({ badgeId, earned, compact = false }: BadgeCardProps) {
  const badge = BADGES[badgeId];
  if (!badge) return null;

  return (
    <div
      className={[
        'flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all',
        earned
          ? 'border-aqua/35 bg-gradient-to-r from-aqua/12 to-electric/10'
          : 'border-white/8 bg-white/[0.02] opacity-45 grayscale',
      ].join(' ')}
      title={badge.desc}
    >
      <span className="text-xl" aria-hidden="true">
        {badge.icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-white">{badge.name}</p>
        {!compact && <p className="truncate text-[11px] text-slate-400">{badge.desc}</p>}
      </div>
      {earned && (
        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-aqua">
          Diraih
        </span>
      )}
    </div>
  );
}