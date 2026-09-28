// src/components/UnitConverter.tsx
import { useState } from 'react';
import { cm2ToM2, fmt, m2ToCm2 } from '../lib/physics';

export function UnitConverter() {
  const [cm2, setCm2] = useState(5);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="label-text mb-3">🔁 Konversi Satuan Luas</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Luas (cm²)</span>
          <input
            type="number"
            inputMode="decimal"
            value={cm2}
            min={0}
            step={0.5}
            onChange={(e) => setCm2(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-white/12 bg-navy-900/70 px-3 py-2 font-mono text-sm text-white
                       focus-visible:border-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/40"
            aria-label="Luas dalam sentimeter persegi"
          />
        </label>
        <div>
          <span className="mb-1 block text-xs text-slate-400">Luas (m²)</span>
          <div className="rounded-xl border border-aqua/25 bg-aqua/[0.06] px-3 py-2 font-mono text-sm font-semibold text-aqua">
            {cm2ToM2(cm2).toExponential(4).replace('.', ',')} m²
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        1 cm² = 0,0001 m². Karena itu, <span className="font-mono text-slate-300">{fmt(cm2)} cm²</span> ={' '}
        <span className="font-mono text-slate-300">{m2ToCm2(cm2ToM2(cm2)).toFixed(4)}</span> × 10⁻⁴ m².
      </p>
      <p className="mt-2 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-3 py-2 text-xs text-amber-100">
        ⚠️ Pastikan satuan luas yang digunakan konsisten. Bila kedua luas dinyatakan dalam cm², kamu boleh
        langsung memakai perbandingan A₂/A₁.
      </p>
    </div>
  );
}