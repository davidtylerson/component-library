'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  height?: string;
}

export default function MonacoEditor({
  value,
  onChange,
  language = 'json',
  theme = 'vs-dark',
  height = '100%'
}: MonacoEditorProps) {
  return (
    <div 
      style={{ 
        height, 
        width: '100%',
        border: '1px solid #374151',
        borderRadius: '6px',
        overflow: 'hidden'
      }} 
    >
      <Editor
        height={height}
        language={language}
        theme={theme}
        value={value}
        onChange={(value) => onChange(value || '')}
        loading={
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            color: '#d4d4d4',
            fontSize: '14px'
          }}>
            Loading JSON editor...
          </div>
        }
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          matchBrackets: 'always',
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          formatOnPaste: true,
          formatOnType: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
} 