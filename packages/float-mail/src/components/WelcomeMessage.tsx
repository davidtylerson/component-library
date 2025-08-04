'use client';

import React from 'react';

export default function WelcomeMessage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📧</div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Welcome to Float Mail
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          Create beautiful email templates with our visual editor. 
          Start by editing the JSON template on the left, or load a saved template.
        </p>
        <div className="space-y-2 text-xs text-text-tertiary">
          <p>• Edit the template JSON in the left panel</p>
          <p>• Preview your email in real-time</p>
          <p>• Customize variables in the right panel</p>
          <p>• Export as HTML when ready</p>
        </div>
      </div>
    </div>
  );
} 