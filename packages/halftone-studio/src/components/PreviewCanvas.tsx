import React, { useRef, useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { canvasWidthAtom, canvasHeightAtom, dotShapeAtom } from '../atoms';
import { renderDots } from '../engine/renderer';
import type { Dot } from '../engine/renderer';

interface PreviewCanvasProps {
  dots: Dot[];
}

/**
 * Full-area canvas that renders the halftone dot grid.
 * Uses ResizeObserver to track container size and update canvas dimensions.
 */
export function PreviewCanvas({ dots }: PreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCanvasWidth = useSetAtom(canvasWidthAtom);
  const setCanvasHeight = useSetAtom(canvasHeightAtom);
  const dotShape = useAtomValue(dotShapeAtom);
  const dotsRef = useRef<Dot[]>(dots);
  dotsRef.current = dots;

  // Track container size and trigger re-render
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const w = Math.round(width);
        const h = Math.round(height);

        if (w > 0 && h > 0) {
          setCanvasWidth(w);
          setCanvasHeight(h);

          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width = w;
            canvas.height = h;
          }
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [setCanvasWidth, setCanvasHeight]);

  // Render dots whenever they change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    const dotColor = isDark ? '#ffffff' : '#1a1a1e';
    const bgColor = isDark ? '#0a0a0e' : '#fafafa';

    renderDots(ctx, dots, {
      dotColor,
      backgroundColor: bgColor,
      shape: dotShape,
    });
  }, [dots, dotShape]);

  return (
    <div
      ref={containerRef}
      className="bg-bg-primary relative flex-1 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
