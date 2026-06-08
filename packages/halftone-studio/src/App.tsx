import React from 'react';
import { ControlSidebar } from './components/ControlSidebar';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ExportBar } from './components/ExportBar';
import { useHalftoneEngine } from './hooks/useHalftoneEngine';

export default function App() {
  const { dots, dotCount, canvasWidth, canvasHeight } = useHalftoneEngine();

  return (
    <div className="bg-bg-primary text-text-primary dark flex h-screen">
      <ControlSidebar />
      <div className="flex flex-1 flex-col">
        <PreviewCanvas dots={dots} />
        <ExportBar
          dots={dots}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          dotCount={dotCount}
        />
      </div>
    </div>
  );
}
