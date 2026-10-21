'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState, StateEffect } from '@codemirror/state';
import { Button } from '@float-vibe-foundry/design-system';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { floatEditorTheme } from './codemirror-theme';

interface CodeMirrorViewerProps {
  code: string;
  language: 'typescript' | 'html';
  /** Shown at the left of the panel header, e.g. "ReportReady.tsx". */
  label?: string;
  /** Rendered immediately left of the copy button (e.g. the React/HTML toggle). */
  headerActions?: React.ReactNode;
}

/**
 * `typescript: true` alone parses the source as plain TS, so every JSX tag in a
 * template reads as a syntax error and highlighting collapses to unstyled text.
 * Templates are TSX, so JSX has to be enabled too.
 */
const languageExtension = (language: CodeMirrorViewerProps['language']) =>
  language === 'html'
    ? html()
    : javascript({ typescript: true, jsx: true });

const extensionsFor = (language: CodeMirrorViewerProps['language']) => [
  basicSetup,
  oneDark,
  languageExtension(language),
  EditorState.readOnly.of(true),
  floatEditorTheme,
];

export default function CodeMirrorViewer({
  code,
  language,
  label,
  headerActions,
}: CodeMirrorViewerProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: extensionsFor(language),
      }),
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== code) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: code,
        },
      });
    }
  }, [code]);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.dispatch({
      effects: [StateEffect.reconfigure.of(extensionsFor(language))],
    });
  }, [language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Failed to copy text - silently handle error
    }
  };

  return (
    <div className="h-full p-2">
      {/* Unified Card Container — matches the Data panel */}
      <div className="border-border-tertiary h-full rounded-md border">
        {/* Header */}
        <div className="border-border-tertiary flex items-center justify-between border-b bg-[var(--panel-surface)] px-4 py-3">
          <span className="text-text-secondary text-sm font-medium">
            {label}
          </span>
          <div className="flex items-center gap-3">
            {headerActions}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <IconCheck className="text-text-success-primary h-3 w-3" />
              ) : (
                <IconCopy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div style={{ height: 'calc(100% - 48px)' }}>
          <div ref={editorRef} style={{ height: '100%' }} />
        </div>
      </div>
    </div>
  );
}
