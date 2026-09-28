// src/components/QuizCard.tsx
import { useState } from 'react';
import type { QuizQuestion } from '../data/quiz';
import { FeedbackPanel } from './FeedbackPanel';
import { useLab } from '../state/LabContext';
import { fmt } from '../lib/physics';

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
  total: number;
}

function gradeReasoning(text: string, keywords: string[][], minKeywords: number): boolean {
  const t = text.toLowerCase();
  const matched = keywords.filter((group) => group.some((k) => t.includes(k))).length;
  return matched >= minKeywords;
}

export function QuizCard({ question, index, total }: QuizCardProps) {
  const { state, recordQuizAnswer, addXP } = useLab();
  const saved = state.quizAnswers.find((a) => a.questionId === question.id);
  const locked = Boolean(saved);

  const [mcPick, setMcPick] = useState<string | null>(null);
  const [tfPick, setTfPick] = useState<boolean | null>(null);
  const [numPick, setNumPick] = useState('');
  const [textPick, setTextPick] = useState('');
  const [matchPick, setMatchPick] = useState<Record<number, string>>({});

  const commit = (correct: boolean) => {
    if (locked) return;
    recordQuizAnswer({
      questionId: question.id,
      category: question.category,
      correct,
      points: question.points,
      earned: correct ? question.points : 0,
    });
    if (correct) addXP(10);
  };

  const categoryLabel: Record<string, string> = {
    konsep: 'Konsep',
    hitung: 'Hitungan / Penerapan',
    penalaran: 'Penalaran',
  };

  return (
    <section className="glass-strong animate-riseIn p-5 sm:p-6" aria-labelledby={`q-${question.id}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="chip">Soal {index + 1} / {total}</span>
        <span className="chip border-grape/30 text-grape-light">{categoryLabel[question.category]}</span>
      </div>

      <h3 id={`q-${question.id}`} className="mb-4 text-sm font-semibold leading-relaxed text-white sm:text-base">
        {question.question}
      </h3>

      {/* ---------- Multiple choice ---------- */}
      {question.type === 'mc' && (
        <div className="space-y-2" role="radiogroup" aria-labelledby={`q-${question.id}`}>
          {question.options.map((opt) => {
            const selected = mcPick === opt.id;
            const showCorrect = locked && opt.id === question.correctId;
            const showWrong = locked && selected && opt.id !== question.correctId;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={locked}
                onClick={() => setMcPick(opt.id)}
                className={[
                  'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                  showCorrect
                    ? 'border-emerald-400/60 bg-emerald-400/10 text-white'
                    : showWrong
                      ? 'border-amber-400/50 bg-amber-400/10 text-white'
                      : selected
                        ? 'border-aqua/60 bg-aqua/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]',
                  locked ? 'cursor-default' : '',
                ].join(' ')}
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/25 text-[10px] font-bold">
                  {opt.id.toUpperCase()}
                </span>
                <span className="leading-snug">{opt.label}</span>
              </button>
            );
          })}
          {!locked && (
            <button
              type="button"
              className="btn-primary mt-3"
              disabled={!mcPick}
              onClick={() => commit(mcPick === question.correctId)}
            >
              PERIKSA JAWABAN
            </button>
          )}
        </div>
      )}

      {/* ---------- True / False ---------- */}
      {question.type === 'tf' && (
        <div>
          <div className="flex gap-3" role="radiogroup" aria-labelledby={`q-${question.id}`}>
            {[
              { v: true, label: 'Benar' },
              { v: false, label: 'Salah' },
            ].map((o) => {
              const selected = tfPick === o.v;
              const showCorrect = locked && question.correct === o.v;
              return (
                <button
                  key={String(o.v)}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={locked}
                  onClick={() => setTfPick(o.v)}
                  className={[
                    'flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                    showCorrect
                      ? 'border-emerald-400/60 bg-emerald-400/10 text-white'
                      : selected
                        ? 'border-aqua/60 bg-aqua/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25',
                  ].join(' ')}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          {!locked && (
            <button
              type="button"
              className="btn-primary mt-3"
              disabled={tfPick === null}
              onClick={() => commit(tfPick === question.correct)}
            >
              PERIKSA JAWABAN
            </button>
          )}
        </div>
      )}

      {/* ---------- Numeric ---------- */}
      {question.type === 'numeric' && (
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              inputMode="decimal"
              value={numPick}
              disabled={locked}
              placeholder="Tulis jawabanmu"
              onChange={(e) => setNumPick(e.target.value)}
              className="w-44 rounded-xl border border-white/12 bg-navy-900/70 px-3 py-2.5 font-mono text-sm text-white
                         focus-visible:border-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/40"
              aria-label={`Jawaban dalam ${question.unit}`}
            />
            <span className="font-mono text-sm text-slate-400">{question.unit}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">💡 {question.hint}</p>
          {!locked && (
            <button
              type="button"
              className="btn-primary mt-3"
              disabled={numPick.trim() === ''}
              onClick={() => {
                const v = Number(numPick);
                commit(Math.abs(v - question.answer) <= question.tolerance);
              }}
            >
              PERIKSA JAWABAN
            </button>
          )}
          {locked && (
            <p className="mt-2 text-xs text-slate-400">
              Jawaban yang benar:{' '}
              <span className="font-mono font-bold text-emerald-300">
                {fmt(question.answer, 1)} {question.unit}
              </span>
            </p>
          )}
        </div>
      )}

      {/* ---------- Reasoning ---------- */}
      {question.type === 'reasoning' && (
        <div>
          <textarea
            value={textPick}
            disabled={locked}
            onChange={(e) => setTextPick(e.target.value)}
            rows={4}
            placeholder="Tulis penjelasanmu dengan kalimat lengkap…"
            className="w-full resize-y rounded-xl border border-white/12 bg-navy-900/70 px-4 py-3 text-sm leading-relaxed text-white
                       focus-visible:border-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/40"
            aria-label="Jawaban penjelasan"
          />
          {!locked && (
            <button
              type="button"
              className="btn-primary mt-3"
              disabled={textPick.trim().length < 12}
              onClick={() =>
                commit(gradeReasoning(textPick, question.keywords, question.minKeywords))
              }
            >
              PERIKSA JAWABAN
            </button>
          )}
          {locked && (
            <div className="mt-3 rounded-xl border border-white/10 bg-navy-900/50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Contoh jawaban
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{question.modelAnswer}</p>
            </div>
          )}
        </div>
      )}

      {/* ---------- Matching ---------- */}
      {question.type === 'matching' && (
        <div className="space-y-3">
          {question.pairs.map((pair, i) => (
            <div key={pair.term} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-aqua">
                {pair.term}
              </span>
              <select
                value={matchPick[i] ?? ''}
                disabled={locked}
                onChange={(e) => setMatchPick((m) => ({ ...m, [i]: e.target.value }))}
                className="w-full rounded-xl border border-white/12 bg-navy-900/70 px-3 py-2 text-sm text-white
                           focus-visible:border-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/40"
                aria-label={`Pasangan untuk ${pair.term}`}
              >
                <option value="">— pilih penjelasan —</option>
                {question.pairs.map((p) => (
                  <option key={p.match} value={p.match}>
                    {p.match}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {!locked && (
            <button
              type="button"
              className="btn-primary"
              disabled={Object.keys(matchPick).length < question.pairs.length}
              onClick={() => {
                const allCorrect = question.pairs.every((p, i) => matchPick[i] === p.match);
                commit(allCorrect);
              }}
            >
              PERIKSA JAWABAN
            </button>
          )}

          {locked && (
            <div className="rounded-xl border border-white/10 bg-navy-900/50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Pasangan yang tepat
              </p>
              <ul className="mt-1.5 space-y-1 text-sm text-slate-300">
                {question.pairs.map((p) => (
                  <li key={p.term}>
                    <span className="font-semibold text-aqua">{p.term}</span> — {p.match}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ---------- Feedback ---------- */}
      {locked && saved && (
        <div className="mt-4">
          {question.type === 'mc' && (
            <FeedbackPanel status={saved.correct ? 'correct' : 'incorrect'}>
              {saved.correct ? question.feedbackCorrect : question.feedbackWrong}
            </FeedbackPanel>
          )}
          {question.type === 'tf' && (
            <FeedbackPanel status={saved.correct ? 'correct' : 'incorrect'}>
              {saved.correct ? question.feedbackCorrect : question.feedbackWrong}
            </FeedbackPanel>
          )}
          {question.type === 'numeric' && (
            <FeedbackPanel status={saved.correct ? 'correct' : 'incorrect'}>
              {saved.correct ? question.feedbackCorrect : question.feedbackWrong}
            </FeedbackPanel>
          )}
          {question.type === 'reasoning' && (
            <FeedbackPanel status={saved.correct ? 'correct' : 'neutral'}>
              {saved.correct
                ? 'Penjelasanmu sudah memuat gagasan kunci yang tepat. Bandingkan dengan contoh jawaban di atas untuk menyempurnakannya.'
                : 'Penjelasanmu belum memuat semua gagasan kunci. Bacalah contoh jawaban di atas, lalu bandingkan dengan jawabanmu.'}
            </FeedbackPanel>
          )}
          {question.type === 'matching' && (
            <FeedbackPanel status={saved.correct ? 'correct' : 'incorrect'}>
              {saved.correct ? question.feedbackCorrect : question.feedbackWrong}
            </FeedbackPanel>
          )}
        </div>
      )}
    </section>
  );
}