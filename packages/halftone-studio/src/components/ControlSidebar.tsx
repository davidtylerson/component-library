import React from 'react';
import { Separator } from '@float-vibe-foundry/design-system';
import { TextPanel } from './TextPanel';
import { GridPanel } from './GridPanel';
import { DensityPanel } from './DensityPanel';

/**
 * Fixed-width control panel using design system components.
 * Uses a plain div layout instead of the Sidebar component to avoid
 * mobile viewport detection issues in embedded contexts.
 */
export function ControlSidebar() {
  return (
    <aside className="border-border-tertiary flex h-full w-72 shrink-0 flex-col border-r bg-[var(--bg-app-base)]">
      {/* Header */}
      <div className="border-border-tertiary flex items-center gap-2 border-b px-4 py-3">
        <div className="bg-bg-brand-solid flex h-6 w-6 items-center justify-center rounded">
          <span className="text-fg-white text-[10px] font-bold">H</span>
        </div>
        <span className="text-text-primary text-sm font-semibold">
          Halftone Studio
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Text Section */}
        <div className="px-4 py-3">
          <div className="text-text-tertiary mb-2 text-[10px] font-medium uppercase tracking-wider">
            Text
          </div>
          <TextPanel />
        </div>

        <Separator className="bg-border-tertiary" />

        {/* Grid Section */}
        <div className="px-4 py-3">
          <div className="text-text-tertiary mb-2 text-[10px] font-medium uppercase tracking-wider">
            Grid
          </div>
          <GridPanel />
        </div>

        <Separator className="bg-border-tertiary" />

        {/* Density Section */}
        <div className="px-4 py-3">
          <div className="text-text-tertiary mb-2 text-[10px] font-medium uppercase tracking-wider">
            Density
          </div>
          <DensityPanel />
        </div>
      </div>

      {/* Footer */}
      <div className="border-border-tertiary border-t px-4 py-2">
        <span className="text-text-disabled text-[10px]">
          Float Halftone Studio v0.1
        </span>
      </div>
    </aside>
  );
}
