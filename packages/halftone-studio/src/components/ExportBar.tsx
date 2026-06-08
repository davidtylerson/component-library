import React, { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { Button } from '@float-vibe-foundry/design-system';
import { IconDownload } from '@tabler/icons-react';
import { dotShapeAtom } from '../atoms';
import { buildSVG, downloadSVG } from '../engine/export-svg';
import type { Dot } from '../engine/renderer';

interface ExportBarProps {
  dots: Dot[];
  canvasWidth: number;
  canvasHeight: number;
  dotCount: number;
}

export function ExportBar({
  dots,
  canvasWidth,
  canvasHeight,
  dotCount,
}: ExportBarProps) {
  const dotShape = useAtomValue(dotShapeAtom);

  const handleExport = useCallback(() => {
    const svg = buildSVG(dots, canvasWidth, canvasHeight, {
      precision: 2,
      dotColor: '#000000',
      shape: dotShape,
    });
    downloadSVG(svg);
  }, [dots, canvasWidth, canvasHeight, dotShape]);

  return (
    <div className="border-border-tertiary bg-bg-secondary flex items-center justify-between border-t px-4 py-2.5">
      <span className="text-text-secondary text-xs tabular-nums">
        {dotCount.toLocaleString()} dots {'\u00B7'} {canvasWidth}
        {'\u00D7'}
        {canvasHeight}
      </span>
      <Button
        variant="primary"
        size="sm"
        leftIcon={<IconDownload size={14} />}
        onClick={handleExport}
      >
        Export SVG
      </Button>
    </div>
  );
}
