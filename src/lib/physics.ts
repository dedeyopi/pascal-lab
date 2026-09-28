// src/lib/physics.ts
export const CM2_PER_M2 = 10_000;

export const cm2ToM2 = (cm2: number) => cm2 / CM2_PER_M2;
export const m2ToCm2 = (m2: number) => m2 * CM2_PER_M2;

export interface HydraulicResult {
  P1: number; // Pa
  P2: number; // Pa
  F2: number; // N
  ratio: number;
}

/** Menyelesaikan sistem hidrolik sederhana dengan Hukum Pascal. */
export function solveHydraulic(F1: number, A1cm2: number, A2cm2: number): HydraulicResult {
  const A1 = Math.max(cm2ToM2(A1cm2), 1e-9);
  const A2 = Math.max(cm2ToM2(A2cm2), 1e-9);
  const P1 = Math.max(F1, 0) / A1;
  const P2 = P1;
  const F2 = P2 * A2;
  return { P1, P2, F2, ratio: A2 / A1 };
}

/** P = F / A dengan A dalam m². */
export function pressurePa(F: number, A_m2: number): number {
  if (A_m2 <= 0) return 0;
  return F / A_m2;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/** Format angka gaya Gaya Indonesia: 1.250,5 */
export function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

/** Tekanan selalu ditampilkan dalam Pa (satuan SI). */
export function fmtPa(pa: number): string {
  if (!Number.isFinite(pa)) return '—';
  return `${fmt(pa, pa < 100 ? 2 : 0)} Pa`;
}

export function fmtPaCompact(pa: number): string {
  if (!Number.isFinite(pa)) return '—';
  if (pa >= 1_000_000) return `${fmt(pa / 1_000_000, 2)} MPa`;
  if (pa >= 1_000) return `${fmt(pa / 1_000, 1)} kPa`;
  return `${fmt(pa, 1)} Pa`;
}

export function fmtArea(cm2: number): string {
  return `${fmt(cm2, 2)} cm²`;
}

export function fmtForce(n: number): string {
  return `${fmt(n, n < 100 ? 2 : 1)} N`;
}