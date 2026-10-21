import { EditorView } from 'codemirror';

/**
 * One theme for every CodeMirror surface in the app.
 *
 * The JSON editor and the template code viewer used to carry their own
 * near-copies of this, which drifted: the viewer left `.cm-content` and the
 * gutters transparent, so oneDark's own `#282c34` showed through while the
 * JSON panel painted `--bg-primary-alt`. Two editors side by side on two
 * different backgrounds. Both now import this.
 */
/** Float brand purple, darkest step (--color-brand-950). */
const SELECTION_BG = '#15154d';

/** Panel surface: white in light mode, the lighter grey in dark mode. */
const SURFACE = 'var(--panel-surface)';

export const floatEditorTheme = EditorView.theme({
  '&': {
    fontSize: '12px',
    height: '100%',
    backgroundColor: `${SURFACE} !important`,
  },
  '.cm-editor': {
    height: '100%',
    backgroundColor: `${SURFACE} !important`,
  },
  '.cm-scroller': {
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    backgroundColor: `${SURFACE} !important`,
    overflow: 'auto !important',
    maxHeight: '100%',
  },
  '.cm-content': {
    padding: '8px 10px',
    minHeight: '100%',
    backgroundColor: `${SURFACE} !important`,
    userSelect: 'text !important',
    WebkitUserSelect: 'text !important',
    cursor: 'text !important',
  },
  '.cm-line': {
    userSelect: 'text !important',
    WebkitUserSelect: 'text !important',
    cursor: 'text !important',
  },
  '.cm-focused': {
    outline: 'none',
  },
  // Fold arrows add noise to a read-only view and aren't used in either panel.
  '.cm-foldGutter': {
    display: 'none !important',
  },
  '.cm-gutters': {
    backgroundColor: `${SURFACE} !important`,
    color: 'var(--text-disabled) !important',
    borderRight: '1px solid var(--border-tertiary) !important',
    paddingRight: '0',
    border: 'none',
  },
  // Line numbers are wayfinding, not content — keep them quiet.
  '.cm-lineNumbers': {
    color: 'var(--text-disabled) !important',
    fontSize: '11px',
    opacity: '0.6',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 8px 0 6px !important',
    minWidth: '32px',
    textAlign: 'right',
    color: 'var(--text-disabled) !important',
  },
  '.cm-activeLine': {
    backgroundColor: 'transparent !important',
  },
  // The active line's number stays a touch brighter than its neighbours.
  '.cm-activeLineGutter': {
    backgroundColor: `${SURFACE} !important`,
    color: 'var(--text-tertiary) !important',
  },
  // Selection: dark brand purple behind white text.
  //
  // Two mechanisms are needed. CodeMirror's drawSelection extension (bundled in
  // basicSetup) paints its own layer behind the text, which is what
  // `.cm-selectionBackground` targets — but a painted layer can't change the
  // glyph colour. The native `::selection` rule is what turns the text white,
  // so both are set to the same colour and kept in sync.
  '.cm-selectionBackground': {
    backgroundColor: `${SELECTION_BG} !important`,
    opacity: '1 !important',
  },
  '&.cm-focused .cm-selectionBackground': {
    backgroundColor: `${SELECTION_BG} !important`,
    opacity: '1 !important',
  },
  '.cm-selectionLayer .cm-selectionBackground': {
    backgroundColor: `${SELECTION_BG} !important`,
  },
  '.cm-content ::selection, .cm-line::selection, .cm-content::selection': {
    backgroundColor: `${SELECTION_BG} !important`,
    color: '#ffffff !important',
  },
});
