// src/components/Illustrations.tsx
/* Ilustrasi SVG orisinal — gaya diagram ilmiah, bukan gambar stok. */

export function HeroHydraulicArt() {
  return (
    <svg
      viewBox="0 0 560 360"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram sistem hidrolik: piston kecil menekan fluida, tekanan diteruskan melalui pipa, piston besar terangkat"
    >
      <defs>
        <linearGradient id="hg-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2f7bff" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="hg-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#7f9cc9" />
        </linearGradient>
        <linearGradient id="hg-rod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8bcdd" />
          <stop offset="100%" stopColor="#5f7799" />
        </linearGradient>
        <filter id="hg-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="hg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#22d3ee" />
        </marker>
      </defs>

      {/* Piston A — silinder kecil */}
      <rect x="72" y="56" width="86" height="196" rx="10" fill="none" stroke="#3b5b8f" strokeWidth="2.5" />
      <rect x="72" y="188" width="86" height="64" rx="8" fill="url(#hg-fluid)" />

      {/* Batang & pelat piston A */}
      <rect x="106" y="86" width="18" height="96" rx="5" fill="url(#hg-rod)" />
      <rect x="76" y="176" width="78" height="18" rx="6" fill="url(#hg-metal)" />
      <rect x="86" y="66" width="58" height="14" rx="6" fill="url(#hg-metal)" />

      {/* Gaya masuk F1 */}
      <g filter="url(#hg-glow)">
        <line x1="115" y1="16" x2="115" y2="58" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#hg-arrow)" />
      </g>
      <text x="115" y="12" textAnchor="middle" fill="#67e8f9" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        F₁
      </text>

      {/* Pipa penghubung */}
      <rect x="80" y="252" width="400" height="46" rx="12" fill="url(#hg-fluid)" />
      <rect x="80" y="252" width="400" height="46" rx="12" fill="none" stroke="#3b5b8f" strokeWidth="2.5" />

      {/* Piston B — silinder besar */}
      <rect x="356" y="60" width="150" height="192" rx="12" fill="none" stroke="#3b5b8f" strokeWidth="2.5" />
      <rect x="356" y="176" width="150" height="76" rx="10" fill="url(#hg-fluid)" />

      <rect x="420" y="96" width="22" height="82" rx="6" fill="url(#hg-rod)" />
      <rect x="360" y="164" width="142" height="20" rx="7" fill="url(#hg-metal)" />

      {/* Beban */}
      <rect x="368" y="76" width="126" height="24" rx="8" fill="#8b5cf6" opacity="0.85" />
      <rect x="388" y="50" width="86" height="28" rx="7" fill="#a78bfa" opacity="0.9" />
      <circle cx="404" cy="106" r="8" fill="#0f1e42" />
      <circle cx="462" cy="106" r="8" fill="#0f1e42" />

      {/* Gaya keluaran F2 */}
      <g filter="url(#hg-glow)">
        <line x1="431" y1="120" x2="431" y2="72" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#hg-arrow)" />
      </g>
      <text x="452" y="140" fill="#67e8f9" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        F₂
      </text>

      {/* Arah tekanan di dalam fluida */}
      <g stroke="#a5f3fc" strokeWidth="2.2" fill="none" opacity="0.95">
        <path className="flow-line" d="M100 275 H 420" />
        <path className="flow-line" d="M120 288 H 400" />
        <path d="M400 275 q 14 0 14 -20" />
        <path d="M400 288 q 30 0 30 -40" />
      </g>

      <text x="270" y="330" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="600">
        Fluida tertutup — tekanan diteruskan ke segala arah
      </text>

      {/* Label area */}
      <text x="115" y="240" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        A₁ kecil
      </text>
      <text x="431" y="240" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        A₂ besar
      </text>
    </svg>
  );
}

export function HydraulicJackArt() {
  return (
    <svg
      viewBox="0 0 540 410"
      className="h-auto w-full"
      role="img"
      aria-label="Animasi dongkrak hidrolik: piston kecil ditekan turun oleh F1, fluida meneruskan tekanan, piston besar naik mengangkat mobil dengan gaya F2"
    >
      <defs>
        <linearGradient id="hj-car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="hj-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id="hj-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="hj-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="hj-rod" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="hj-wheel" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <filter id="hj-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ==== TANAH ==== */}
      <line x1="20" y1="356" x2="520" y2="356" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

      {/* ==== PIPA PENGHUBUNG (di belakang silinder) ==== */}
      <rect x="80" y="326" width="360" height="24" rx="12" fill="#0f172a" stroke="#334e7a" strokeWidth="2" />
      <rect x="84" y="330" width="352" height="16" rx="8" fill="url(#hj-fluid)" />
      <path className="flow-line" d="M 120 338 H 400" stroke="#a5f3fc" strokeWidth="2" fill="none" opacity="0.9" />
      <path className="flow-line" d="M 180 334 H 380" stroke="#a5f3fc" strokeWidth="1.5" fill="none" opacity="0.55" />

      {/* ==== SILINDER KECIL (A) ==== */}
      <rect x="38" y="160" width="94" height="196" rx="10" fill="#0f172a" stroke="#334e7a" strokeWidth="2" />

      {/* Fluida di silinder A — permukaan turun saat piston tertekan */}
      <rect x="42" y="252" width="86" height="102" rx="6" fill="url(#hj-fluid)">
        <animate
          attributeName="y"
          values="252; 272; 252"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="height"
          values="102; 82; 102"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </rect>

      {/* ==== PISTON A + PANAH F₁ (bergerak bersama) ==== */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        {/* Batang piston */}
        <rect x="70" y="92" width="30" height="160" rx="5" fill="url(#hj-rod)" />
        {/* Kepala piston */}
        <rect x="50" y="244" width="70" height="18" rx="6" fill="url(#hj-metal)" />

        {/* Panah F₁ dengan kepala panah polygon */}
        <g filter="url(#hj-glow)">
          <line x1="85" y1="30" x2="85" y2="78" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          <polygon points="85,90 74,74 96,74" fill="#22d3ee" />
        </g>
      </g>

      {/* Label F₁ — statis di atas */}
      <text
        x="85"
        y="20"
        textAnchor="middle"
        fill="#67e8f9"
        fontSize="18"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
      >
        F₁
      </text>

      {/* ==== SILINDER BESAR (B) ==== */}
      <rect x="278" y="160" width="224" height="196" rx="12" fill="#0f172a" stroke="#334e7a" strokeWidth="2" />

      {/* Fluida di silinder B — permukaan naik saat piston terangkat */}
      <rect x="282" y="252" width="216" height="102" rx="8" fill="url(#hj-fluid)">
        <animate
          attributeName="y"
          values="252; 244; 252"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="height"
          values="102; 110; 102"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </rect>

      {/* ==== PISTON B + PLATFORM + MOBIL + PANAH F₂ (naik bersama) ==== */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -8; 0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />

        {/* Batang piston B */}
        <rect x="342" y="136" width="96" height="112" rx="6" fill="url(#hj-rod)" />
        {/* Kepala piston B */}
        <rect x="282" y="244" width="216" height="18" rx="7" fill="url(#hj-metal)" />
        {/* Platform tempat mobil */}
        <rect
          x="266"
          y="112"
          width="248"
          height="20"
          rx="10"
          fill="url(#hj-metal)"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Bayangan mobil */}
        <ellipse cx="390" cy="110" rx="96" ry="4" fill="#000" opacity="0.35" />

        {/* Badan mobil — sedan dengan siluet realistis */}
        <path
          d="M 306 102
             L 306 74
             Q 306 68 312 66
             L 328 64
             L 350 34
             Q 354 28 362 28
             L 428 28
             Q 436 28 440 34
             L 462 64
             L 478 66
             Q 484 68 484 74
             L 484 102
             Q 484 106 480 106
             L 310 106
             Q 306 106 306 102 Z"
          fill="url(#hj-car-body)"
          stroke="#6d28d9"
          strokeWidth="1.5"
        />

        {/* Kaca depan & belakang */}
        <path
          d="M 358 32 L 432 32 Q 436 32 439 35 L 456 60 L 344 60 Z"
          fill="url(#hj-window)"
          opacity="0.92"
        />
        {/* Pembatas kaca (pilar tengah) */}
        <line x1="394" y1="32" x2="394" y2="60" stroke="#6d28d9" strokeWidth="1.5" opacity="0.45" />

        {/* Garis pintu */}
        <line x1="404" y1="62" x2="404" y2="100" stroke="#6d28d9" strokeWidth="1" opacity="0.35" />

        {/* Lampu depan */}
        <ellipse cx="480" cy="86" rx="3" ry="4.5" fill="#fef08a" />
        {/* Lampu belakang */}
        <ellipse cx="308" cy="88" rx="2" ry="4" fill="#f87171" opacity="0.85" />

        {/* Roda belakang */}
        <circle cx="336" cy="102" r="16" fill="url(#hj-wheel)" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="336" cy="102" r="7" fill="#475569" />
        <circle cx="336" cy="102" r="2.5" fill="#94a3b8" />

        {/* Roda depan */}
        <circle cx="454" cy="102" r="16" fill="url(#hj-wheel)" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="454" cy="102" r="7" fill="#475569" />
        <circle cx="454" cy="102" r="2.5" fill="#94a3b8" />

        {/* Panah F₂ — di kanan platform, kepala panah polygon */}
        <g filter="url(#hj-glow)">
          <line x1="520" y1="260" x2="520" y2="164" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
          <polygon points="520,152 509,168 531,168" fill="#a78bfa" />
        </g>
      </g>

      {/* Label F₂ — statis di kanan atas panah */}
      <text
        x="520"
        y="142"
        textAnchor="middle"
        fill="#c4b5fd"
        fontSize="18"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
      >
        F₂
      </text>

      {/* ==== LABEL LUAS PENAMPANG ==== */}
      <text
        x="85"
        y="386"
        textAnchor="middle"
        fill="#67e8f9"
        fontSize="12"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
      >
        A₁ kecil
      </text>
      <text
        x="390"
        y="386"
        textAnchor="middle"
        fill="#c4b5fd"
        fontSize="12"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
      >
        A₂ besar
      </text>

      {/* ==== BADGE P₁ = P₂ ==== */}
      <g>
        <rect
          x="196"
          y="200"
          width="98"
          height="28"
          rx="14"
          fill="#0f172a"
          stroke="#22d3ee"
          strokeWidth="1.5"
        />
        <text
          x="245"
          y="219"
          textAnchor="middle"
          fill="#67e8f9"
          fontSize="13"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
        >
          P₁ = P₂
        </text>
      </g>
    </svg>
  );
}
export function PressureConceptArt({
  force,
  areaM2,
  pressure,
}: {
  force: number;
  areaM2: number;
  pressure: number;
}) {
  const halfWidth = Math.max(8, Math.min(120, Math.sqrt(areaM2) * 190));
  const intensity = Math.min(1, pressure / 6000);
  const color = `hsl(${(1 - intensity) * 190 + 5}, 90%, ${58 + intensity * 6}%)`;
  const dent = 6 + intensity * 20;

  return (
    <svg viewBox="0 0 340 220" className="h-auto w-full" role="img"
      aria-label={`Gaya ${force} newton pada luas ${areaM2} meter persegi menghasilkan tekanan ${Math.round(pressure)} pascal`}>
      <defs>
        <linearGradient id="pc-block" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#7f9cc9" />
        </linearGradient>
        <marker id="pc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#22d3ee" />
        </marker>
      </defs>

      {/* Gaya ke bawah */}
      <line x1="170" y1="18" x2="170" y2="60" stroke="#22d3ee" strokeWidth="5" markerEnd="url(#pc-arrow)" />
      <text x="170" y="14" textAnchor="middle" fill="#67e8f9" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        F = {force} N
      </text>

      {/* Balok penekan */}
      <rect x={170 - halfWidth} y="62" width={halfWidth * 2} height="34" rx="7" fill="url(#pc-block)" />

      {/* Permukaan */}
      <rect x="18" y={150 + dent} width="304" height="40" rx="10" fill="#0f1e42" stroke="#3b5b8f" strokeWidth="2" />
      <path
        d={`M18 ${150 + dent} Q 170 ${150 + dent + dent * 0.9} 322 ${150 + dent}`}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* Area kontak */}
      <line x1={170 - halfWidth} y1="104" x2={170 + halfWidth} y2="104" stroke={color} strokeWidth="2.5" />
      <line x1={170 - halfWidth} y1="98" x2={170 - halfWidth} y2="112" stroke={color} strokeWidth="2.5" />
      <line x1={170 + halfWidth} y1="98" x2={170 + halfWidth} y2="112" stroke={color} strokeWidth="2.5" />
      <text x="170" y="126" textAnchor="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        A = {areaM2} m²
      </text>

      <text x="170" y="212" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">
        Semakin sempit bidang sentuh, semakin dalam bekasnya
      </text>
    </svg>
  );
}

export function HydraulicBrakeArt() {
  return (
    <svg
      viewBox="0 0 420 240"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram rem hidrolik: pedal ditekan, power booster dan silinder master mendorong fluida rem melalui pipa menuju kaliper yang menekan cakram"
    >
      <defs>
        <linearGradient id="br-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="br-housing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="br-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="br-rod" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="br-disc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <filter id="br-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Pedal + kaki */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 70 188; 10 70 188; 0 70 188"
          dur="2.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        {/* Batang pedal */}
        <line x1="70" y1="188" x2="88" y2="118" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        {/* Pijakan */}
        <rect x="48" y="182" width="48" height="12" rx="4" fill="#cbd5e1" />
        {/* Kaki (sepatu) */}
        <path
          d="M 40 178 L 40 172 Q 40 168 46 168 L 88 166 L 96 174 L 96 180 L 44 182 Z"
          fill="#ef4444"
          stroke="#991b1b"
          strokeWidth="1"
        />
      </g>

      {/* Power booster */}
      <circle cx="128" cy="140" r="16" fill="#0a1530" stroke="#3b5b8f" strokeWidth="1.8" />
      <circle cx="128" cy="140" r="10" fill="url(#br-metal)" opacity="0.6" />

      {/* Silinder master (housing kuning/emas) */}
      <rect x="148" y="122" width="86" height="36" rx="4" fill="url(#br-housing)" stroke="#92400e" strokeWidth="1" />

      {/* Reservoir fluida di atas silinder master */}
      <rect x="168" y="82" width="34" height="42" rx="4" fill="#fef3c7" stroke="#92400e" strokeWidth="1" />
      <rect x="172" y="102" width="26" height="20" rx="2" fill="url(#br-fluid)" />
      <rect x="182" y="76" width="6" height="8" fill="#92400e" />

      {/* Piston master — menekan ke kanan */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 6 0; 0 0"
          dur="2.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="152" y="132" width="12" height="16" rx="2" fill="url(#br-rod)" />
      </g>

      {/* Pipa keluar dari master cylinder ke bawah */}
      <path
        d="M 234 138 H 262 V 178 H 290"
        stroke="#0a1530"
        strokeWidth="20"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M 234 138 H 262 V 178 H 290"
        stroke="#3b5b8f"
        strokeWidth="22"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 234 138 H 262 V 178 H 290"
        stroke="url(#br-fluid)"
        strokeWidth="12"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        className="flow-line"
        d="M 240 138 H 262 V 178 H 288"
        stroke="#e0f2fe"
        strokeWidth="1.6"
        fill="none"
        opacity="0.9"
        strokeLinecap="round"
      />

      {/* Kaliper rem */}
      <rect x="284" y="162" width="46" height="34" rx="6" fill="#0a1530" stroke="#3b5b8f" strokeWidth="2" />
      <rect x="288" y="168" width="38" height="22" rx="4" fill="url(#br-fluid)" />

      {/* Dua piston kaliper — saling mendekat */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 3; 0 0"
          dur="2.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="290" y="170" width="34" height="6" rx="2" fill="url(#br-metal)" />
      </g>
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -3; 0 0"
          dur="2.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="290" y="182" width="34" height="6" rx="2" fill="url(#br-metal)" />
      </g>

      {/* Cakram rem (rotor) */}
      <rect x="352" y="90" width="24" height="120" rx="12" fill="url(#br-disc)" stroke="#1e293b" strokeWidth="1.5" />
      {/* Ventilasi cakram */}
      <line x1="356" y1="105" x2="356" y2="195" stroke="#0f172a" strokeWidth="1" opacity="0.7" />
      <line x1="372" y1="105" x2="372" y2="195" stroke="#0f172a" strokeWidth="1" opacity="0.7" />
      {/* Glow saat rem bekerja */}
      <rect
        x="352"
        y="90"
        width="24"
        height="120"
        rx="12"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="1.5"
        filter="url(#br-glow)"
        opacity="0.5"
      >
        <animate attributeName="opacity" values="0.2; 0.7; 0.2" dur="2.8s" repeatCount="indefinite" />
      </rect>

      {/* Label */}
      <text x="128" y="118" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="700">
        POWER BOOSTER
      </text>
      <text x="191" y="72" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="700">
        FLUIDA REM
      </text>
      <text x="191" y="172" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="700">
        SILINDER MASTER
      </text>
      <text x="307" y="210" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="700">
        KALIPER
      </text>
      <text x="364" y="228" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="700">
        CAKRAM
      </text>
    </svg>
  );
}

export function HydraulicLiftArt() {
  return (
    <svg
      viewBox="0 0 420 240"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram dongkrak botol hidrolik: tuas pompa digerakkan, piston kecil memompa fluida, piston besar naik mengangkat beban"
    >
      <defs>
        <linearGradient id="lf-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="lf-housing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="lf-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="lf-rod" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="lf-lever" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="lf-load" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Landasan */}
      <line x1="20" y1="220" x2="400" y2="220" stroke="#334155" strokeWidth="1.5" />

      {/* Base housing (bawah) */}
      <rect x="100" y="196" width="200" height="24" rx="4" fill="url(#lf-housing)" stroke="#92400e" strokeWidth="1.2" />

      {/* Silinder utama A (kiri, tinggi) */}
      <rect x="120" y="56" width="76" height="142" rx="8" fill="#0a1530" stroke="#3b5b8f" strokeWidth="2" />
      {/* Tabung dalam (housing kuning) */}
      <rect x="126" y="62" width="64" height="130" rx="6" fill="url(#lf-housing)" opacity="0.35" />
      {/* Fluida */}
      <rect x="126" y="120" width="64" height="72" rx="4" fill="url(#lf-fluid)">
        <animate attributeName="y" values="120; 132; 120" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <animate attributeName="height" values="72; 60; 72" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
      </rect>

      {/* Piston besar A + rod — naik */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -12; 0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        {/* Rod */}
        <rect x="148" y="12" width="20" height="110" rx="3" fill="url(#lf-rod)" />
        {/* Top cap */}
        <rect x="138" y="6" width="40" height="14" rx="3" fill="url(#lf-metal)" />
        {/* Piston plate */}
        <rect x="128" y="112" width="60" height="14" rx="3" fill="url(#lf-metal)" />
      </g>

      {/* Pompa kecil B (kanan) */}
      <rect x="220" y="150" width="46" height="70" rx="6" fill="#0a1530" stroke="#3b5b8f" strokeWidth="2" />
      <rect x="226" y="172" width="34" height="44" rx="4" fill="url(#lf-fluid)" />
      {/* Piston pompa — naik turun */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -6; 0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="238" y="130" width="14" height="46" rx="3" fill="url(#lf-rod)" />
        <rect x="226" y="164" width="34" height="8" rx="3" fill="url(#lf-metal)" />
      </g>

      {/* Tuas panjang ke kanan */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-6 245 130; 10 245 130; -6 245 130"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="240" y="122" width="150" height="14" rx="6" fill="url(#lf-lever)" stroke="#0f172a" strokeWidth="1" />
        <rect x="378" y="118" width="18" height="22" rx="4" fill="#334155" />
      </g>

      {/* Pivot */}
      <circle cx="245" cy="130" r="5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />

      {/* Pipa penghubung A-B */}
      <rect x="166" y="180" width="60" height="14" rx="6" fill="#0a1530" stroke="#3b5b8f" strokeWidth="1.5" />
      <rect x="170" y="184" width="52" height="6" rx="3" fill="url(#lf-fluid)" />
      <path className="flow-line" d="M 174 187 H 216" stroke="#e0f2fe" strokeWidth="1.4" fill="none" opacity="0.85" />

      {/* Beban di atas piston A */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -12; 0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="118" y="-34" width="80" height="40" rx="4" fill="url(#lf-load)" stroke="#6d28d9" strokeWidth="1.2" />
        <line x1="118" y1="-14" x2="198" y2="-14" stroke="#6d28d9" strokeWidth="1" opacity="0.5" />
        <text x="158" y="-8" textAnchor="middle" fill="#f5f3ff" fontSize="10" fontWeight="700">
          BEBAN
        </text>
      </g>

      {/* Label A, B, C, D seperti di referensi */}
      <text x="158" y="102" textAnchor="middle" fill="#fcd34d" fontSize="16" fontWeight="900">A</text>
      <text x="252" y="146" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="900">B</text>
      <text x="158" y="216" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="900">D</text>
      <text x="212" y="216" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="900">C</text>
    </svg>
  );
}

export function HydraulicPressArt() {
  return (
    <svg
      viewBox="0 0 420 240"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram mesin press hidrolik: silinder atas mendorong platen ke bawah, menekan benda kerja dengan gaya besar"
    >
      <defs>
        <linearGradient id="pr-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="pr-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="pr-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="pr-rod" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="pr-work" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Rangka C — kolom kiri & kanan */}
      <rect x="70" y="30" width="24" height="190" rx="4" fill="url(#pr-frame)" stroke="#0f172a" strokeWidth="1" />
      <rect x="326" y="30" width="24" height="190" rx="4" fill="url(#pr-frame)" stroke="#0f172a" strokeWidth="1" />

      {/* Palang atas */}
      <rect x="70" y="20" width="280" height="26" rx="4" fill="url(#pr-frame)" stroke="#0f172a" strokeWidth="1" />

      {/* Silinder hidrolik atas */}
      <rect x="164" y="46" width="92" height="52" rx="6" fill="#0a1530" stroke="#3b5b8f" strokeWidth="2" />
      <rect x="168" y="68" width="84" height="26" rx="4" fill="url(#pr-fluid)" />

      {/* Piston + rod + platen — turun & naik */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 10; 0 0"
          dur="2.6s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        {/* Rod */}
        <rect x="196" y="90" width="28" height="60" rx="3" fill="url(#pr-rod)" />
        {/* Platen (pelat penekan) */}
        <rect x="130" y="146" width="160" height="18" rx="4" fill="url(#pr-metal)" stroke="#475569" strokeWidth="1" />
      </g>

      {/* Benda kerja (kompres saat platen turun) */}
      <g>
        <rect
          x="160"
          y="176"
          width="100"
          height="24"
          rx="3"
          fill="url(#pr-work)"
          stroke="#065f46"
          strokeWidth="1.2"
        >
          <animate attributeName="height" values="24; 18; 24" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          <animate attributeName="y" values="176; 182; 176" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        </rect>
        {/* Label BENDA KERJA */}
        <text x="210" y="164" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="700">
          BENDA KERJA
        </text>
      </g>

      {/* Landasan bawah */}
      <rect x="90" y="200" width="240" height="18" rx="4" fill="url(#pr-frame)" stroke="#0f172a" strokeWidth="1" />

      {/* Pipa masuk ke silinder */}
      <rect x="256" y="78" width="72" height="14" rx="6" fill="#0a1530" stroke="#3b5b8f" strokeWidth="1.5" />
      <rect x="260" y="82" width="64" height="6" rx="3" fill="url(#pr-fluid)" />
      <path className="flow-line" d="M 264 85 H 320" stroke="#e0f2fe" strokeWidth="1.4" fill="none" opacity="0.85" />

      {/* Pompa kecil di kanan bawah */}
      <rect x="304" y="120" width="60" height="46" rx="6" fill="#0a1530" stroke="#3b5b8f" strokeWidth="2" />
      <rect x="308" y="138" width="52" height="24" rx="4" fill="url(#pr-fluid)" />
      {/* Lever */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-8 334 120; 8 334 120; -8 334 120"
          dur="2.6s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <line x1="334" y1="120" x2="360" y2="88" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="362" cy="86" r="4" fill="#cbd5e1" />
      </g>
      {/* Piston pompa */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 4; 0 0"
          dur="2.6s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="327" y="104" width="14" height="36" rx="3" fill="url(#pr-rod)" />
      </g>

      {/* Label */}
      <text x="210" y="14" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="700">
        SILINDER HIDROLIK
      </text>
      <text x="334" y="184" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="700">
        POMPA
      </text>
    </svg>
  );
}

export function HydraulicBedArt() {
  return (
    <svg
      viewBox="0 0 420 240"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram tempat tidur pasien hidrolik: mekanisme hidrolik di bawah mengangkat rangka tempat tidur"
    >
      <defs>
        <linearGradient id="bd-mattress" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="bd-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f5" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="bd-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="bd-fluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <radialGradient id="bd-wheel" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>

      {/* Landasan */}
      <line x1="10" y1="228" x2="410" y2="228" stroke="#334155" strokeWidth="1.5" />

      {/* ==== Bagian yang naik-turun bersama ==== */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -14; 0 0"
          dur="3.2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />

        {/* Rangka tempat tidur (rangka atas) */}
        <rect x="60" y="130" width="300" height="14" rx="4" fill="url(#bd-frame)" stroke="#475569" strokeWidth="1" />

        {/* Headboard (kanan) */}
        <rect x="352" y="60" width="12" height="86" rx="4" fill="url(#bd-frame)" stroke="#475569" strokeWidth="1" />
        <rect x="348" y="82" width="20" height="14" rx="6" fill="#94a3b8" />

        {/* Footboard (kiri) */}
        <rect x="56" y="60" width="12" height="86" rx="4" fill="url(#bd-frame)" stroke="#475569" strokeWidth="1" />
        <rect x="52" y="82" width="20" height="14" rx="6" fill="#94a3b8" />

        {/* Kasur */}
        <rect x="72" y="112" width="280" height="22" rx="8" fill="url(#bd-mattress)" stroke="#94a3b8" strokeWidth="1" />
        {/* Garis selimut */}
        <line x1="72" y1="124" x2="352" y2="124" stroke="#cbd5e1" strokeWidth="0.8" />
        {/* Bantal */}
        <ellipse cx="322" cy="106" rx="26" ry="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

        {/* Side rail kiri */}
        <path
          d="M 100 106 V 88 Q 100 84 106 84 H 140 Q 146 84 146 88 V 106"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line x1="112" y1="90" x2="112" y2="106" stroke="#94a3b8" strokeWidth="2" />
        <line x1="134" y1="90" x2="134" y2="106" stroke="#94a3b8" strokeWidth="2" />

        {/* Side rail kanan */}
        <path
          d="M 210 106 V 88 Q 210 84 216 84 H 250 Q 256 84 256 88 V 106"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line x1="222" y1="90" x2="222" y2="106" stroke="#94a3b8" strokeWidth="2" />
        <line x1="244" y1="90" x2="244" y2="106" stroke="#94a3b8" strokeWidth="2" />

        {/* Pasien (opsional — kepala & tubuh sederhana) */}
        <ellipse cx="318" cy="108" rx="10" ry="7" fill="#fcd9c8" />
        <path
          d="M 200 112 Q 205 98 240 98 Q 270 98 296 108 L 296 118 L 200 118 Z"
          fill="#60a5fa"
          opacity="0.7"
        />
      </g>

      {/* ==== Bagian bawah (base statis) ==== */}
      {/* Base frame */}
      <rect x="80" y="196" width="260" height="16" rx="4" fill="url(#bd-base)" stroke="#0f172a" strokeWidth="1" />

      {/* Roda */}
      <g>
        <circle cx="106" cy="220" r="10" fill="url(#bd-wheel)" stroke="#0f172a" strokeWidth="1.2" />
        <circle cx="106" cy="220" r="3" fill="#94a3b8" />
      </g>
      <g>
        <circle cx="314" cy="220" r="10" fill="url(#bd-wheel)" stroke="#0f172a" strokeWidth="1.2" />
        <circle cx="314" cy="220" r="3" fill="#94a3b8" />
      </g>

      {/* Silinder hidrolik di bawah (naik-turun) */}
      <rect x="196" y="150" width="28" height="60" rx="4" fill="#0a1530" stroke="#3b5b8f" strokeWidth="1.8" />
      <rect x="200" y="172" width="20" height="38" rx="3" fill="url(#bd-fluid)">
        <animate attributeName="y" values="172; 184; 172" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <animate attributeName="height" values="38; 26; 38" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
      </rect>

      {/* Piston yang menghubungkan silinder ke rangka atas */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -14; 0 0"
          dur="3.2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <rect x="204" y="120" width="12" height="52" rx="2" fill="url(#bd-frame)" />
      </g>

      {/* Pompa injak di bawah (petal) */}
      <rect x="240" y="196" width="44" height="10" rx="4" fill="#334155" />
      <rect x="256" y="204" width="12" height="8" rx="2" fill="#475569" />

      {/* Pipa penghubung pompa → silinder */}
      <rect x="212" y="204" width="52" height="8" rx="4" fill="#0a1530" stroke="#3b5b8f" strokeWidth="1.2" />
      <rect x="216" y="206" width="44" height="4" rx="2" fill="url(#bd-fluid)" />

      {/* Label */}
      <text x="210" y="22" textAnchor="middle" fill="#fcd34d" fontSize="10" fontWeight="700">
        TEMPAT TIDUR HIDROLIK
      </text>
      <text x="210" y="246" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
        Tekanan dari pompa mengangkat rangka tempat tidur
      </text>
    </svg>
  );
}