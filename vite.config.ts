import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    checker({
      typescript: true,
    }),
  ],
  envDir: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
