export const GRAVITY = 0.6;

export type Rect = { x: number; y: number; w: number; h: number };

export function aabbOverlap(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
