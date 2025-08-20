module.exports = {
  // Lint and format TypeScript/JavaScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  // Format other files
  '*.{json,md,yml,yaml,css,scss}': ['prettier --write'],

  // Type check TypeScript files per package (only for files that have their own tsconfig)
  'packages/design-system/**/*.{ts,tsx}': () =>
    'cd packages/design-system && tsc --noEmit',
  'packages/float-mail/**/*.{ts,tsx}': () =>
    'cd packages/float-mail && tsc --noEmit',
  'packages/test-app/**/*.{ts,tsx}': () =>
    'cd packages/test-app && tsc --noEmit',
};
