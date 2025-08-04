'use client';

import React from 'react';
import { ViewMode } from '@/types/template-types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}

const VIEW_MODES: ViewMode[] = [
  { type: 'preview', label: 'Preview', icon: '👁️' },
  { type: 'code', label: 'Source Code', icon: '📝' },
  { type: 'compiled', label: 'Compiled HTML', icon: '⚙️' },
];

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
      {VIEW_MODES.map(mode => (
        <button
          key={mode.type}
          onClick={() => onViewModeChange(mode)}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            viewMode.type === mode.type
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="mr-2">{mode.icon}</span>
          {mode.label}
        </button>
      ))}
    </div>
  );
};
