# Monaco Editor Styling Guide

This guide covers how to customize and style the Monaco editors in Float Mail application.

## Current Implementation

The JSON editor is implemented using `@monaco-editor/react` in `/src/components/MonacoEditor.tsx`.

## Customization Options

### 1. Theme Customization

#### Built-in Themes

```tsx
// Available themes
theme = 'vs-dark'; // Dark theme (current)
theme = 'vs-light'; // Light theme
theme = 'hc-black'; // High contrast dark
theme = 'hc-light'; // High contrast light
```

#### Custom Theme Definition

```tsx
import { loader } from '@monaco-editor/react';

// Define custom theme
loader.init().then(monaco => {
  monaco.editor.defineTheme('float-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'string.json', foreground: '#98C379' },
      { token: 'number.json', foreground: '#D19A66' },
      { token: 'keyword.json', foreground: '#C678DD' },
      { token: 'string.key.json', foreground: '#E06C75' },
    ],
    colors: {
      'editor.background': '#0F1419',
      'editor.foreground': '#BFBDB6',
      'editor.lineHighlightBackground': '#1D2021',
      'editor.selectionBackground': '#2F4F4F',
      'editor.inactiveSelectionBackground': '#3A3A3A',
      'editorLineNumber.foreground': '#5C6370',
      'editorLineNumber.activeForeground': '#C678DD',
      'editor.selectionHighlightBackground': '#3A3A3A',
      'editor.wordHighlightBackground': '#484E5B',
      'editorCursor.foreground': '#FFFFFF',
      'scrollbar.shadow': '#00000000',
      'scrollbarSlider.background': '#3A3A3A',
      'scrollbarSlider.hoverBackground': '#4A4A4A',
      'scrollbarSlider.activeBackground': '#5A5A5A',
    },
  });
});
```

### 2. Editor Options Configuration

#### Font and Typography

```tsx
options={{
  fontSize: 14,                    // Font size in pixels
  fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
  fontWeight: '400',              // Font weight
  lineHeight: 1.5,                // Line height multiplier
  letterSpacing: 0,               // Letter spacing in pixels
}}
```

#### UI Elements

```tsx
options={{
  minimap: {
    enabled: false,               // Hide minimap
    side: 'right',               // Minimap position
    showSlider: 'mouseover',     // When to show slider
    scale: 1,                    // Minimap scale
  },
  scrollBeyondLastLine: false,   // Prevent scrolling past last line
  lineNumbers: 'on',             // Show line numbers
  glyphMargin: false,            // Hide glyph margin
  folding: true,                 // Enable code folding
  foldingStrategy: 'indentation', // Folding strategy
  showFoldingControls: 'always', // When to show folding controls
  lineDecorationsWidth: 0,       // Width of line decorations
  lineNumbersMinChars: 3,        // Minimum chars for line numbers
  renderLineHighlight: 'all',    // Line highlight rendering
}}
```

#### Scrollbars

```tsx
options={{
  scrollbar: {
    vertical: 'visible',          // Vertical scrollbar
    horizontal: 'visible',        // Horizontal scrollbar
    verticalScrollbarSize: 12,    // Vertical scrollbar size
    horizontalScrollbarSize: 12,  // Horizontal scrollbar size
    alwaysConsumeMouseWheel: false,
    useShadows: true,            // Use shadows
    verticalHasArrows: false,    // Show arrows
    horizontalHasArrows: false,
    arrowSize: 11,               // Arrow size
  },
}}
```

#### Editing Behavior

```tsx
options={{
  wordWrap: 'on',               // Word wrapping
  wordWrapColumn: 80,           // Wrap column
  wrappingIndent: 'indent',     // Wrapping indentation
  tabSize: 2,                   // Tab size
  insertSpaces: true,           // Use spaces instead of tabs
  detectIndentation: true,      // Auto-detect indentation
  autoClosingBrackets: 'always', // Auto-close brackets
  autoClosingQuotes: 'always',  // Auto-close quotes
  autoSurround: 'languageDefined', // Auto-surround selection
  formatOnPaste: true,          // Format on paste
  formatOnType: true,           // Format on type
}}
```

### 3. Styling Container

#### Current Container Styling

```tsx
<div
  style={{
    height: '100%',
    width: '100%',
    border: '1px solid #374151',
    borderRadius: '6px',
    overflow: 'hidden'
  }}
>
```

#### Enhanced Container Styling

```tsx
<div
  className="monaco-editor-container"
  style={{
    height: '100%',
    width: '100%',
    border: '1px solid var(--border-tertiary)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#0F1419',
    position: 'relative',
  }}
>
```

### 4. CSS Customization

#### Global Editor Styles

```css
/* Add to your global CSS */
.monaco-editor {
  --vscode-editor-background: #0f1419 !important;
  --vscode-editor-foreground: #bfbdb6 !important;
}

.monaco-editor .margin {
  background-color: #0f1419 !important;
}

.monaco-editor .line-numbers {
  color: #5c6370 !important;
}

.monaco-editor .current-line {
  background-color: #1d2021 !important;
}

/* Custom scrollbar styling */
.monaco-editor .scrollbar .slider {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.monaco-editor .scrollbar .slider:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
```

### 5. Language-Specific Features

#### JSON Language Features

```tsx
// Enable JSON schema validation
loader.init().then(monaco => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: false,
    schemas: [
      {
        uri: 'http://myserver/foo-schema.json',
        fileMatch: ['*'],
        schema: {
          type: 'object',
          properties: {
            // Define your schema here
          },
        },
      },
    ],
  });
});
```

### 6. Custom Styling Implementation

To implement custom styling, modify `/src/components/MonacoEditor.tsx`:

```tsx
'use client';

import React, { useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Initialize Monaco with custom theme
loader.init().then(monaco => {
  monaco.editor.defineTheme('float-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'string.json', foreground: '#98C379' },
      { token: 'number.json', foreground: '#D19A66' },
      { token: 'keyword.json', foreground: '#C678DD' },
      { token: 'string.key.json', foreground: '#E06C75' },
    ],
    colors: {
      'editor.background': '#0F1419',
      'editor.foreground': '#BFBDB6',
      'editor.lineHighlightBackground': '#1D2021',
      'editor.selectionBackground': '#264F78',
      'editorLineNumber.foreground': '#5C6370',
      'editorCursor.foreground': '#FFFFFF',
    },
  });
});

export default function MonacoEditor({ value, onChange }) {
  return (
    <div className="monaco-container">
      <Editor
        theme="float-dark" // Use custom theme
        options={{
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
          lineHeight: 1.4,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          folding: true,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            useShadows: false,
          },
          renderLineHighlight: 'line',
          selectionHighlight: false,
          occurrencesHighlight: false,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
        }}
        // ... other props
      />
    </div>
  );
}
```

### 7. Recommended Styling Enhancements

1. **Better Container Design**:
   - Add subtle shadows
   - Use CSS variables for theming
   - Rounded corners with proper overflow handling

2. **Improved Typography**:
   - Use developer-friendly fonts (JetBrains Mono, Fira Code)
   - Optimize line height and spacing
   - Better color contrast

3. **Enhanced Scrollbars**:
   - Smaller, more elegant scrollbars
   - Better hover states
   - Consistent with app design system

4. **Loading States**:
   - Skeleton loading animation
   - Smooth transitions
   - Proper error states

5. **Accessibility**:
   - High contrast mode support
   - Keyboard navigation
   - Screen reader compatibility

### 8. Testing Styling Changes

1. Modify `MonacoEditor.tsx` with new styles
2. Restart development server: `npm run dev`
3. Test in browser at `http://localhost:3004`
4. Verify themes work across different templates
5. Test responsiveness and edge cases

This guide provides comprehensive options for customizing the Monaco editor appearance and behavior to match your design requirements.
