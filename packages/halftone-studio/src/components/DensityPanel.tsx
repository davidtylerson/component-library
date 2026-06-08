import React from 'react';
import { useAtom } from 'jotai';
import {
  blurRadiusAtom,
  minRadiusAtom,
  maxRadiusAtom,
  gammaAtom,
} from '../atoms';
import { ParameterSlider } from './ParameterSlider';

export function DensityPanel() {
  const [blurRadius, setBlurRadius] = useAtom(blurRadiusAtom);
  const [minRadius, setMinRadius] = useAtom(minRadiusAtom);
  const [maxRadius, setMaxRadius] = useAtom(maxRadiusAtom);
  const [gamma, setGamma] = useAtom(gammaAtom);

  return (
    <div className="flex flex-col gap-3">
      <ParameterSlider
        label="Edge Feathering"
        value={blurRadius}
        min={0}
        max={30}
        step={0.5}
        onChange={setBlurRadius}
        unit="px"
      />

      <ParameterSlider
        label="Min Dot Radius"
        value={minRadius}
        min={0}
        max={5}
        step={0.1}
        onChange={setMinRadius}
        format={v => v.toFixed(1)}
        unit="px"
      />

      <ParameterSlider
        label="Max Dot Radius"
        value={maxRadius}
        min={1}
        max={20}
        step={0.1}
        onChange={setMaxRadius}
        format={v => v.toFixed(1)}
        unit="px"
      />

      <ParameterSlider
        label="Gamma Curve"
        value={gamma}
        min={0.3}
        max={3.0}
        step={0.05}
        onChange={setGamma}
        format={v => v.toFixed(2)}
      />
    </div>
  );
}
