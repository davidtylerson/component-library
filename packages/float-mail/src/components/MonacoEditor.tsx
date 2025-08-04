'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadMonaco = async () => {
      const monaco = await import('monaco-editor');
      
      if (editorRef.current && !editorInstanceRef.current) {
        // Configure Monaco editor
        monaco.editor.defineTheme('vs-dark', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#1a1a1a',
            'editor.foreground': '#d4d4d4',
            'editor.lineHighlightBackground': '#2a2a2a',
            'editor.selectionBackground': '#264f78',
            'editor.inactiveSelectionBackground': '#3a3d41',
          }
        });

        // Create editor instance
        const editor = monaco.editor.create(editorRef.current, {
          value,
          language,
          theme,
          automaticLayout: true,
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
        });

        // Set up change listener
        editor.onDidChangeModelContent(() => {
          const currentValue = editor.getValue();
          onChange(currentValue);
        });

        editorInstanceRef.current = editor;
        setIsLoaded(true);
      }
    };

    loadMonaco();

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  // Update editor value when prop changes
  useEffect(() => {
    if (editorInstanceRef.current && editorInstanceRef.current.getValue() !== value) {
      editorInstanceRef.current.setValue(value);
    }
  }, [value]);

  if (!isLoaded) {
    return (
      <div 
        style={{ 
          height, 
          width: '100%',
          border: '1px solid var(--border-base)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#d4d4d4'
        }} 
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div 
      ref={editorRef} 
      style={{ 
        height, 
        width: '100%',
        border: '1px solid var(--border-base)',
        borderRadius: '6px'
      }} 
    />
  );
} 