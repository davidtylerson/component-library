import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import {
  textAtom,
  fontFamilyAtom,
  fontSizeAtom,
  gridTypeAtom,
  gridPitchAtom,
  gridAngleAtom,
  blurRadiusAtom,
  minRadiusAtom,
  maxRadiusAtom,
  gammaAtom,
  canvasWidthAtom,
  canvasHeightAtom,
} from '../atoms';
import { generateMask, sampleMask } from '../engine/mask';
import { generateGrid } from '../engine/grid';
import { gammaMap } from '../engine/curves';
import type { Dot } from '../engine/renderer';

export interface HalftoneResult {
  dots: Dot[];
  dotCount: number;
  canvasWidth: number;
  canvasHeight: number;
}

/**
 * Core pipeline hook that transforms parameters into renderable dots.
 *
 * Pipeline: atoms → mask → grid → sample → map radii → Dot[]
 */
export function useHalftoneEngine(): HalftoneResult {
  const text = useAtomValue(textAtom);
  const fontFamily = useAtomValue(fontFamilyAtom);
  const fontSize = useAtomValue(fontSizeAtom);
  const gridType = useAtomValue(gridTypeAtom);
  const gridPitch = useAtomValue(gridPitchAtom);
  const gridAngle = useAtomValue(gridAngleAtom);
  const blurRadius = useAtomValue(blurRadiusAtom);
  const minRadius = useAtomValue(minRadiusAtom);
  const maxRadius = useAtomValue(maxRadiusAtom);
  const gamma = useAtomValue(gammaAtom);
  const canvasWidth = useAtomValue(canvasWidthAtom);
  const canvasHeight = useAtomValue(canvasHeightAtom);

  const dots = useMemo(() => {
    if (canvasWidth <= 0 || canvasHeight <= 0 || !text.trim()) {
      return [];
    }

    // Step 1: Generate the grayscale density mask from text
    const mask = generateMask({
      text,
      fontFamily,
      fontSize,
      blurRadius,
      width: canvasWidth,
      height: canvasHeight,
    });

    // Step 2: Generate the dot grid
    const gridPoints = generateGrid({
      type: gridType,
      width: canvasWidth,
      height: canvasHeight,
      pitch: gridPitch,
      angle: gridAngle,
    });

    // Step 3: Sample density at each grid point and map to radius
    const dots: Dot[] = new Array(gridPoints.length);

    for (let i = 0; i < gridPoints.length; i++) {
      const point = gridPoints[i];
      const density = sampleMask(mask, point.x, point.y);
      const radius = gammaMap(density, gamma, minRadius, maxRadius);

      dots[i] = {
        x: point.x,
        y: point.y,
        radius,
      };
    }

    return dots;
  }, [
    text,
    fontFamily,
    fontSize,
    gridType,
    gridPitch,
    gridAngle,
    blurRadius,
    minRadius,
    maxRadius,
    gamma,
    canvasWidth,
    canvasHeight,
  ]);

  return {
    dots,
    dotCount: dots.length,
    canvasWidth,
    canvasHeight,
  };
}
