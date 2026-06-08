import React, { useCallback } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Input, Button } from '@float-vibe-foundry/design-system';
import {
  textAtom,
  fontFamilyAtom,
  fontSizeAtom,
  loadedFontsAtom,
} from '../atoms';
import { ParameterSlider } from './ParameterSlider';
import { FontPicker } from './FontPicker';

export function TextPanel() {
  const [text, setText] = useAtom(textAtom);
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const loadedFonts = useAtomValue(loadedFontsAtom);
  const setLoadedFonts = useSetAtom(loadedFontsAtom);

  const handleFontUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const fontName = file.name.replace(/\.(woff2?|ttf|otf)$/i, '');
      const fontFamily = `custom-${fontName}`;

      try {
        const arrayBuffer = await file.arrayBuffer();
        const font = new FontFace(fontFamily, arrayBuffer);
        await font.load();
        document.fonts.add(font);

        setLoadedFonts(prev => [
          ...prev,
          { name: fontName, family: fontFamily },
        ]);
        setFontFamily(fontFamily);
      } catch (err) {
        console.error('Failed to load font:', err);
      }

      e.target.value = '';
    },
    [setLoadedFonts, setFontFamily]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-xs font-medium">Text</label>
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text..."
          className="h-8 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-xs font-medium">Font</label>
        <div className="flex gap-1.5">
          <FontPicker
            value={fontFamily}
            onChange={setFontFamily}
            customFonts={loadedFonts}
          />
          <label>
            <Button
              variant="outline"
              size="sm"
              className="h-8 cursor-pointer text-xs"
              asChild
            >
              <span>Upload</span>
            </Button>
            <input
              type="file"
              accept=".woff,.woff2,.ttf,.otf"
              onChange={handleFontUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <ParameterSlider
        label="Font Size"
        value={fontSize}
        min={48}
        max={500}
        step={1}
        onChange={setFontSize}
        unit="px"
      />
    </div>
  );
}
