import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { GOOGLE_FONTS } from '../data/google-fonts';
import { loadGoogleFont } from '../utils/load-google-font';
import type { LoadedFont } from '../atoms';

const SYSTEM_FONTS = [
  'Inter',
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Impact',
  'Verdana',
  'Trebuchet MS',
];

interface FontOption {
  name: string;
  family: string;
  source: 'system' | 'google' | 'custom';
}

interface FontPickerProps {
  value: string;
  onChange: (family: string) => void;
  customFonts: LoadedFont[];
}

export function FontPicker({ value, onChange, customFonts }: FontPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loadingFont, setLoadingFont] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allFonts = useMemo<FontOption[]>(() => {
    const fonts: FontOption[] = [];
    for (const f of customFonts) {
      fonts.push({ name: f.name, family: f.family, source: 'custom' });
    }
    for (const f of SYSTEM_FONTS) {
      fonts.push({ name: f, family: f, source: 'system' });
    }
    for (const f of GOOGLE_FONTS) {
      if (!SYSTEM_FONTS.includes(f)) {
        fonts.push({ name: f, family: f, source: 'google' });
      }
    }
    return fonts;
  }, [customFonts]);

  const filtered = useMemo(() => {
    if (!search.trim()) return allFonts;
    const q = search.toLowerCase();
    return allFonts.filter(f => f.name.toLowerCase().includes(q));
  }, [allFonts, search]);

  const currentFontName = useMemo(() => {
    const found = allFonts.find(f => f.family === value);
    return found?.name ?? value;
  }, [allFonts, value]);

  const handleSelect = useCallback(
    async (font: FontOption) => {
      if (font.source === 'google') {
        setLoadingFont(font.family);
        try {
          await loadGoogleFont(font.family);
        } catch (err) {
          console.error('Failed to load font:', err);
        }
        setLoadingFont(null);
      }
      onChange(font.family);
      setIsOpen(false);
      setSearch('');
    },
    [onChange]
  );

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    } else if (e.key === 'Enter' && filtered.length > 0) {
      handleSelect(filtered[0]);
    }
  };

  const sourceLabel = (source: FontOption['source']) => {
    switch (source) {
      case 'google':
        return 'G';
      case 'system':
        return 'S';
      case 'custom':
        return 'C';
    }
  };

  const sourceColor = (source: FontOption['source']) => {
    switch (source) {
      case 'google':
        return 'text-blue-400';
      case 'system':
        return 'text-text-quaternary';
      case 'custom':
        return 'text-emerald-400';
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-border-secondary bg-bg-primary text-text-primary hover:border-border-primary focus:ring-border-brand flex h-8 w-full items-center justify-between rounded-md border px-2 text-xs transition-colors focus:outline-none focus:ring-1"
      >
        <span className="truncate">
          {loadingFont ? 'Loading...' : currentFontName}
        </span>
        <svg
          className="h-3 w-3 shrink-0 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="border-border-secondary bg-bg-primary absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-md border shadow-lg">
          {/* Search input */}
          <div className="border-border-tertiary border-b p-1.5">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search fonts..."
              className="bg-bg-secondary text-text-primary placeholder:text-text-quaternary h-7 w-full rounded border-none px-2 text-xs outline-none"
            />
          </div>

          {/* Font list */}
          <div ref={listRef} className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="text-text-quaternary px-3 py-4 text-center text-xs">
                No fonts found
              </div>
            ) : (
              filtered.map(font => (
                <button
                  key={`${font.source}-${font.family}`}
                  type="button"
                  onClick={() => handleSelect(font)}
                  className={`hover:bg-bg-secondary flex w-full items-center justify-between px-2.5 py-1.5 text-left text-xs transition-colors ${
                    font.family === value
                      ? 'bg-bg-tertiary text-text-primary font-medium'
                      : 'text-text-secondary'
                  }`}
                >
                  <span className="truncate">{font.name}</span>
                  <span
                    className={`shrink-0 text-[9px] font-semibold uppercase ${sourceColor(font.source)}`}
                  >
                    {sourceLabel(font.source)}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
