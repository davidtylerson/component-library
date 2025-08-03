module.exports = {
  // Lint and format TypeScript/JavaScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],

  // Format other files
  '*.{json,md,yml,yaml,css,scss}': ['prettier --write'],

  // Type check TypeScript files
  '*.{ts,tsx}': ['tsc --noEmit'],
};
