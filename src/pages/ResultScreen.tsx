import { useLab } from '../state/LabContext';
import { BADGE_LIST } from '../data/badges';
import { BadgeCard } from '../components/BadgeCard';
import { MISSIONS } from '../data/missions';
import { QUIZ } from '../data/quiz';

const CONCEPTS = [
  'Tekanan',
  'Gaya dan luas',
  'Hukum Pascal',
  'Sistem hidrolik',
  'Perhitungan gaya',
  'Aplikasi kehidupan nyata',
];

interface Props {
  onBackToMap: () => void;
  onReviewReflection: () => void;
  onOpenCertificate: () => void;
}

export function ResultScreen({
  onBackToMap,
  onReviewReflection,
  onOpenCertificate,
}: Props) {
  const { state, resetAll } = useLab();

  const earnedBadges = BADGE_LIST.filter((b) => state.badges.includes(b.id));
  const totalPossible = QUIZ.length;
  const pct =
    totalPossible > 0 ? Math.round((state.quizScore / totalPossible) * 100) : 0;

  const summary = buildSummary(state.quizAnswers, pct, state.reflection.confidence);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8 text-center">
        <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-electric via-aqua to-grape text-3xl">
          🏆
        </span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-aqua">
          Sertifikat Digital
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          PASCAL LAB COMPLETE
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Investigasi tekanan dan Hukum Pascal telah dituntaskan.
        </p>
      </header>

      <section className="glass-strong mb-5 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-electric to-aqua text-2xl text-navy-950">
            🧑‍🔬
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-aqua">
              Science Investigator
            </p>
            <p className="text-xl font-extrabold text-white">
              {state.student?.name ?? 'Investigator'}
            </p>
            <p className="text-sm text-slate-400">
              Kelas {state.student?.className ?? '—'}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: `${state.xp}`, v: 'Total XP', tone: 'text-aqua' },
            {
              k: `${state.completedMissions.length}/7`,
              v: 'Misi Selesai',
              tone: 'text-electric-light',
            },
            {
              k: `${earnedBadges.length}/${BADGE_LIST.length}`,
              v: 'Lencana',
              tone: 'text-grape-light',
            },
            { k: `${pct}%`, v: 'Skor Challenge', tone: 'text-emerald-400' },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
            >
              <dd className={`font-mono text-xl font-extrabold ${s.tone}`}>{s.k}</dd>
              <dt className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {s.v}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="glass mb-5 p-6">
        <p className="label-text mb-3">Konsep yang Dikuasai</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {CONCEPTS.map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-sm text-slate-200">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] text-emerald-300">
                ✓
              </span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass mb-5 p-6">
        <p className="label-text mb-3">Lencana yang Diraih</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {BADGE_LIST.map((b) => (
            <BadgeCard key={b.id} badgeId={b.id} earned={state.badges.includes(b.id)} />
          ))}
        </div>
      </section>

      <section className="glass mb-5 p-6">
        <p className="label-text mb-3">Ringkasan Belajar Personal</p>
        <p className="text-sm leading-relaxed text-slate-300">{summary}</p>

        <div className="mt-4 space-y-2">
          {MISSIONS.map((m) => (
            <div key={m.id} className="flex items-center gap-3 text-sm">
              <span
                className={[
                  'grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px]',
                  state.completedMissions.includes(m.id)
                    ? 'bg-emerald-400/15 text-emerald-300'
                    : 'bg-white/8 text-slate-500',
                ].join(' ')}
                aria-hidden="true"
              >
                {state.completedMissions.includes(m.id) ? '✓' : '–'}
              </span>
              <span
                className={
                  state.completedMissions.includes(m.id)
                    ? 'text-slate-200'
                    : 'text-slate-500'
                }
              >
                Misi {m.code} — {m.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {state.reflection.confidence && (
        <section className="glass mb-5 p-6">
          <p className="label-text mb-3">Tingkat Keyakinan Akhir</p>
          <p className="text-sm text-slate-300">
            {
              {
                bingung: '😕 Masih bingung',
                mulai: '🙂 Mulai memahami',
                memahami: '😀 Memahami',
                sangat: '🤩 Sangat memahami',
              }[state.reflection.confidence]
            }
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Jika kamu masih merasa bingung, tidak apa-apa. Diskusikan bagian yang paling sulit
            dengan gurumu — rasa ingin tahu adalah bahan bakar seorang ilmuwan.
          </p>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="btn-primary flex-1 !bg-gradient-to-r !from-amber-400 !to-yellow-500 !text-amber-950"
          onClick={onOpenCertificate}
        >
          🎓 LIHAT SERTIFIKAT
        </button>
        <button
          type="button"
          className="btn-ghost flex-1"
          onClick={onBackToMap}
        >
          🗺️ KEMBALI KE PETA MISI
        </button>
        <button
          type="button"
          className="btn-ghost flex-1"
          onClick={onReviewReflection}
        >
          📝 LIHAT REFLEKSI
        </button>
        <button
          type="button"
          className="btn-quiet"
          onClick={() => {
            if (window.confirm('Hapus seluruh kemajuan dan mulai dari awal?')) {
              resetAll();
              window.location.reload();
            }
          }}
        >
          Mulai Ulang
        </button>
      </div>
    </div>
  );
}

function buildSummary(
  answers: { category: string; correct: boolean }[],
  pct: number,
  confidence: string | null
): string {
  if (answers.length === 0) {
    return 'Kamu belum menyelesaikan Pascal Challenge. Selesaikan Misi 07 untuk mendapatkan ringkasan belajar yang lebih lengkap.';
  }

  const cat = (c: string) => {
    const list = answers.filter((a) => a.category === c);
    if (list.length === 0) return 0;
    return Math.round((list.filter((a) => a.correct).length / list.length) * 100);
  };

  const konsep = cat('konsep');
  const hitung = cat('hitung');
  const penalaran = cat('penalaran');

  const parts: string[] = [];

  parts.push(
    pct >= 80
      ? 'Kamu menunjukkan pemahaman yang kuat tentang tekanan dan Hukum Pascal.'
      : pct >= 60
        ? 'Kamu sudah memahami sebagian besar konsep tekanan dan Hukum Pascal dengan baik.'
        : 'Kamu sudah melewati seluruh investigasi. Beberapa konsep masih perlu diperkuat lagi.'
  );

  if (konsep >= 80)
    parts.push(
      'Pemahaman konsepmu sangat baik: kamu mampu membedakan tekanan, gaya, dan luas penampang.'
    );
  else if (konsep >= 50)
    parts.push(
      'Pemahaman konsepmu cukup baik, tetapi masih ada bagian yang perlu diperjelas.'
    );
  else
    parts.push(
      'Perkuat kembali konsep dasar: tekanan bergantung pada gaya dan luas, dan tekanan diteruskan sama besar.'
    );

  if (hitung >= 80)
    parts.push(
      'Keterampilan hitunganmu akurat — kamu mampu menerapkan F₁/A₁ = F₂/A₂ dengan tepat.'
    );
  else if (hitung >= 50)
    parts.push(
      'Hitunganmu sudah cukup baik; periksa kembali konsistensi satuan luas.'
    );
  else
    parts.push(
      'Latih lagi perhitungan dengan memastikan satuan luas konsisten sebelum membandingkan.'
    );

  if (penalaran >= 80)
    parts.push(
      'Penalaranmu tajam: kamu dapat menjelaskan mengapa gaya membesar tanpa mengklaim tekanan ikut membesar.'
    );
  else if (penalaran >= 50)
    parts.push(
      'Penalaranmu berkembang baik; pertajam dengan selalu menyebut peran luas penampang.'
    );
  else
    parts.push(
      'Pada bagian penalaran, ingat bahwa gaya keluaran membesar karena luasnya, bukan karena tekanannya.'
    );

  if (confidence === 'sangat' || confidence === 'memahami') {
    parts.push(
      'Kamu juga merasa yakin dengan pemahamanmu — pertahankan rasa ingin tahu ini.'
    );
  } else if (confidence) {
    parts.push(
      'Kamu masih merasa belum sepenuhnya yakin. Cobalah mengulang Misi 03 dan 04 untuk memperkuat pemahaman.'
    );
  }

  return parts.join(' ');
}
