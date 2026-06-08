/**
 * Density-to-radius mapping curves.
 *
 * Each function takes a density value (0–1) and returns a radius value
 * between minRadius and maxRadius.
 */

/**
 * Gamma mapping — the primary curve for halftone work.
 * gamma < 1: expands shadows (more large dots)
 * gamma = 1: linear (area-preserving)
 * gamma > 1: expands highlights (more small dots)
 */
export function gammaMap(
  density: number,
  gamma: number,
  minRadius: number,
  maxRadius: number
): number {
  const t = Math.pow(Math.max(0, Math.min(1, density)), 1 / gamma);
  return minRadius + t * (maxRadius - minRadius);
}

/**
 * Attempt to find a smooth transition value between edge0 and edge1.
 * Used for crisp letterform edges with controllable softness.
 */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Smoothstep mapping — creates crisper edges with a threshold.
 */
export function smoothstepMap(
  density: number,
  threshold: number,
  softness: number,
  minRadius: number,
  maxRadius: number
): number {
  const t = smoothstep(threshold - softness, threshold + softness, density);
  return minRadius + t * (maxRadius - minRadius);
}

/**
 * Sigmoid (S-curve) mapping — boosts contrast between light and dark areas.
 */
export function sigmoidMap(
  density: number,
  steepness: number,
  minRadius: number,
  maxRadius: number
): number {
  const t = 1 / (1 + Math.exp(-steepness * (density - 0.5)));
  return minRadius + t * (maxRadius - minRadius);
}
