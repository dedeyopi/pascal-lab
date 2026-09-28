// src/components/FormulaCard.tsx
interface FormulaCardProps {
  title?: string;
  question?: string;
  formula: React.ReactNode;
  meaning: { symbol: string; text: string }[];
  note?: React.ReactNode;
}

export function FormulaCard({ title = 'Persamaan', question, formula, meaning, note }: FormulaCardProps) {
  return (
    <section className="glass animate-riseIn p-5 sm:p-6">
      {question && (
        <p className="mb-3 rounded-xl border border-white/10 bg-navy-900/60 px-4 py-3 text-sm italic text-slate-300">
          “{question}”
        </p>
      )}
      <p className="label-text mb-3">{title}</p>
      <div className="mb-4 grid place-items-center rounded-2xl border border-electric/25 bg-gradient-to-br from-electric/10 via-transparent to-aqua/10 px-4 py-6">
        <div className="font-mono text-2xl font-bold tracking-wide text-white sm:text-3xl">{formula}</div>
      </div>
      <dl className="grid gap-2 sm:grid-cols-2">
        {meaning.map((m) => (
          <div key={m.symbol} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
            <dt className="font-mono text-base font-bold text-aqua">{m.symbol}</dt>
            <dd className="text-sm leading-snug text-slate-300">{m.text}</dd>
          </div>
        ))}
      </dl>
      {note && <div className="mt-4 text-sm leading-relaxed text-slate-400">{note}</div>}
    </section>
  );
}