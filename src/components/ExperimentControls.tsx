// src/components/ExperimentControls.tsx
import { Slider } from './Slider';

export type ExperimentMode = 'A' | 'B' | 'C' | 'FREE';

interface ExperimentControlsProps {
  mode: ExperimentMode;
  F1: number;
  A1: number;
  A2: number;
  onF1: (v: number) => void;
  onA1: (v: number) => void;
  onA2: (v: number) => void;
  locked: { F1: boolean; A1: boolean; A2: boolean };
  onRecord: () => void;
  onReset: () => void;
  canRecord: boolean;
  recorded: boolean;
}

export function ExperimentControls({
  mode,
  F1,
  A1,
  A2,
  onF1,
  onA1,
  onA2,
  locked,
  onRecord,
  onReset,
  canRecord,
  recorded,
}: ExperimentControlsProps) {
  return (
    <div className="glass p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="label-text">Panel Kontrol Percobaan</p>
        <span className="chip">
          {mode === 'FREE' ? 'Mode Bebas' : `Percobaan ${mode}`}
        </span>
      </div>

      <div className="space-y-5">
        <Slider
          label="Gaya pada piston A"
          symbol="F₁"
          value={F1}
          min={1}
          max={300}
          step={1}
          unit="N"
          thumbColor="#2f7bff"
          disabled={locked.F1}
          onChange={onF1}
          hint={locked.F1 ? 'Variabel ini dijaga tetap pada percobaan ini.' : undefined}
        />
        <Slider
          label="Luas piston A"
          symbol="A₁"
          value={A1}
          min={1}
          max={40}
          step={1}
          unit="cm²"
          thumbColor="#22d3ee"
          disabled={locked.A1}
          onChange={onA1}
          hint={locked.A1 ? 'Variabel ini dijaga tetap pada percobaan ini.' : undefined}
        />
        <Slider
          label="Luas piston B"
          symbol="A₂"
          value={A2}
          min={5}
          max={200}
          step={5}
          unit="cm²"
          thumbColor="#8b5cf6"
          disabled={locked.A2}
          onChange={onA2}
          hint={locked.A2 ? 'Variabel ini dijaga tetap pada percobaan ini.' : undefined}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="btn-primary flex-1"
          onClick={onRecord}
          disabled={!canRecord}
          title={!canRecord ? 'Lakukan prediksi terlebih dahulu' : undefined}
        >
          📋 CATAT DATA
        </button>
        <button type="button" className="btn-ghost sm:w-auto" onClick={onReset}>
          ↺ RESET PERCOBAAN
        </button>
      </div>

      {!canRecord && (
        <p className="mt-2 text-xs text-amber-300">
          Buat prediksi terlebih dahulu sebelum menjalankan percobaan ini.
        </p>
      )}
      {recorded && canRecord && (
        <p className="mt-2 text-xs text-emerald-300">
          Data percobaan ini sudah tercatat. Ubah variabel lalu catat lagi untuk membandingkan.
        </p>
      )}
    </div>
  );
}