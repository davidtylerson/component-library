import { atom } from 'jotai';
import type { GridType } from '../engine/grid';
import type { DotShape } from '../engine/renderer';

// --- Text parameters ---
export const textAtom = atom('float');
export const fontFamilyAtom = atom('Inter');
export const fontSizeAtom = atom(200);

// --- Grid parameters ---
export const gridTypeAtom = atom<GridType>('rect');
export const gridPitchAtom = atom(16);
/** Grid rotation in degrees (0–360) */
export const gridAngleAtom = atom(0);

// --- Dot shape ---
export const dotShapeAtom = atom<DotShape>('circle');

// --- Density / Radius parameters ---
/** Blur radius for mask feathering (px) */
export const blurRadiusAtom = atom(6);
/** Minimum dot radius (dots in empty areas) */
export const minRadiusAtom = atom(1.0);
/** Maximum dot radius (dots at full density) */
export const maxRadiusAtom = atom(6.5);
/** Gamma curve exponent for density-to-radius mapping */
export const gammaAtom = atom(1.0);

// --- Canvas size (set by ResizeObserver in PreviewCanvas) ---
export const canvasWidthAtom = atom(800);
export const canvasHeightAtom = atom(600);

// --- Custom fonts loaded via file upload ---
export interface LoadedFont {
  name: string;
  family: string;
}
export const loadedFontsAtom = atom<LoadedFont[]>([]);
