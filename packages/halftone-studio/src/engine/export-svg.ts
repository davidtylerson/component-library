import type { Dot, DotShape } from './renderer';

const HALF_SQRT2 = Math.SQRT2 / 2;

export interface SVGExportOptions {
  /** Number of decimal places for coordinates and radii */
  precision?: number;
  /** Fill color for dots */
  dotColor?: string;
  /** Whether to include dots below a minimum visible radius */
  includeMinDots?: boolean;
  /** Minimum radius threshold — dots below this are omitted if includeMinDots is false */
  minVisibleRadius?: number;
  /** Shape to export */
  shape?: DotShape;
}

/**
 * Build a clean SVG string from dot data.
 * Outputs shape-appropriate SVG elements for each dot.
 */
export function buildSVG(
  dots: Dot[],
  width: number,
  height: number,
  options: SVGExportOptions = {}
): string {
  const {
    precision = 2,
    dotColor = '#000000',
    includeMinDots = true,
    minVisibleRadius = 0.05,
    shape = 'circle',
  } = options;

  const p = (n: number) => n.toFixed(precision);

  const lines: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`,
    `  <g fill="${dotColor}" stroke="none">`,
  ];

  for (const dot of dots) {
    if (!includeMinDots && dot.radius < minVisibleRadius) continue;
    if (dot.radius <= 0) continue;

    lines.push(svgElement(dot, shape, p));
  }

  lines.push('  </g>', '</svg>');
  return lines.join('\n');
}

function svgElement(
  dot: Dot,
  shape: DotShape,
  p: (n: number) => string
): string {
  const { x, y, radius } = dot;
  const pad = '    ';

  switch (shape) {
    case 'circle':
      return `${pad}<circle cx="${p(x)}" cy="${p(y)}" r="${p(radius)}"/>`;

    case 'square': {
      const s = radius * 2;
      return `${pad}<rect x="${p(x - radius)}" y="${p(y - radius)}" width="${p(s)}" height="${p(s)}"/>`;
    }

    case 'diamond': {
      const d = radius * HALF_SQRT2 * 2;
      return `${pad}<polygon points="${p(x)},${p(y - d)} ${p(x + d)},${p(y)} ${p(x)},${p(y + d)} ${p(x - d)},${p(y)}"/>`;
    }

    case 'line': {
      const halfW = radius * 1.8;
      const halfH = radius * 0.35;
      return `${pad}<rect x="${p(x - halfW)}" y="${p(y - halfH)}" width="${p(halfW * 2)}" height="${p(halfH * 2)}"/>`;
    }

    case 'cross': {
      const arm = radius * 1.3;
      const thick = radius * 0.35;
      return [
        `${pad}<rect x="${p(x - arm)}" y="${p(y - thick)}" width="${p(arm * 2)}" height="${p(thick * 2)}"/>`,
        `${pad}<rect x="${p(x - thick)}" y="${p(y - arm)}" width="${p(thick * 2)}" height="${p(arm * 2)}"/>`,
      ].join('\n');
    }

    case 'ellipse': {
      const rx = radius * 1.4;
      const ry = radius * 0.7;
      return `${pad}<ellipse cx="${p(x)}" cy="${p(y)}" rx="${p(rx)}" ry="${p(ry)}"/>`;
    }
  }
}

/**
 * Trigger a file download of the SVG string.
 */
export function downloadSVG(
  svgString: string,
  filename: string = 'halftone.svg'
): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
