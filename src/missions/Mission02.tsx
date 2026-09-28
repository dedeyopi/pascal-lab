// src/missions/Mission02.tsx
import { useState } from 'react';
import { MissionShell } from './MissionShell';
import { MISSIONS } from '../data/missions';
import { PredictionCard } from '../components/PredictionCard';
import { PressureSimulator } from '../components/PressureSimulator';
import { FormulaCard } from '../components/FormulaCard';
import { ConceptCard } from '../components/ConceptCard';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { useLab } from '../state/LabContext';

interface Props {
  onNext: () => void;
  onBackToMap: () => void;
}

export function Mission02({ onNext, onBackToMap }: Props) {
  const meta = MISSIONS[1];
  const { state, completeMission } = useLab();
  const [showFormula, setShowFormula] = useState(false);

  const predicted = state.predictions['m2-scenario'] !== undefined;
  const explored = state.predictions['m2-explore'] !== undefined;

  return (
    <MissionShell
      meta={meta}
      onBackToMap={onBackToMap}
      onNext={() => {
        completeMission(2, 30, 'pressure');
        onNext();
      }}
      nextLabel="LANJUT KE MISI 03 →"
      nextDisabled={!explored}
    >
      <ConceptCard icon="🖐️" title="Fenomena" tone="info">
        <p>
          Coba tekan meja dengan ujung jarimu, lalu tekan meja yang sama dengan seluruh telapak tanganmu.
          Gaya yang kamu berikan bisa sama besar — tetapi rasanya berbeda. Mengapa?
        </p>
      </ConceptCard>

      <section className="glass-strong p-5 sm:p-6">
        <p className="label-text mb-3">Eksplorasi Bebas</p>
        <h2 className="mb-4 text-base font-bold text-white sm:text-lg">
          Ubah besar gaya dan luas permukaan, lalu amati tekanannya.
        </h2>
        <PressureSimulator
          label="Simulator Tekanan"
          initialForce={10}
          initialArea={0.01}
          onValues={() => {
            if (!state.predictions['m2-explore']) {
              // tandai sudah menjelajah (tanpa XP tambahan)
            }
          }}
        />
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Tekanan menunjukkan seberapa besar gaya bekerja pada setiap satuan luas.
        </p>
      </section>

      <PredictionCard
        predKey="m2-scenario"
        question="Pada gaya yang sama, permukaan manakah yang menghasilkan tekanan lebih besar?"
        xp={10}
        correctId="a"
        feedbackMap={{
          a: {
            ok: true,
            text: 'Benar! Dengan gaya yang sama, luas yang lebih kecil menghasilkan tekanan yang lebih besar karena gaya terkonsentrasi pada bidang yang sempit.',
          },
          b: {
            ok: false,
            text: 'Belum tepat. Perhatikan bahwa tekanan bergantung pada gaya per satuan luas. Coba bandingkan F/A pada kedua permukaan.',
          },
        }}
        options={[
          { id: 'a', label: 'A. Permukaan dengan luas kecil (bidang sentuh sempit).' },
          { id: 'b', label: 'B. Permukaan dengan luas besar (bidang sentuh lebar).' },
        ]}
      />

      <PredictionCard
        predKey="m2-explore"
        question="Jika luas permukaan diperkecil menjadi setengahnya sementara gaya tetap, apa yang terjadi pada tekanan?"
        xp={10}
        correctId="b"
        feedbackMap={{
          b: { ok: true, text: 'Tepat! Karena A menjadi ½ kali, maka P = F/A menjadi 2 kali lebih besar.' },
          a: { ok: false, text: 'Belum tepat. Ingat P = F/A. Jika penyebut (A) mengecil, hasil bagi justru membesar.' },
          c: { ok: false, text: 'Belum tepat. Tekanan tidak tetap karena luasnya berubah, sedangkan gaya tetap.' },
        }}
        options={[
          { id: 'a', label: 'A. Tekanan menjadi setengahnya.' },
          { id: 'b', label: 'B. Tekanan menjadi dua kali lebih besar.' },
          { id: 'c', label: 'C. Tekanan tetap sama.' },
        ]}
      />

      <section className="glass-strong p-5 sm:p-6">
        <p className="label-text mb-3">Uji Dua Skenario</p>
        <h2 className="mb-4 text-base font-bold text-white sm:text-lg">
          Bandingkan kedua skenario berikut dan bandingkan tekanannya.
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-aqua/25 bg-aqua/[0.05] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-aqua">
              Skenario A — Luas Kecil
            </p>
            <PressureSimulator
              initialForce={50}
              initialArea={0.002}
              forceRange={[10, 50]}
              areaRange={[0.002, 0.002]}
              accent="#22d3ee"
            />
          </div>

          <div className="rounded-2xl border border-grape/25 bg-grape/[0.05] p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-grape-light">
              Skenario B — Luas Besar
            </p>
            <PressureSimulator
              initialForce={50}
              initialArea={0.05}
              forceRange={[10, 50]}
              areaRange={[0.05, 0.05]}
              accent="#8b5cf6"
            />
          </div>
        </div>

        <div className="mt-4">
          <FeedbackPanel status="neutral" title="Kesimpulan sementara:">
            Dengan gaya yang sama (50 N), luas 0,002 m² memberi tekanan 25.000 Pa, sedangkan luas 0,05 m²
            hanya memberi tekanan 1.000 Pa. Luas yang lebih kecil → tekanan yang lebih besar.
          </FeedbackPanel>
        </div>
      </section>

      {explored && !showFormula && (
        <div className="flex justify-center">
          <button type="button" className="btn-primary" onClick={() => setShowFormula(true)}>
            🔍 TULISKAN HUBUNGANNYA
          </button>
        </div>
      )}

      {showFormula && (
        <>
          <FormulaCard
            title="Hubungan yang Kamu Temukan"
            question="Bagaimana tekanan berubah jika gaya diperbesar atau luas diperkecil?"
            formula={
              <span>
                P = F / A
              </span>
            }
            meaning={[
              { symbol: 'P', text: 'Tekanan (pascal, Pa)' },
              { symbol: 'F', text: 'Gaya yang bekerja (newton, N)' },
              { symbol: 'A', text: 'Luas permukaan tempat gaya bekerja (m²)' },
            ]}
            note={
              <p>
                Satuan tekanan dalam SI adalah <strong className="text-slate-200">pascal (Pa)</strong>, yaitu
                1 newton per meter persegi (1 Pa = 1 N/m²). Tekanan adalah besaran <em>turunan</em>: nilainya
                bergantung pada gaya <em>dan</em> luas.
              </p>
            }
          />

          <ConceptCard icon="⚠️" title="Miskonsepsi yang Sering Terjadi" tone="warn">
            <p>
              “Semakin besar gaya selalu berarti tekanan semakin besar.” — <strong>Belum tentu.</strong> Jika
              gaya diperbesar tetapi luas bidang sentuh juga diperbesar dengan perbandingan yang sama, tekanan
              bisa tetap sama. Tekanan selalu bergantung pada gaya <em>dan</em> luas.
            </p>
          </ConceptCard>
        </>
      )}
    </MissionShell>
  );
}