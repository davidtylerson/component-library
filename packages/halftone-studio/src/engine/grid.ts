export interface Point {
  x: number;
  y: number;
}

export type GridType = 'rect' | 'hex';

export interface GridOptions {
  type: GridType;
  width: number;
  height: number;
  pitch: number;
  /** Grid rotation in degrees */
  angle: number;
}

/**
 * Generate a grid of points over the canvas area.
 * The grid is generated large enough to cover the full canvas even when rotated,
 * then clipped to the canvas bounds.
 */
export function generateGrid(options: GridOptions): Point[] {
  const { type, width, height, pitch, angle } = options;

  if (pitch <= 0) return [];

  const angleRad = (angle * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);

  // Center of the canvas
  const cx = width / 2;
  const cy = height / 2;

  // Expand bounds to cover canvas even when rotated
  const diagonal = Math.sqrt(width * width + height * height);
  const half = diagonal / 2;

  const points: Point[] = [];

  if (type === 'rect') {
    for (let gy = -half; gy <= half; gy += pitch) {
      for (let gx = -half; gx <= half; gx += pitch) {
        // Rotate point around origin, then translate to canvas center
        const rx = gx * cos - gy * sin + cx;
        const ry = gx * sin + gy * cos + cy;

        if (rx >= 0 && rx < width && ry >= 0 && ry < height) {
          points.push({ x: rx, y: ry });
        }
      }
    }
  } else {
    // Hexagonal grid: offset every other row by half a pitch
    const rowHeight = (pitch * Math.sqrt(3)) / 2;
    let row = 0;

    for (let gy = -half; gy <= half; gy += rowHeight) {
      const offset = (row % 2) * (pitch / 2);

      for (let gx = -half; gx <= half; gx += pitch) {
        const ox = gx + offset;
        const rx = ox * cos - gy * sin + cx;
        const ry = ox * sin + gy * cos + cy;

        if (rx >= 0 && rx < width && ry >= 0 && ry < height) {
          points.push({ x: rx, y: ry });
        }
      }
      row++;
    }
  }

  return points;
}
