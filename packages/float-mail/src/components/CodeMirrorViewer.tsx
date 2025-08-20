'use client';

import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState, StateEffect } from '@codemirror/state';

interface CodeMirrorViewerProps {
  code: string;
  language: 'typescript' | 'html';
  height?: string;
}

export default function CodeMirrorViewer({
  code,
  language,
  height = '100%',
}: CodeMirrorViewerProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const getLanguageExtension = () => {
      switch (language) {
        case 'typescript':
          return javascript({ typescript: true });
        case 'html':
          return html();
        default:
          return javascript();
      }
    };

    const extensions = [
      basicSetup,
      oneDark,
      getLanguageExtension(),
      EditorState.readOnly.of(true),
      EditorView.theme({
        '&': {
          fontSize: '14px',
        },
        '.cm-content': {
          padding: '12px',
          minHeight: '200px',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          borderRadius: '6px',
        },
        '.cm-scroller': {
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        },
      }),
    ];

    const state = EditorState.create({
      doc: code,
      extensions,
    });

    const view = new EditorView({
      state,
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
    if (viewRef.current) {
      const getLanguageExtension = () => {
        switch (language) {
          case 'typescript':
            return javascript({ typescript: true });
          case 'html':
            return html();
          default:
            return javascript();
        }
      };

      viewRef.current.dispatch({
        effects: [
          StateEffect.reconfigure.of([
            basicSetup,
            oneDark,
            getLanguageExtension(),
            EditorState.readOnly.of(true),
            EditorView.theme({
              '&': {
                fontSize: '14px',
              },
              '.cm-content': {
                padding: '12px',
                minHeight: '200px',
              },
              '.cm-focused': {
                outline: 'none',
              },
              '.cm-editor': {
                borderRadius: '6px',
              },
              '.cm-scroller': {
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              },
            }),
          ]),
        ],
      });
    }
  }, [language]);

  return (
    <div className="h-full">
      <div ref={editorRef} style={{ height }} />
    </div>
  );
}
