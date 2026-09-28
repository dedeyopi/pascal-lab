// src/pages/TeacherDashboard.tsx
import { MISSIONS } from '../data/missions';
import { QUIZ } from '../data/quiz';

const MEETINGS = [
  {
    n: 1,
    title: 'Pertemuan 1 — Mengamati & Membangun Pertanyaan',
    items: ['Misi 01: Misteri Dongkrak (Engage)', 'Misi 02: Tekanan Tak Terlihat (Explore)'],
  },
  {
    n: 2,
    title: 'Pertemuan 2 — Eksperimen Virtual',
    items: ['Misi 03: Laboratorium Pascal — Percobaan A, B, dan C', 'Diskusi data kelas'],
  },
  {
    n: 3,
    title: 'Pertemuan 3 — Menemukan & Menerapkan',
    items: ['Misi 04: Temukan Polanya (Explain)', 'Misi 05: Insinyur Hidrolik (Elaborate)'],
  },
  {
    n: 4,
    title: 'Pertemuan 4 — Penerapan & Penilaian',
    items: [
      'Misi 06: Dunia Hidrolik',
      'Misi 07: Pascal Challenge',
      'Refleksi Investigator',
      'Pembahasan bersama',
    ],
  },
];

const MISCONCEPTIONS = [
  {
    salah: 'Tekanan menjadi lebih besar pada piston besar.',
    koreksi:
      'Pada sistem ideal, tekanan diteruskan sama besar (P₁ = P₂). Gaya keluaran membesar karena luas piston keluaran lebih besar, bukan karena tekanannya bertambah.',
  },
  {
    salah: 'Fluida menghasilkan energi.',
    koreksi:
      'Sistem tidak menciptakan energi. Keuntungan gaya diperoleh dengan konsekuensi jarak perpindahan piston besar yang lebih pendek (F₁d₁ ≈ F₂d₂ pada sistem ideal).',
  },
  {
    salah: 'Semakin besar gaya selalu berarti tekanan semakin besar.',
    koreksi:
      'Tekanan bergantung pada gaya dan luas. Jika gaya dan luas bertambah dengan perbandingan yang sama, tekanan tetap.',
  },
  {
    salah: 'Hukum Pascal hanya berlaku pada air.',
    koreksi:
      'Hukum Pascal berlaku untuk fluida tertutup pada umumnya. Sistem hidrolik kendaraan biasanya menggunakan minyak hidrolik.',
  },
  {
    salah: 'Tekanan bergerak dari piston kecil ke piston besar.',
    koreksi:
      'Tekanan yang diberikan diteruskan melalui fluida tertutup ke segala arah dengan besar yang sama. Hindari kata "mengalir" untuk tekanan.',
  },
  {
    salah: 'Piston besar menghasilkan gaya karena piston itu "lebih kuat".',
    koreksi:
      'Piston besar tidak "lebih kuat". Ia hanya menyediakan luas penampang yang lebih besar bagi tekanan yang sama untuk bekerja.',
  },
];

const DISCUSSION_PROMPTS = [
  'Sebelum eksperimen: "Apa prediksimu? Mengapa kamu memilih jawaban itu?"',
  'Saat eksperimen: "Variabel apa yang sedang kita ubah? Variabel apa yang kita jaga tetap?"',
  'Setelah eksperimen: "Apa yang tetap sama pada kedua piston? Bagaimana kamu tahu dari data?"',
  'Konstruksi konsep: "Bagaimana data ini mendukung Hukum Pascal?"',
  'Penerapan: "Apakah memperbesar piston selalu berarti sistem menjadi lebih baik? Apa konsekuensinya?"',
  'Penalaran kritis: "Jika piston besar bergerak lebih pendek, ke mana sisa perpindahannya pergi?"',
  'Koneksi dunia nyata: "Sistem hidrolik mana yang paling dekat dengan kehidupanmu sehari-hari?"',
];

const QUIZ_KEY: { id: string; answer: string; category: string }[] = [
  { id: 'q1', answer: 'B — tekanan yang sama bekerja pada luas penampang yang lebih besar', category: 'Konsep' },
  { id: 'q2', answer: 'C — diteruskan ke segala arah dengan besar yang sama', category: 'Konsep' },
  { id: 'q3', answer: 'SALAH — tekanan diteruskan sama besar', category: 'Konsep' },
  { id: 'q4', answer: 'F₂ = 15 × (40/4) = 150 N', category: 'Hitungan' },
  { id: 'q5', answer: 'F₂ = 10 × (50/2) = 250 N', category: 'Hitungan' },
  { id: 'q6', answer: 'A₂ = 5 × (120/10) = 60 cm²', category: 'Hitungan' },
  { id: 'q7', answer: 'C — gaya diteruskan fluida dan bekerja pada piston rem yang lebih luas', category: 'Penerapan' },
  {
    id: 'q8',
    answer:
      'Gaya keluaran bertambah besar. Tekanan tetap, luas bertambah, sehingga F = P × A bertambah. (Kata kunci: tekanan, luas, gaya, bertambah)',
    category: 'Penalaran',
  },
  {
    id: 'q9',
    answer:
      'Tekanan = gaya per satuan luas; Gaya = dorongan/tarikan; Luas penampang = ukuran bidang; Hukum Pascal = tekanan diteruskan sama besar ke segala arah',
    category: 'Penalaran',
  },
  {
    id: 'q10',
    answer:
      'Tidak menciptakan energi. Gaya lebih besar disertai jarak perpindahan piston besar yang lebih pendek, sehingga usaha kira-kira tetap.',
    category: 'Penalaran',
  },
];

export function TeacherDashboard() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/8 bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-grape to-electric text-base font-black text-white">
            T
          </span>
          <div>
            <p className="text-sm font-extrabold tracking-wide text-white">PASCAL LAB</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-grape-light">
              Mode Guru
            </p>
          </div>
          <a
            href="/"
            className="ml-auto rounded-lg border border-white/12 px-3 py-1.5 text-xs font-semibold text-slate-300
                       transition-colors hover:border-aqua/50 hover:text-aqua focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-aqua"
          >
            ← Mode Siswa
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Panduan Guru</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
            PASCAL LAB dirancang dengan pendekatan inkuiri terbimbing: siswa mengamati fenomena, membuat
            prediksi, bereksperimen, menemukan pola, baru kemudian merumuskan Hukum Pascal. Rumus sengaja
            tidak diperkenalkan di awal.
          </p>
        </section>

        {/* Tujuan pembelajaran */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">🎯 Tujuan Pembelajaran</h2>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
            {[
              'Menjelaskan secara kualitatif apa yang dimaksud dengan tekanan.',
              'Menghubungkan tekanan dengan gaya dan luas permukaan.',
              'Menjelaskan prinsip dasar Hukum Pascal secara kualitatif.',
              'Menyatakan bahwa tekanan yang diberikan pada fluida tertutup diteruskan ke seluruh bagian fluida.',
              'Menggunakan persamaan P = F / A untuk menyelesaikan masalah sederhana.',
              'Menggunakan Hukum Pascal P₁ = P₂ sehingga F₁/A₁ = F₂/A₂.',
              'Menghitung gaya, luas, atau tekanan yang belum diketahui pada sistem hidrolik sederhana.',
              'Menjelaskan mengapa sistem hidrolik dapat menghasilkan gaya keluaran yang lebih besar.',
              'Mengidentifikasi penerapan Hukum Pascal dalam kehidupan sehari-hari.',
              'Menjelaskan konsep menggunakan bukti dari eksperimen atau simulasi.',
            ].map((t, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-0.5 font-mono text-xs text-aqua">{String(i + 1).padStart(2, '0')}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Alur pembelajaran */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">🗓️ Saran Urutan Pembelajaran</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {MEETINGS.map((m) => (
              <div key={m.n} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-2 text-sm font-bold text-aqua">{m.title}</p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-slate-600">•</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Peta misi & model 5E */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">🧭 Pemetaan Model 5E</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left">
                  {['Tahap 5E', 'Misi', 'Fokus'].map((h) => (
                    <th key={h} className="border-b border-white/10 pb-2 pr-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MISSIONS.map((m) => (
                  <tr key={m.id} className="border-b border-white/6">
                    <td className="py-2.5 pr-4">
                      <span className="chip !px-2 !py-0.5 !text-[9px]">{m.phase}</span>
                    </td>
                    <td className="py-2.5 pr-4 font-semibold text-slate-200">
                      {m.code} — {m.title}
                    </td>
                    <td className="py-2.5 text-slate-400">{m.objective}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Miskonsepsi */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">⚠️ Miskonsepsi Umum & Koreksinya</h2>
          <div className="space-y-3">
            {MISCONCEPTIONS.map((m) => (
              <div key={m.salah} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-amber-200">
                  <span className="font-bold">Miskonsepsi:</span> {m.salah}
                </p>
                <p className="mt-1.5 text-sm text-emerald-200">
                  <span className="font-bold">Koreksi:</span> {m.koreksi}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pertanyaan pemandu */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">💬 Pertanyaan Pemandu Diskusi</h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-slate-300">
            {DISCUSSION_PROMPTS.map((p, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-0.5 font-mono text-xs text-grape-light">{String(i + 1).padStart(2, '0')}</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Blueprint penilaian */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">📊 Kisi-kisi Penilaian (Pascal Challenge)</h2>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Konseptual', pct: '30%', count: 3, tone: 'text-aqua' },
              { label: 'Hitungan / Penerapan', pct: '40%', count: 4, tone: 'text-electric-light' },
              { label: 'Penalaran', pct: '30%', count: 3, tone: 'text-grape-light' },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className={`font-mono text-xl font-extrabold ${c.tone}`}>{c.pct}</p>
                <p className="text-sm font-semibold text-slate-200">{c.label}</p>
                <p className="text-xs text-slate-500">{c.count} butir soal</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Total {QUIZ.length} butir, masing-masing berbobot 1 poin. Soal penalaran dinilai dengan pencocokan
            kata kunci konsep, sehingga jawaban siswa tidak harus identik dengan kunci.
          </p>
        </section>

        {/* Kunci jawaban */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">🔑 Kunci Jawaban</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="text-left">
                  {['No', 'Kategori', 'Jawaban / Gagasan Kunci'].map((h) => (
                    <th key={h} className="border-b border-white/10 pb-2 pr-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {QUIZ_KEY.map((k, i) => (
                  <tr key={k.id} className="border-b border-white/6">
                    <td className="py-2.5 pr-4 font-mono text-slate-400">{i + 1}</td>
                    <td className="py-2.5 pr-4">
                      <span className="chip !px-2 !py-0.5 !text-[9px]">{k.category}</span>
                    </td>
                    <td className="py-2.5 leading-relaxed text-slate-300">{k.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Catatan implementasi */}
        <section className="glass p-6">
          <h2 className="mb-4 text-lg font-bold text-white">🛠️ Catatan Implementasi Kelas</h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-slate-300">
            <li className="flex gap-2.5">
              <span className="text-aqua">•</span>
              Siswa dapat bekerja berpasangan pada Misi 03, lalu membandingkan tabel data antar kelompok.
            </li>
            <li className="flex gap-2.5">
              <span className="text-aqua">•</span>
              Tahan diri untuk tidak memberikan rumus sebelum siswa menyelesaikan Misi 04 — justru di situlah
              pembelajaran bermakna terjadi.
            </li>
            <li className="flex gap-2.5">
              <span className="text-aqua">•</span>
              Gunakan pertanyaan "Apa yang tetap sama?" secara berulang untuk mengarahkan penemuan tekanan.
            </li>
            <li className="flex gap-2.5">
              <span className="text-aqua">•</span>
              Bagian <em>Mode Peneliti</em> di Misi 04 dapat dijadikan pengayaan bagi siswa yang sudah cepat
              memahami.
            </li>
            <li className="flex gap-2.5">
              <span className="text-aqua">•</span>
              Kemajuan siswa tersimpan di <span className="font-mono text-slate-200">localStorage</span>{' '}
              perangkat masing-masing. Ingatkan siswa untuk tidak menghapus data peramban sebelum penilaian.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}