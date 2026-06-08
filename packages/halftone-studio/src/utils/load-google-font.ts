const loadedFonts = new Set<string>();
const loadingFonts = new Map<string, Promise<void>>();

/**
 * Load a Google Font on-demand by injecting a <link> element.
 * Deduplicates requests and waits for the font to be ready via document.fonts.
 */
export function loadGoogleFont(fontFamily: string): Promise<void> {
  if (loadedFonts.has(fontFamily)) {
    return Promise.resolve();
  }

  const existing = loadingFonts.get(fontFamily);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const encoded = fontFamily.replace(/ /g, '+');
    const url = `https://fonts.googleapis.com/css2?family=${encoded}:wght@100;200;300;400;500;600;700;800;900&display=swap`;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    link.onload = async () => {
      try {
        await document.fonts.ready;
        loadedFonts.add(fontFamily);
        loadingFonts.delete(fontFamily);
        resolve();
      } catch {
        loadingFonts.delete(fontFamily);
        resolve();
      }
    };

    link.onerror = () => {
      loadingFonts.delete(fontFamily);
      reject(new Error(`Failed to load Google Font: ${fontFamily}`));
    };

    document.head.appendChild(link);
  });

  loadingFonts.set(fontFamily, promise);
  return promise;
}

export function isGoogleFontLoaded(fontFamily: string): boolean {
  return loadedFonts.has(fontFamily);
}
