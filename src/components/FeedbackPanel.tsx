// src/components/FeedbackPanel.tsx
interface FeedbackPanelProps {
  status: 'correct' | 'incorrect' | 'neutral';
  title?: string;
  children: React.ReactNode;
}

export function FeedbackPanel({ status, title, children }: FeedbackPanelProps) {
  const styles =
    status === 'correct'
      ? 'border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-100'
      : status === 'incorrect'
        ? 'border-amber-400/35 bg-amber-400/[0.08] text-amber-100'
        : 'border-white/12 bg-white/[0.04] text-slate-200';

  const icon = status === 'correct' ? '✅' : status === 'incorrect' ? '💡' : 'ℹ️';

  return (
    <div
      className={`animate-riseIn rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}
      role="status"
      aria-live="polite"
    >
      <span className="mr-1.5 font-semibold" aria-hidden="true">
        {icon}
      </span>
      {title && <span className="font-semibold">{title} </span>}
      {children}
    </div>
  );
}