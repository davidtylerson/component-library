'use client';

import React from 'react';
import { Editor } from '@monaco-editor/react';

interface CodeViewerProps {
  code: string;
  language: 'typescript' | 'html';
  height?: string;
}

export default function CodeViewer({
  code,
  language,
  height = '100%',
}: CodeViewerProps) {
  return (
    <div className="h-full">
      <Editor
        value={code}
        language={language}
        theme="vs-light"
        height={height}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          fontSize: 14,
          lineNumbers: 'on',
          folding: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
