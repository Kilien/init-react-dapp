import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), react()],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssNested(),
        autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
        cssnano({ preset: 'default' }),
      ],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
