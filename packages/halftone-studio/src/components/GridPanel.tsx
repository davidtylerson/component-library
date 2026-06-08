import React from 'react';
import { useAtom } from 'jotai';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@float-vibe-foundry/design-system';
import {
  gridTypeAtom,
  gridPitchAtom,
  gridAngleAtom,
  dotShapeAtom,
} from '../atoms';
import { ParameterSlider } from './ParameterSlider';
import type { GridType } from '../engine/grid';
import type { DotShape } from '../engine/renderer';

const SHAPES: { value: DotShape; label: string }[] = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'line', label: 'Line' },
  { value: 'cross', label: 'Cross' },
  { value: 'ellipse', label: 'Ellipse' },
];

export function GridPanel() {
  const [gridType, setGridType] = useAtom(gridTypeAtom);
  const [gridPitch, setGridPitch] = useAtom(gridPitchAtom);
  const [gridAngle, setGridAngle] = useAtom(gridAngleAtom);
  const [dotShape, setDotShape] = useAtom(dotShapeAtom);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs font-medium">
          Grid Type
        </span>
        <ToggleGroup
          type="single"
          value={gridType}
          onValueChange={val => {
            if (val) setGridType(val as GridType);
          }}
          className="w-full"
        >
          <ToggleGroupItem value="rect" className="h-7 flex-1 text-xs">
            Rectangular
          </ToggleGroupItem>
          <ToggleGroupItem value="hex" className="h-7 flex-1 text-xs">
            Hexagonal
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs font-medium">
          Dot Shape
        </span>
        <div className="grid grid-cols-3 gap-1">
          {SHAPES.map(s => (
            <button
              key={s.value}
              onClick={() => setDotShape(s.value)}
              className={`h-7 rounded-md border text-xs font-medium transition-colors ${
                dotShape === s.value
                  ? 'border-border-primary bg-bg-tertiary text-text-primary'
                  : 'border-border-secondary bg-bg-secondary text-text-tertiary hover:text-text-secondary hover:border-border-primary'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <ParameterSlider
        label="Grid Pitch"
        value={gridPitch}
        min={4}
        max={40}
        step={0.5}
        onChange={setGridPitch}
        unit="px"
      />

      <ParameterSlider
        label="Grid Rotation"
        value={gridAngle}
        min={0}
        max={360}
        step={1}
        onChange={setGridAngle}
        unit="°"
      />
    </div>
  );
}
