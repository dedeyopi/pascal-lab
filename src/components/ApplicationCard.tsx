// src/components/ApplicationCard.tsx
import { useState } from 'react';

interface ApplicationCardProps {
  emoji: string;
  title: string;
  illustration: React.ReactNode;
  how: string;
  role: string;
  question: string;
  modelAnswer: string;
}

export function ApplicationCard({
  emoji,
  title,
  illustration,
  how,
  role,
  question,
  modelAnswer,
}: ApplicationCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="glass flex flex-col overflow-hidden">
      <div className="border-b border-white/8 bg-navy-900/40 p-3">
        {illustration}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-white">
          <span className="text-xl" aria-hidden="true">
            {emoji}
          </span>
          {title}
        </h3>

        <div className="space-y-3 text-sm leading-relaxed text-slate-300">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Cara kerjanya
            </p>
            <p>{how}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Peran Hukum Pascal
            </p>
            <p className="text-aqua/90">{role}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-grape/25 bg-grape/[0.07] p-3">
          <p className="text-xs font-bold uppercase tracking-widest text-grape-light">Pertanyaan</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{question}</p>

          {!open ? (
            <button
              type="button"
              className="btn-quiet mt-3 !px-3 !py-1.5 !text-xs"
              onClick={() => setOpen(true)}
            >
              Lihat contoh jawaban
            </button>
          ) : (
            <p className="mt-3 animate-riseIn rounded-lg border border-white/10 bg-navy-900/60 px-3 py-2 text-sm leading-relaxed text-slate-300">
              💡 {modelAnswer}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}