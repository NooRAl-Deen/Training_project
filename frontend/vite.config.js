import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/components/shared/styles'),
      '@profile': path.resolve(__dirname, './src/features/profile'),
      '@posts': path.resolve(__dirname, './src/features/posts'),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173
  }
});
