import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Slider } from '@float-vibe-foundry/design-system';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  /** Format function for display value */
  format?: (value: number) => string;
  /** Unit suffix (e.g. "px", "°") */
  unit?: string;
}

/**
 * Reusable parameter control: Label + editable value badge + Slider.
 * Click the value badge to type an exact number. Commits on Enter or blur.
 */
export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  unit = '',
}: ParameterSliderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = format ? format(value) : `${value}`;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const commitValue = useCallback(() => {
    const parsed = parseFloat(draft);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      const snapped = Math.round(clamped / step) * step;
      onChange(parseFloat(snapped.toFixed(10)));
    }
    setIsEditing(false);
  }, [draft, min, max, step, onChange]);

  const handleBadgeClick = () => {
    setDraft(String(value));
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      commitValue();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-1.5">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-xs font-medium">{label}</span>

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitValue}
            onKeyDown={handleKeyDown}
            className="border-border-primary bg-bg-tertiary text-text-primary focus:ring-border-primary w-16 rounded border px-1.5 py-0.5 text-right text-[10px] font-medium tabular-nums outline-none focus:ring-1"
          />
        ) : (
          <button
            type="button"
            onClick={handleBadgeClick}
            className="bg-bg-tertiary text-text-tertiary hover:bg-bg-secondary hover:text-text-secondary cursor-text rounded px-1.5 py-0.5 text-[10px] font-medium tabular-nums transition-colors"
            title="Click to edit value"
          >
            {displayValue}
            {unit}
          </button>
        )}
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}
