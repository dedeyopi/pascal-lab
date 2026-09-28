import { useMemo, useState } from 'react';
import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { QUIZ } from '../data/quiz';
import { QuizCard } from '../components/QuizCard';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { ConceptCard } from '../components/ConceptCard';
import { useLab } from '../state/LabContext';

interface Props {
  onFinish: () => void;
  onBackToMap: () => void;
}

export function Mission07({ onFinish, onBackToMap }: Props) {
  const meta = MISSIONS[6];
  const { state, completeMission, setQuizSummary, resetQuiz } = useLab();
  const [confirmed, setConfirmed] = useState(false);

  const answered = state.quizAnswers.length;
  const total = QUIZ.length;

  const { score, byCategory } = useMemo(() => {
    const s = state.quizAnswers.reduce((acc, a) => acc + a.earned, 0);
    const cats: Record<string, { got: number; max: number }> = {
      konsep: { got: 0, max: 0 },
      hitung: { got: 0, max: 0 },
      penalaran: { got: 0, max: 0 },
    };
    QUIZ.forEach((q) => {
      cats[q.category].max += q.points;
    });
    state.quizAnswers.forEach((a) => {
      cats[a.category].got += a.earned;
    });
    return { score: s, byCategory: cats };
  }, [state.quizAnswers]);

  const allAnswered = answered >= total;

  const handleFinish = () => {
    setQuizSummary(score, total);
    completeMission(7, 50 + score * 5, 'master');
    setConfirmed(true);
  };

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={onFinish}
      nextLabel="LANJUT KE REFLEKSI →"
      nextDisabled={!confirmed}
    >
      <ConceptCard icon="🏁" title="Pascal Challenge" tone="info">
        <p>
          Sepuluh tantangan untuk menguji pemahamanmu: konsep, hitungan, dan penalaran. Setiap jawaban akan
          diberi umpan balik penjelasan — jadi kamu bisa belajar bahkan dari jawaban yang belum tepat.
        </p>
      </ConceptCard>

      <div className="glass flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="readout-label">Terjawab</p>
            <p className="font-mono text-lg font-bold text-aqua">
              {answered}/{total}
            </p>
          </div>
          <div>
            <p className="readout-label">Skor Sementara</p>
            <p className="font-mono text-lg font-bold text-grape-light">{score}</p>
          </div>
        </div>
        <button type="button" className="btn-quiet !px-3 !py-2 !text-xs" onClick={resetQuiz}>
          ↺ Ulangi Challenge
        </button>
      </div>

      <div className="space-y-4">
        {QUIZ.map((q, i) => (
          <QuizCard key={q.id} question={q} index={i} total={total} />
        ))}
      </div>

      {allAnswered && !confirmed && (
        <section className="glass-strong p-5 sm:p-6">
          <p className="label-text mb-3">Rangkuman Sementara</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {Object.entries(byCategory).map(([cat, v]) => (
              <div key={cat} className="readout">
                <p className="readout-label capitalize">{cat}</p>
                <p className="font-mono text-base font-bold text-white">
                  {v.got}/{v.max}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <FeedbackPanel status="neutral" title="Siap menyelesaikan misi?">
              Tekan tombol di bawah untuk mengunci hasil challenge-mu. Setelah itu kamu akan diminta mengisi
              refleksi sebagai investigator.
            </FeedbackPanel>
          </div>
          <button type="button" className="btn-primary mt-4 w-full sm:w-auto" onClick={handleFinish}>
            ✅ SELESAIKAN PASCAL CHALLENGE
          </button>
        </section>
      )}

      {confirmed && (
        <FeedbackPanel status="correct" title="Challenge selesai!">
          Skormu <span className="font-mono font-bold">{score}</span> dari {total}. Lanjutkan ke refleksi
          untuk menutup investigasimu.
        </FeedbackPanel>
      )}
    </MissionShell>
  );
}