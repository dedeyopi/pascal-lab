// src/components/ConceptCard.tsx
interface ConceptCardProps {
  icon: string;
  title: string;
  tone?: 'info' | 'warn' | 'success' | 'violet';
  children: React.ReactNode;
}

const TONES: Record<string, string> = {
  info: 'border-electric/30 bg-electric/[0.07]',
  warn: 'border-amber-400/30 bg-amber-400/[0.07]',
  success: 'border-emerald-400/30 bg-emerald-400/[0.07]',
  violet: 'border-grape/30 bg-grape/[0.07]',
};

export function ConceptCard({ icon, title, tone = 'info', children }: ConceptCardProps) {
  return (
    <section className={`animate-riseIn rounded-2xl border p-5 ${TONES[tone]}`}>
      <div className="mb-2 flex items-center gap-2.5">
        <span className="text-xl" aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h3>
      </div>
      <div className="prose-id text-sm leading-relaxed text-slate-300">{children}</div>
    </section>
  );
}