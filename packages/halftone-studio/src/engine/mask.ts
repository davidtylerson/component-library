export interface MaskOptions {
  text: string;
  fontFamily: string;
  fontSize: number;
  blurRadius: number;
  width: number;
  height: number;
}

export interface MaskResult {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/**
 * Renders text to an offscreen canvas, applies Gaussian blur for feathering,
 * and returns the grayscale pixel data as a density mask.
 *
 * White pixels (255) = inside the letterform = high density
 * Black pixels (0) = outside the letterform = zero density
 */
export function generateMask(options: MaskOptions): MaskResult {
  const { text, fontFamily, fontSize, blurRadius, width, height } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Fill background with black (zero density)
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // Draw text in white (full density)
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${fontSize}px "${fontFamily}", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Apply blur for soft edges (feathering)
  if (blurRadius > 0) {
    const blurCanvas = document.createElement('canvas');
    blurCanvas.width = width;
    blurCanvas.height = height;
    const blurCtx = blurCanvas.getContext('2d')!;
    blurCtx.filter = `blur(${blurRadius}px)`;
    blurCtx.drawImage(canvas, 0, 0);

    // Copy blurred result back
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(blurCanvas, 0, 0);
  }

  const imageData = ctx.getImageData(0, 0, width, height);
  return {
    data: imageData.data,
    width,
    height,
  };
}

/**
 * Sample the mask density at a given (x, y) coordinate.
 * Returns a value between 0 (outside letterform) and 1 (inside letterform).
 */
export function sampleMask(mask: MaskResult, x: number, y: number): number {
  const ix = Math.round(x);
  const iy = Math.round(y);

  if (ix < 0 || ix >= mask.width || iy < 0 || iy >= mask.height) {
    return 0;
  }

  // Red channel (all channels are the same for grayscale)
  const index = (iy * mask.width + ix) * 4;
  return mask.data[index] / 255;
}
