// src/components/PressureSimulator.tsx
import { useMemo, useState } from 'react';
import { Slider } from './Slider';
import { PressureConceptArt } from './Illustrations';
import { fmt, fmtPa, pressurePa } from '../lib/physics';

interface PressureSimulatorProps {
  initialForce?: number;
  initialArea?: number;
  forceRange?: [number, number];
  areaRange?: [number, number];
  accent?: string;
  label?: string;
  onValues?: (f: number, a: number) => void;
}

export function PressureSimulator({
  initialForce = 10,
  initialArea = 0.01,
  forceRange = [1, 60],
  areaRange = [0.001, 0.2],
  accent = '#2f7bff',
  label,
  onValues,
}: PressureSimulatorProps) {
  const [force, setForce] = useState(initialForce);
  const [area, setArea] = useState(initialArea);

  const pressure = useMemo(() => pressurePa(force, area), [force, area]);

  const update = (f: number, a: number) => {
    setForce(f);
    setArea(a);
    onValues?.(f, a);
  };

  return (
    <div className="glass p-4 sm:p-5">
      {label && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-aqua">{label}</p>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-navy-900/50 p-2">
          <PressureConceptArt force={force} areaM2={area} pressure={pressure} />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <Slider
            label="Gaya (F)"
            symbol="F"
            value={force}
            min={forceRange[0]}
            max={forceRange[1]}
            step={1}
            unit="N"
            thumbColor={accent}
            onChange={(v) => update(v, area)}
            hint="Besarnya dorongan yang diberikan pada permukaan."
          />
          <Slider
            label="Luas permukaan (A)"
            symbol="A"
            value={area}
            min={areaRange[0]}
            max={areaRange[1]}
            step={0.001}
            unit="m²"
            thumbColor="#8b5cf6"
            onChange={(v) => update(force, v)}
            hint="Semakin kecil luas sentuh, semakin besar tekanannya."
          />

          <div className="grid grid-cols-2 gap-2">
            <div className="readout">
              <p className="readout-label">Gaya</p>
              <p className="readout-value">{fmt(force, 0)} N</p>
            </div>
            <div className="readout">
              <p className="readout-label">Luas</p>
              <p className="readout-value">{fmt(area, 3)} m²</p>
            </div>
            <div className="readout col-span-2 border-electric/25 bg-electric/[0.07]">
              <p className="readout-label">Tekanan = F / A</p>
              <p className="font-mono text-lg font-bold text-white">{fmtPa(pressure)}</p>
              <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                = {fmt(force, 0)} N ÷ {fmt(area, 3)} m²
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}