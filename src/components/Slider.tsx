// src/components/Slider.tsx
interface SliderProps {
  label: string;
  symbol?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  thumbColor?: string;
  disabled?: boolean;
  hint?: string;
  onChange: (v: number) => void;
}

export function Slider({
  label,
  symbol,
  value,
  min,
  max,
  step = 1,
  unit,
  thumbColor = '#2f7bff',
  disabled = false,
  hint,
  onChange,
}: SliderProps) {
  const id = `slider-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={disabled ? 'opacity-60' : ''}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="label-text">
          {label}
          {symbol && <span className="ml-2 font-mono text-aqua">{symbol}</span>}
        </label>
        <span className="font-mono text-sm font-semibold text-white">
          {value.toLocaleString('id-ID', { maximumFractionDigits: 2 })}
          {unit ? ` ${unit}` : ''}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={`${label}${unit ? ` dalam ${unit}` : ''}`}
        aria-valuetext={`${value} ${unit ?? ''}`}
        style={{ ['--thumb' as string]: thumbColor }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <p className="mt-1.5 text-[11px] leading-snug text-slate-500">{hint}</p>}
    </div>
  );
}