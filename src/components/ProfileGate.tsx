// src/components/ProfileGate.tsx
import { useState } from 'react';
import { useLab } from '../state/LabContext';

interface ProfileGateProps {
  onDone: () => void;
  onBack: () => void;
}

const CLASS_OPTIONS = ['9A', '9B', '9C', '9D', '9E', '9F', 'Lainnya'];

export function ProfileGate({ onDone, onBack }: ProfileGateProps) {
  const { state, setStudent } = useLab();
  const [name, setName] = useState(state.student?.name ?? '');
  const [kelas, setKelas] = useState(state.student?.className ?? '');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('Tulis nama panggilanmu (minimal 2 huruf).');
      return;
    }
    if (!kelas.trim()) {
      setError('Pilih atau tulis kelasmu.');
      return;
    }
    setStudent({ name: trimmed, className: kelas.trim() });
    onDone();
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-10 sm:px-6">
      <form onSubmit={submit} className="glass-strong animate-riseIn p-6 sm:p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-electric to-aqua text-2xl text-navy-950">
            🧑‍🔬
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Kartu Investigator
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Isi datamu untuk memulai misi. Data hanya tersimpan di perangkat ini — tidak perlu mendaftar akun.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="nama" className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-400">
              Nama Panggilan
            </label>
            <input
              id="nama"
              type="text"
              value={name}
              maxLength={24}
              autoComplete="off"
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Contoh: Rani"
              className="w-full rounded-xl border border-white/12 bg-navy-900/70 px-4 py-3 text-sm text-white
                         placeholder:text-slate-600 focus-visible:border-aqua focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-aqua/40"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-400">
              Kelas
            </span>
            <div className="mb-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Pilih kelas">
              {CLASS_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={kelas === c}
                  onClick={() => {
                    setKelas(c === 'Lainnya' ? '' : c);
                    setError('');
                  }}
                  className={[
                    'rounded-lg border px-3.5 py-2 text-xs font-bold transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua',
                    kelas === c
                      ? 'border-aqua/60 bg-aqua/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25',
                  ].join(' ')}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={kelas}
              maxLength={12}
              autoComplete="off"
              onChange={(e) => {
                setKelas(e.target.value);
                setError('');
              }}
              placeholder="Atau tulis kelasmu, mis. 9B"
              aria-label="Tulis kelas"
              className="w-full rounded-xl border border-white/12 bg-navy-900/70 px-4 py-2.5 text-sm text-white
                         placeholder:text-slate-600 focus-visible:border-aqua focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-aqua/40"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/[0.08] px-4 py-2.5 text-sm text-amber-100" role="alert">
            ⚠️ {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="submit" className="btn-primary flex-1">
            MASUK LABORATORIUM
          </button>
          <button type="button" className="btn-ghost" onClick={onBack}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}