// src/components/PredictionCard.tsx
import { useState } from 'react';
import { useLab } from '../state/LabContext';

export interface PredictionOption {
  id: string;
  label: string;
}

interface PredictionCardProps {
  predKey: string;
  question: string;
  options: PredictionOption[];
  xp?: number;
  correctId?: string;
  feedbackMap?: Record<string, { ok: boolean; text: string }>;
  onLocked?: (chosenId: string) => void;
  lockedMessage?: string;
  followUp?: React.ReactNode;
}

export function PredictionCard({
  predKey,
  question,
  options,
  xp = 10,
  correctId,
  feedbackMap,
  onLocked,
  lockedMessage = 'Prediksimu telah dicatat.',
  followUp,
}: PredictionCardProps) {
  const { state, savePrediction, addXP } = useLab();
  const lockedValue = state.predictions[predKey];
  const locked = lockedValue !== undefined;
  const [pending, setPending] = useState<string | null>(null);

  const handleLock = () => {
    if (!pending || locked) return;
    savePrediction(predKey, pending);
    addXP(xp);
    onLocked?.(pending);
  };

  const fb = locked && feedbackMap ? feedbackMap[lockedValue] : undefined;

  return (
    <section className="glass-strong animate-riseIn p-5 sm:p-6" aria-labelledby={`${predKey}-q`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-grape/20 text-lg">
          🔮
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-grape-light">
            Prediksi Dulu
          </p>
          <h3 id={`${predKey}-q`} className="text-sm font-semibold leading-snug text-white sm:text-base">
            {question}
          </h3>
        </div>
      </div>

      <div className="space-y-2" role="radiogroup" aria-labelledby={`${predKey}-q`}>
        {options.map((opt) => {
          const selected = locked ? lockedValue === opt.id : pending === opt.id;
          const isCorrect = correctId === opt.id;
          const showState = locked && correctId !== undefined;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={locked}
              onClick={() => setPending(opt.id)}
              className={[
                'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                showState && selected && isCorrect
                  ? 'border-emerald-400/60 bg-emerald-400/10 text-white'
                  : showState && selected && !isCorrect
                    ? 'border-amber-400/50 bg-amber-400/10 text-white'
                    : selected
                      ? 'border-aqua/60 bg-aqua/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]',
                locked ? 'cursor-default' : 'cursor-pointer',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold',
                  selected ? 'border-aqua bg-aqua text-navy-950' : 'border-white/25 text-transparent',
                ].join(' ')}
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="leading-snug">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          type="button"
          className="btn-primary mt-4 w-full sm:w-auto"
          disabled={!pending}
          onClick={handleLock}
        >
          KUNCI PREDIKSI
        </button>
      )}

      {locked && (
        <div className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-3">
          <p className="text-sm font-semibold text-emerald-300">📌 {lockedMessage}</p>
          {!feedbackMap && (
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              Untuk mengetahui apakah prediksimu benar, kita perlu melakukan eksperimen.
            </p>
          )}
        </div>
      )}

      {fb && (
        <div
          className={[
            'mt-3 rounded-xl border px-4 py-3 text-sm leading-relaxed',
            fb.ok
              ? 'border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-100'
              : 'border-amber-400/30 bg-amber-400/[0.07] text-amber-100',
          ].join(' ')}
        >
          <span className="font-semibold">{fb.ok ? '✅ ' : '💡 '}</span>
          {fb.text}
        </div>
      )}

      {locked && followUp && <div className="mt-4">{followUp}</div>}
    </section>
  );
}