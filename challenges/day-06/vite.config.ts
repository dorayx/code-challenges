/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/canary/',
  plugins: [react()],
  define: {
    'import.meta.vitest': 'undefined',
  },
  build: {
    outDir: 'canary',
  },
  test: {
    setupFiles: ['tests/setup.ts'],
    // enable in-source testing to bring a closer feedback loop for development
    // @see https://vitest.dev/guide/in-source.html
    includeSource: ['src/**/*.{ts,tsx}'],
  },
});
