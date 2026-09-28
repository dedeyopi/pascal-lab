import type { ExperimentRow } from '../types';
import { fmt } from '../lib/physics';

interface Props {
  rows: ExperimentRow[];
  highlightPressure?: boolean;
  onClear?: () => void;
  onRemove?: (id: string) => void;
}

const MODE_COLOR: Record<string, string> = {
  A: 'text-electric-light',
  B: 'text-grape-light',
  C: 'text-aqua',
  Bebas: 'text-slate-300',
};

export function ExperimentDataTable({
  rows,
  highlightPressure = false,
  onClear,
  onRemove,
}: Props) {
  if (rows.length === 0) {
    return (
      <div className="glass p-6 text-center">
        <p className="text-sm text-slate-400">
          Belum ada data. Jalankan percobaan lalu tekan{' '}
          <span className="font-semibold text-aqua">CATAT DATA</span>.
        </p>
      </div>
    );
  }

  const handleClearAll = () => {
    if (!onClear) return;
    const ok = window.confirm(
      `Hapus semua ${rows.length} data percobaan?\nTindakan ini tidak dapat dibatalkan.`,
    );
    if (ok) onClear();
  };

  const handleRemoveOne = (id: string, label: string) => {
    if (!onRemove) return;
    const ok = window.confirm(`Hapus data percobaan "${label}"?`);
    if (ok) onRemove(id);
  };

  return (
    <div className="glass overflow-hidden">
      {/* Header tabel */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div>
          <p className="label-text">Tabel Data Percobaan</p>
          <p className="mt-0.5 text-xs text-slate-500">{rows.length} data tercatat</p>
        </div>
        {onClear && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/[0.08]
                       px-3 py-1.5 text-xs font-bold text-amber-200 transition-all
                       hover:border-amber-400/60 hover:bg-amber-400/15
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span aria-hidden="true">🗑</span>
            Hapus semua
          </button>
        )}
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <caption className="sr-only">
            Data hasil percobaan sistem hidrolik: gaya, luas, tekanan, dan gaya keluaran
          </caption>
          <thead>
            <tr className="bg-white/[0.03] text-left">
              {[
                'Percobaan',
                'F₁ (N)',
                'A₁ (cm²)',
                'P₁ (Pa)',
                'A₂ (cm²)',
                'F₂ (N)',
                'P₂ (Pa)',
              ].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400"
                >
                  {h}
                </th>
              ))}
              {onRemove && (
                <th
                  scope="col"
                  className="w-14 px-3 py-2.5 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400"
                >
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="group border-t border-white/6 transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-4 py-2.5">
                  <span
                    className={`font-mono text-xs font-bold ${
                      MODE_COLOR[r.experiment] ?? 'text-slate-300'
                    }`}
                  >
                    {r.experiment}
                  </span>
                  <span className="ml-2 text-xs text-slate-500">{r.label}</span>
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-200">{fmt(r.F1, 1)}</td>
                <td className="px-4 py-2.5 font-mono text-slate-200">{fmt(r.A1, 1)}</td>
                <td
                  className={`px-4 py-2.5 font-mono ${
                    highlightPressure ? 'font-bold text-aqua' : 'text-slate-300'
                  }`}
                >
                  {fmt(r.P1, 0)}
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-200">{fmt(r.A2, 1)}</td>
                <td className="px-4 py-2.5 font-mono font-semibold text-grape-light">
                  {fmt(r.F2, 1)}
                </td>
                <td
                  className={`px-4 py-2.5 font-mono ${
                    highlightPressure ? 'font-bold text-aqua' : 'text-slate-300'
                  }`}
                >
                  {fmt(r.P2, 0)}
                </td>

                {onRemove && (
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveOne(r.id, `${r.experiment} — ${r.label}`)
                      }
                      aria-label={`Hapus data percobaan ${r.experiment}: ${r.label}`}
                      title="Hapus baris ini"
                      className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/[0.02]
                                 text-slate-400 opacity-60 transition-all
                                 hover:border-red-400/60 hover:bg-red-400/10 hover:text-red-300 hover:opacity-100
                                 group-hover:opacity-100
                                 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 2 L10 10 M10 2 L2 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {highlightPressure && (
        <p className="border-t border-white/10 bg-aqua/[0.05] px-4 py-2.5 text-xs text-aqua">
          Perhatikan kolom P₁ dan P₂ — bandingkan nilainya pada setiap baris.
        </p>
      )}
    </div>
  );
}