export type DotShape =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'line'
  | 'cross'
  | 'ellipse';

export interface Dot {
  x: number;
  y: number;
  radius: number;
}

export interface RenderOptions {
  /** Fill color for dots */
  dotColor?: string;
  /** Background color for canvas */
  backgroundColor?: string;
  /** Shape to render at each dot position */
  shape?: DotShape;
}

const HALF_SQRT2 = Math.SQRT2 / 2;

/**
 * Render dots to a Canvas 2D context using batched paths per shape.
 * Each shape is drawn as efficiently as possible using a single path + fill.
 */
export function renderDots(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  options: RenderOptions = {}
): void {
  const {
    dotColor = '#000000',
    backgroundColor = '#ffffff',
    shape = 'circle',
  } = options;

  const { width, height } = ctx.canvas;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  if (dots.length === 0) return;

  ctx.fillStyle = dotColor;

  switch (shape) {
    case 'circle':
      drawCircles(ctx, dots);
      break;
    case 'square':
      drawSquares(ctx, dots);
      break;
    case 'diamond':
      drawDiamonds(ctx, dots);
      break;
    case 'line':
      drawLines(ctx, dots);
      break;
    case 'cross':
      drawCrosses(ctx, dots);
      break;
    case 'ellipse':
      drawEllipses(ctx, dots);
      break;
  }
}

function drawCircles(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    const { x, y, radius } = dots[i];
    if (radius <= 0) continue;
    ctx.moveTo(x + radius, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
  }
  ctx.fill();
}

function drawSquares(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    const { x, y, radius } = dots[i];
    if (radius <= 0) continue;
    ctx.rect(x - radius, y - radius, radius * 2, radius * 2);
  }
  ctx.fill();
}

function drawDiamonds(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    const { x, y, radius } = dots[i];
    if (radius <= 0) continue;
    const d = radius * HALF_SQRT2 * 2;
    ctx.moveTo(x, y - d);
    ctx.lineTo(x + d, y);
    ctx.lineTo(x, y + d);
    ctx.lineTo(x - d, y);
    ctx.closePath();
  }
  ctx.fill();
}

/**
 * Horizontal lines — width scales with radius, thickness is proportional.
 * Creates an engraving / currency-note feel.
 */
function drawLines(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    const { x, y, radius } = dots[i];
    if (radius <= 0) continue;
    const halfW = radius * 1.8;
    const halfH = radius * 0.35;
    ctx.rect(x - halfW, y - halfH, halfW * 2, halfH * 2);
  }
  ctx.fill();
}

/**
 * Cross / plus marks — two perpendicular bars.
 */
function drawCrosses(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    const { x, y, radius } = dots[i];
    if (radius <= 0) continue;
    const arm = radius * 1.3;
    const thick = radius * 0.35;
    // Horizontal bar
    ctx.rect(x - arm, y - thick, arm * 2, thick * 2);
    // Vertical bar
    ctx.rect(x - thick, y - arm, thick * 2, arm * 2);
  }
  ctx.fill();
}

function drawEllipses(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    const { x, y, radius } = dots[i];
    if (radius <= 0) continue;
    const rx = radius * 1.4;
    const ry = radius * 0.7;
    ctx.moveTo(x + rx, y);
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  }
  ctx.fill();
}
