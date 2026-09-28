// src/components/ReflectionForm.tsx
import { useLab } from '../state/LabContext';
import type { Confidence } from '../types';

const QUESTIONS = [
  {
    id: 'r1',
    text: 'Mengapa tekanan dapat diteruskan melalui fluida tertutup?',
  },
  {
    id: 'r2',
    text: 'Apa hubungan antara gaya, luas, dan tekanan?',
  },
  {
    id: 'r3',
    text: 'Mengapa piston besar dapat menghasilkan gaya yang lebih besar?',
  },
  {
    id: 'r4',
    text: 'Bagaimana eksperimen virtual membantumu memahami Hukum Pascal?',
  },
  {
    id: 'r5',
    text: 'Di mana kamu menemukan prinsip hidrolik dalam kehidupan sehari-hari?',
  },
];

const CONFIDENCE: { id: Confidence; emoji: string; label: string }[] = [
  { id: 'bingung', emoji: '😕', label: 'Masih bingung' },
  { id: 'mulai', emoji: '🙂', label: 'Mulai memahami' },
  { id: 'memahami', emoji: '😀', label: 'Memahami' },
  { id: 'sangat', emoji: '🤩', label: 'Sangat memahami' },
];

export function ReflectionForm({ onFinish }: { onFinish: () => void }) {
  const { state, setReflectionAnswer, setConfidence } = useLab();
  const { answers, confidence } = state.reflection;

  const filled = QUESTIONS.filter((q) => (answers[q.id] ?? '').trim().length > 0).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <span className="chip mb-3">Tahap Akhir</span>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Refleksi Investigator
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Luangkan waktu sejenak. Jawablah dengan bahasamu sendiri — tidak ada jawaban yang salah di sini,
          yang penting adalah kejujuran berpikirmu.
        </p>
      </header>

      <div className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <div key={q.id} className="glass p-5">
            <label htmlFor={q.id} className="mb-2 block text-sm font-semibold text-white">
              <span className="mr-2 font-mono text-aqua">{i + 1}.</span>
              {q.text}
            </label>
            <textarea
              id={q.id}
              rows={3}
              value={answers[q.id] ?? ''}
              onChange={(e) => setReflectionAnswer(q.id, e.target.value)}
              placeholder="Tulis jawabanmu…"
              className="w-full resize-y rounded-xl border border-white/12 bg-navy-900/70 px-4 py-3 text-sm leading-relaxed text-white
                         focus-visible:border-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/40"
            />
          </div>
        ))}

        <div className="glass p-5">
          <p className="mb-3 text-sm font-semibold text-white">
            Seberapa yakin kamu sekarang tentang Hukum Pascal?
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Tingkat keyakinan">
            {CONFIDENCE.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={confidence === c.id}
                onClick={() => setConfidence(c.id)}
                className={[
                  'flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                  confidence === c.id
                    ? 'border-aqua/60 bg-aqua/10 text-white'
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25',
                ].join(' ')}
              >
                <span className="text-2xl" aria-hidden="true">
                  {c.emoji}
                </span>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button type="button" className="btn-primary w-full sm:w-auto" onClick={onFinish}>
          LIHAT HASIL AKHIR →
        </button>
        <p className="text-xs text-slate-500">
          {filled} dari {QUESTIONS.length} pertanyaan terjawab · Jawabanmu tersimpan di perangkat ini.
        </p>
      </div>
    </div>
  );
}