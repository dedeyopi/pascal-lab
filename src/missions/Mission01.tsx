// src/missions/Mission01.tsx
import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { PredictionCard } from '../components/PredictionCard';
import { HydraulicJackArt } from '../components/Illustrations';
import { ConceptCard } from '../components/ConceptCard';
import { useLab } from '../state/LabContext';

interface Props {
  onNext: () => void;
  onBackToMap: () => void;
}

export function Mission01({ onNext, onBackToMap }: Props) {
  const meta = MISSIONS[0];
  const { state, completeMission, addXP } = useLab();

  const predicted = state.predictions['m1'] !== undefined;

  const handleNext = () => {
    completeMission(1, 10);
    onNext();
  };

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={handleNext}
      nextLabel="MASUK KE LABORATORIUM →"
      nextDisabled={!predicted}
    >
      <section className="glass-strong overflow-hidden">
        <div className="border-b border-white/8 bg-navy-900/50 p-4 sm:p-6">
          <HydraulicJackArt />
        </div>
        <div className="p-5 sm:p-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-aqua">
            Pengamatan Awal
          </p>
          <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
            Mobil memiliki massa yang sangat besar. Lalu bagaimana sebuah dongkrak hidrolik dapat membantu
            manusia mengangkatnya?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Perhatikan gambar di atas. Ada dua piston: yang kecil digerakkan oleh tangan, dan yang besar
            mengangkat beban berat. Sesuatu terjadi di dalam fluida yang menghubungkan keduanya.
          </p>
        </div>
      </section>

      <PredictionCard
        predKey="m1"
        question="Menurutmu, apa yang membuat dongkrak hidrolik mampu mengangkat mobil yang berat?"
        xp={10}
        options={[
          { id: 'a', label: 'A. Fluida menciptakan energi dari tidak ada.' },
          { id: 'b', label: 'B. Gaya dapat diteruskan melalui fluida.' },
          { id: 'c', label: 'C. Fluida membuat massa mobil menjadi lebih kecil.' },
          { id: 'd', label: 'D. Dongkrak menghilangkan gaya gravitasi.' },
        ]}
        onLocked={() => addXP(0)}
      />

      {predicted && (
        <ConceptCard icon="🎯" title="Langkah Berikutnya" tone="violet">
          <p>
            Untuk mengetahui apakah prediksimu benar, kita perlu melakukan eksperimen. Di laboratorium kita
            akan mengubah gaya dan luas penampang, lalu mengamati apa yang terjadi.
          </p>
        </ConceptCard>
      )}
    </MissionShell>
  );
}