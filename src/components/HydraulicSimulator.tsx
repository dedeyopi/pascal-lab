import { useMemo } from 'react';
import { clamp, fmt, fmtPa, solveHydraulic } from '../lib/physics';

interface HydraulicSimulatorProps {
  F1: number;
  A1: number;
  A2: number;
  maxF1?: number;
  highlight?: 'A' | 'B' | null;
  showReadouts?: boolean;
}

export function HydraulicSimulator({
  F1,
  A1,
  A2,
  maxF1 = 300,
  highlight = null,
  showReadouts = true,
}: HydraulicSimulatorProps) {
  const { P1, P2, F2, ratio } = useMemo(() => solveHydraulic(F1, A1, A2), [F1, A1, A2]);

  const normF = clamp(F1 / maxF1, 0, 1);
  const intensity = clamp(P1 / 400_000, 0, 1);

  // ==== Lebar visual piston (akar luas → kontras jelas) ====
  const wA = 40 + 32 * Math.sqrt(clamp(A1, 1, 60) / 60); // 40 – 72 px
  const wB = 100 + 130 * Math.sqrt(clamp(A2, 1, 220) / 220); // 100 – 230 px

  // Perpindahan visual
  const pushA = 6 + normF * 22; // 6 – 28 px turun
  const pushB = clamp(pushA * (A1 / Math.max(A2, 0.001)) * 3.2, 2, 20); // 2 – 20 px naik

  // ==== Layout silinder ====
  const cylTopY = 150;
  const cylHeight = 280;
  const cylBottomY = 430;

  const cylAx = 40;
  const cylAw = 140; // ← KECIL
  const cylAcx = cylAx + cylAw / 2; // 110

  const cylBx = 480;
  const cylBw = 280; // ← BESAR (2× lebih lebar)
  const cylBcx = cylBx + cylBw / 2; // 620

  // Posisi piston (tanpa displacement)
  const pistonRestY = 320;
  const plateAThk = 16;
  const plateBThk = 22;

  const fluidOpacity = 0.55 + intensity * 0.35;
  const flowActive = intensity > 0.05;
  const trans = 'transform 0.4s cubic-bezier(.2,.7,.3,1)';
  const fluidTrans = 'y 0.4s cubic-bezier(.2,.7,.3,1), height 0.4s cubic-bezier(.2,.7,.3,1)';

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy-800/70 to-navy-950/90 p-2 sm:p-4">
        <svg
          viewBox="0 0 800 500"
          className="h-auto w-full"
          role="img"
          aria-label={`Simulasi hidrolik. Gaya masukan ${fmt(F1)} newton pada piston A seluas ${fmt(
            A1,
          )} sentimeter persegi menghasilkan tekanan ${fmtPa(P1)}. Piston B seluas ${fmt(
            A2,
          )} sentimeter persegi menghasilkan gaya ${fmt(F2)} newton.`}
        >
          <defs>
            <linearGradient
              id="hs-fluid"
              x1="0"
              y1="200"
              x2="0"
              y2="430"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#67e8f9" stopOpacity={fluidOpacity} />
              <stop
                offset="100%"
                stopColor="#0891b2"
                stopOpacity={Math.min(1, fluidOpacity + 0.25)}
              />
            </linearGradient>

            <linearGradient id="hs-rod" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="45%" stopColor="#e2e8f5" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="hs-piston" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f5" />
              <stop offset="100%" stopColor="#8ea3c6" />
            </linearGradient>

            <linearGradient id="hs-load" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            <filter id="hs-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ==== GRID ==== */}
          <g opacity="0.1" stroke="#7aa2ff" strokeWidth="1">
            {Array.from({ length: 17 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
            ))}
          </g>

          {/* ==== PIPA PENGHUBUNG (belakang) ==== */}
          <rect
            x={cylAx}
            y={cylBottomY - 44}
            width={cylBx + cylBw - cylAx}
            height={44}
            rx={16}
            fill="#0a1530"
            stroke="#3b5b8f"
            strokeWidth="2.5"
          />
          <rect
            x={cylAx + 4}
            y={cylBottomY - 40}
            width={cylBx + cylBw - cylAx - 8}
            height={36}
            rx={12}
            fill="url(#hs-fluid)"
          />
          <g
            stroke="#e0f2fe"
            strokeWidth="2.2"
            fill="none"
            opacity={0.3 + intensity * 0.55}
          >
            <path
              className={flowActive ? 'flow-line' : ''}
              d={`M ${cylAcx + 30} ${cylBottomY - 30} H ${cylBcx - 20}`}
            />
            <path
              className={flowActive ? 'flow-line' : ''}
              d={`M ${cylAcx + 30} ${cylBottomY - 16} H ${cylBcx - 20}`}
            />
          </g>

          {/* ==== SILINDER A (KECIL) ==== */}
          <rect
            x={cylAx}
            y={cylTopY}
            width={cylAw}
            height={cylHeight}
            rx={12}
            fill="#0a1530"
            stroke={highlight === 'A' ? '#22d3ee' : '#3b5b8f'}
            strokeWidth={highlight === 'A' ? 4 : 2.5}
          />

          {/* Fluida A */}
          <rect
            x={cylAx + 4}
            width={cylAw - 8}
            rx={8}
            fill="url(#hs-fluid)"
            style={{
              y: `${pistonRestY + pushA + plateAThk}px`,
              height: `${cylBottomY - pistonRestY - pushA - plateAThk - 4}px`,
              transition: fluidTrans,
            }}
          />

          {/* ==== SILINDER B (BESAR) ==== */}
          <rect
            x={cylBx}
            y={cylTopY}
            width={cylBw}
            height={cylHeight}
            rx={14}
            fill="#0a1530"
            stroke={highlight === 'B' ? '#a78bfa' : '#3b5b8f'}
            strokeWidth={highlight === 'B' ? 4 : 2.5}
          />

          {/* Fluida B */}
          <rect
            x={cylBx + 4}
            width={cylBw - 8}
            rx={10}
            fill="url(#hs-fluid)"
            style={{
              y: `${pistonRestY - pushB + plateBThk}px`,
              height: `${cylBottomY - pistonRestY + pushB - plateBThk - 4}px`,
              transition: fluidTrans,
            }}
          />

          {/* ==== PISTON A (kecil, turun saat F₁ naik) ==== */}
          <g style={{ transform: `translateY(${pushA}px)`, transition: trans }}>
            {/* Batang tipis */}
            <rect
              x={cylAcx - 7}
              y={pistonRestY - 180}
              width={14}
              height={180}
              rx={4}
              fill="url(#hs-rod)"
            />
            {/* Top cap kecil */}
            <rect
              x={cylAcx - 26}
              y={pistonRestY - 196}
              width={52}
              height={14}
              rx={5}
              fill="url(#hs-piston)"
            />
            {/* Piston plate */}
            <rect
              x={cylAcx - wA / 2}
              y={pistonRestY}
              width={wA}
              height={plateAThk}
              rx={7}
              fill="url(#hs-piston)"
            />

            {/* Panah F₁ */}
            <g filter="url(#hs-glow)">
              <line
                x1={cylAcx}
                y1={pistonRestY - 236}
                x2={cylAcx}
                y2={pistonRestY - 218}
                stroke="#22d3ee"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <polygon
                points={`${cylAcx},${pistonRestY - 204} ${cylAcx - 11},${pistonRestY - 224} ${cylAcx + 11},${pistonRestY - 224}`}
                fill="#22d3ee"
              />
            </g>
          </g>

          {/* Label F₁ */}
          <text
            x={cylAcx}
            y={pistonRestY - 248}
            textAnchor="middle"
            fill="#67e8f9"
            fontSize="15"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            F₁ = {fmt(F1, 1)} N
          </text>

          {/* ==== PISTON B (besar, naik) ==== */}
          <g style={{ transform: `translateY(${-pushB}px)`, transition: trans }}>
            {/* Batang tebal */}
            <rect
              x={cylBcx - 13}
              y={pistonRestY - 200}
              width={26}
              height={200}
              rx={5}
              fill="url(#hs-rod)"
            />
            {/* Top cap besar */}
            <rect
              x={cylBcx - 46}
              y={pistonRestY - 220}
              width={92}
              height={20}
              rx={7}
              fill="url(#hs-piston)"
            />
            {/* Piston plate */}
            <rect
              x={cylBcx - wB / 2}
              y={pistonRestY}
              width={wB}
              height={plateBThk}
              rx={9}
              fill="url(#hs-piston)"
            />

            {/* Beban */}
            <rect
              x={cylBcx - 90}
              y={pistonRestY - 300}
              width={180}
              height={60}
              rx={10}
              fill="url(#hs-load)"
              stroke="#6d28d9"
              strokeWidth="1.2"
            />
            <text
              x={cylBcx}
              y={pistonRestY - 264}
              textAnchor="middle"
              fill="#f5f3ff"
              fontSize="14"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              BEBAN
            </text>

            {/* Panah F₂ di kanan, cukup margin */}
            <g filter="url(#hs-glow)">
              <line
                x1={cylBcx + 110}
                y1={pistonRestY - 60}
                x2={cylBcx + 110}
                y2={pistonRestY - 130}
                stroke="#a78bfa"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <polygon
                points={`${cylBcx + 110},${pistonRestY - 150} ${cylBcx + 99},${pistonRestY - 128} ${cylBcx + 121},${pistonRestY - 128}`}
                fill="#a78bfa"
              />
            </g>
          </g>

          {/* Label F₂ statis, di posisi aman */}
          <text
            x={cylBcx + 110}
            y={pistonRestY - 162}
            textAnchor="middle"
            fill="#c4b5fd"
            fontSize="15"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            F₂ = {fmt(F2, 0)} N
          </text>

          {/* ==== LABEL A₁ & A₂ ==== */}
          <text
            x={cylAcx}
            y={cylBottomY + 32}
            textAnchor="middle"
            fill="#67e8f9"
            fontSize="13"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            A₁ = {fmt(A1, 1)} cm²
          </text>
          <text
            x={cylBcx}
            y={cylBottomY + 32}
            textAnchor="middle"
            fill="#c4b5fd"
            fontSize="13"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            A₂ = {fmt(A2, 1)} cm²
          </text>

          {/* ==== BADGE P₁ = P₂ ==== */}
          <g>
            <rect
              x="356"
              y={cylTopY + 30}
              width="90"
              height="28"
              rx="14"
              fill="#0a1530"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <text
              x="401"
              y={cylTopY + 49}
              textAnchor="middle"
              fill="#67e8f9"
              fontSize="13"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              P₁ = P₂
            </text>
          </g>

          {/* Caption bawah */}
          <text
            x="400"
            y="485"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="12"
            fontWeight="600"
          >
            Perubahan tekanan diteruskan melalui fluida tertutup
          </text>
        </svg>
      </div>

      {showReadouts && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Readout label="F₁ (masuk)" value={`${fmt(F1, 1)} N`} tone="in" />
          <Readout label="A₁" value={`${fmt(A1, 1)} cm²`} tone="in" />
          <Readout label="P₁" value={fmtPa(P1)} tone="in" />
          <Readout label="P₂" value={fmtPa(P2)} tone="out" />
          <Readout label="A₂" value={`${fmt(A2, 1)} cm²`} tone="out" />
          <Readout label="F₂ (keluar)" value={`${fmt(F2, 1)} N`} tone="out" />
        </div>
      )}

      <p className="mt-2 text-center text-xs text-slate-500">
        Perbandingan luas A₂ : A₁ ={' '}
        <span className="font-mono text-aqua">{fmt(ratio, 1)}×</span> · Perbandingan gaya F₂ : F₁ ={' '}
        <span className="font-mono text-grape-light">
          {fmt(F2 / Math.max(F1, 0.0001), 1)}×
        </span>
      </p>
    </div>
  );
}

function Readout({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'in' | 'out';
}) {
  return (
    <div
      className={`readout border ${
        tone === 'in'
          ? 'border-aqua/20 bg-aqua/[0.05]'
          : 'border-grape/20 bg-grape/[0.05]'
      }`}
    >
      <p className="readout-label">{label}</p>
      <p
        className={`font-mono text-sm font-semibold ${
          tone === 'in' ? 'text-aqua' : 'text-grape-light'
        }`}
      >
        {value}
      </p>
    </div>
  );
}