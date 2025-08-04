import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/themes/index.ts',
    'src/tokens/index.ts',
    'src/email/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2020',
  tsconfig: 'tsconfig.tsup.json',
  external: [
    'react',
    'react-dom',
    'next-themes',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    '@tabler/icons-react',
  ],
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});
