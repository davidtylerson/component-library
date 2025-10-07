'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { linter } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';
import { Button } from '@float-vibe-foundry/design-system';
import { IconCopy, IconCheck } from '@tabler/icons-react';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
}

export default function CodeMirrorEditor(props: CodeMirrorEditorProps) {
  const { value, onChange } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      // Just use the working CodeMirrorViewer approach
      basicSetup,
      oneDark,
      json(),
      linter(jsonParseLinter()),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          const newValue = update.state.doc.toString();
          onChange(newValue);
        }
      }),
      // Custom theme that overrides oneDark
      EditorView.theme({
        // Hide fold gutter
        '.cm-foldGutter': {
          display: 'none !important',
        },
        '&': {
          fontSize: '14px',
          height: '100%',
        },
        '.cm-editor': {
          height: '100%',
          backgroundColor: 'var(--bg-primary-alt) !important',
          userSelect: 'text !important',
          WebkitUserSelect: 'text !important',
          pointerEvents: 'auto !important',
        },
        '.cm-line': {
          userSelect: 'text !important',
          WebkitUserSelect: 'text !important',
          cursor: 'text !important',
        },
        '.cm-content': {
          padding: '12px 16px',
          minHeight: '100%',
          backgroundColor: 'var(--bg-primary-alt) !important',
          userSelect: 'text !important',
          WebkitUserSelect: 'text !important',
          cursor: 'text !important',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-scroller': {
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          backgroundColor: 'var(--bg-primary-alt) !important',
        },
        '.cm-gutters': {
          backgroundColor: 'var(--bg-primary-alt) !important', // Same as code block
          color: 'var(--text-tertiary) !important',
          borderRight: '1px solid var(--border-tertiary) !important',
          paddingRight: '0',
          border: 'none',
        },
        '.cm-lineNumbers': {
          color: 'var(--text-tertiary) !important',
          fontSize: '13px',
        },
        '.cm-lineNumbers .cm-gutterElement': {
          padding: '0 12px 0 8px !important',
          minWidth: '40px',
          textAlign: 'right',
          color: 'var(--text-tertiary) !important',
        },
        '.cm-activeLine': {
          backgroundColor: 'transparent !important',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'var(--bg-primary-alt) !important',
          color: 'var(--text-secondary) !important',
        },
        // Selection styling - best effort attempt
        '.cm-selectionBackground': {
          backgroundColor: 'var(--selection-bg) !important',
          opacity: '0.3 !important',
        },
        '.cm-focused .cm-selectionBackground': {
          backgroundColor: 'var(--selection-bg) !important',
          opacity: '0.4 !important',
        },
      }),
    ];

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    // Make the view accessible from the DOM element for debugging
    if (editorRef.current) {
      (editorRef.current as HTMLElement & { cmView?: EditorView }).cmView =
        view;
    }

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy text - silently handle error
    }
  };

  return (
    <div className="h-full p-4">
      {/* Unified Card Container */}
      <div className="border-border-tertiary h-full rounded-md border">
        {/* JSON Header */}
        <div className="bg-bg-primary-alt border-border-tertiary flex items-center justify-between border-b px-4 py-3">
          <span className="text-text-secondary text-sm font-medium">JSON</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0"
          >
            {copied ? (
              <IconCheck className="h-3 w-3 text-text-success-primary" />
            ) : (
              <IconCopy className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Editor */}
        <div
          style={{
            height: 'calc(100% - 48px)', // Account for header height
          }}
        >
          <div ref={editorRef} style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  );
}
