import { useMemo } from 'react';
import { useLab } from '../state/LabContext';
import { BADGE_LIST } from '../data/badges';

interface Props {
  onBack: () => void;
}

// Simple hash untuk ID sertifikat unik per siswa
function generateCertId(name: string, className: string): string {
  const str = `${name}-${className}-pascal-lab`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  const code = Math.abs(hash).toString(36).toUpperCase().slice(0, 6);
  const year = new Date().getFullYear();
  return `PL-${year}-${code}`;
}

function formatDateID(d: Date): string {
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function CertificateScreen({ onBack }: Props) {
  const { state } = useLab();

  const studentName = state.student?.name ?? 'Investigator';
  const studentClass = state.student?.className ?? '—';
  const certId = useMemo(() => generateCertId(studentName, studentClass), [studentName, studentClass]);
  const today = useMemo(() => new Date(), []);

  const totalMissions = 7;
  const completedMissions = state.completedMissions.length;
  const quizPct = state.quizTotal > 0 ? Math.round((state.quizScore / state.quizTotal) * 100) : 0;
  const earnedBadges = BADGE_LIST.filter((b) => state.badges.includes(b.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-navy-950 px-4 py-8 sm:px-6 print:bg-white print:p-0">
      {/* Toolbar — sembunyi saat print */}
      <div className="no-print mx-auto mb-6 flex max-w-[1100px] flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-ghost !px-4 !py-2 !text-sm"
        >
          ← Kembali ke Hasil
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="btn-primary !px-4 !py-2 !text-sm"
          >
            🖨️ CETAK / SIMPAN PDF
          </button>
        </div>
      </div>

      {/* ======== SERTIFIKAT ======== */}
      <div className="mx-auto max-w-[1100px]">
        <div className="certificate-print relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-2xl print:rounded-none print:shadow-none">
          {/* Border dekoratif ganda */}
          <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-amber-600/60" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-5 rounded-lg border border-amber-500/30" aria-hidden="true" />

          {/* Ornamen sudut */}
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          {/* Konten utama */}
          <div className="relative px-8 py-10 sm:px-14 sm:py-14 md:px-20 md:py-16">
            {/* Header */}
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-amber-600/50" aria-hidden="true" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700 sm:text-xs">
                  Laboratorium Virtual IPA · Fase D
                </span>
                <span className="h-px w-16 bg-amber-600/50" aria-hidden="true" />
              </div>

              <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-wider text-amber-900 sm:text-4xl md:text-5xl">
                SERTIFIKAT
              </h1>
              <p className="mt-1 font-serif text-lg font-semibold italic tracking-wide text-amber-700 sm:text-xl">
                Penyelidikan Ilmiah
              </p>

              <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" aria-hidden="true" />
            </div>

            {/* Badge medali */}
            <div className="mt-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/40 blur-xl" aria-hidden="true" />
                <div className="relative grid h-20 w-20 place-items-center rounded-full border-4 border-amber-500 bg-gradient-to-br from-amber-300 to-amber-600 text-3xl shadow-lg sm:h-24 sm:w-24 sm:text-4xl">
                  🏆
                </div>
              </div>
            </div>

            {/* Penerima */}
            <div className="mt-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
                Dengan bangga diberikan kepada
              </p>

              <h2 className="mt-3 font-serif text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                {studentName}
              </h2>

              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Kelas <span className="font-semibold text-slate-800">{studentClass}</span>
              </p>
            </div>

            {/* Pernyataan */}
            <div className="mx-auto mt-6 max-w-2xl text-center">
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                Atas keberhasilannya menyelesaikan seluruh rangkaian investigasi ilmiah pada
                laboratorium virtual <span className="font-bold text-amber-800">PASCAL LAB</span> —
                <span className="font-semibold text-slate-800"> Misi Mengungkap Rahasia Tekanan</span>,
                dengan menguasai konsep tekanan, Hukum Pascal, dan penerapannya pada sistem hidrolik.
              </p>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              <StatBox label="Misi Selesai" value={`${completedMissions}/${totalMissions}`} />
              <StatBox label="Total XP" value={String(state.xp)} />
              <StatBox label="Skor Challenge" value={`${quizPct}%`} />
              <StatBox label="Lencana" value={`${earnedBadges.length}/${BADGE_LIST.length}`} />
            </div>

            {/* Badges */}
            {earnedBadges.length > 0 && (
              <div className="mx-auto mt-6 max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Lencana yang Diraih
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {earnedBadges.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-50 px-3 py-1.5"
                    >
                      <span className="text-base" aria-hidden="true">{b.icon}</span>
                      <span className="text-xs font-semibold text-amber-900">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tanda tangan & ID */}
            <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
              <div className="text-center">
                <div className="mx-auto mb-2 h-px w-32 bg-slate-400" aria-hidden="true" />
                <p className="font-serif text-sm font-semibold text-slate-800">
                  {studentName}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">
                  Science Investigator
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-2 h-px w-32 bg-slate-400" aria-hidden="true" />
                <p className="font-serif text-sm font-semibold text-slate-800">
                  Guru IPA
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">
                  Pembimbing
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-2 h-px w-32 bg-slate-400" aria-hidden="true" />
                <p className="font-serif text-sm font-semibold text-slate-800">
                  {formatDateID(today)}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-500">
                  Tanggal
                </p>
              </div>
            </div>

            {/* ID Sertifikat */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-amber-200 pt-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                No. Sertifikat: <span className="text-amber-800">{certId}</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                Diterbitkan oleh PASCAL LAB
              </p>
            </div>
          </div>
        </div>

        {/* Keterangan tambahan di bawah (tidak tercetak) */}
        <div className="no-print mt-6 text-center text-xs text-slate-400">
          <p>
            Sertifikat ini dapat dicetak atau disimpan sebagai PDF menggunakan tombol di atas.
          </p>
          <p className="mt-1">
            Untuk hasil terbaik, pilih <strong className="text-slate-300">A4 Landscape</strong> di dialog
            cetak, dan aktifkan <strong className="text-slate-300">"Background graphics"</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============= Sub-komponen ============= */

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-amber-300/60 bg-white/70 px-3 py-3 text-center">
      <p className="font-mono text-xl font-extrabold text-amber-800 sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-500 sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations: Record<string, string> = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  };
  const positions: Record<string, string> = {
    tl: 'top-3 left-3',
    tr: 'top-3 right-3',
    br: 'bottom-3 right-3',
    bl: 'bottom-3 left-3',
  };

  return (
    <svg
      className={`pointer-events-none absolute ${positions[position]} ${rotations[position]} h-12 w-12 text-amber-600 sm:h-16 sm:w-16`}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 4 4 L 4 22 M 4 4 L 22 4 M 4 4 L 14 14 M 4 8 C 8 8 8 4 8 4 M 8 4 C 8 8 12 8 12 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <path d="M 22 4 Q 30 4 30 12 M 4 22 Q 4 30 12 30" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}
