import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Permissions-Policy': 'interest-cohort=()'
    }
  },
  preview: {
    port: 3000,
    host: true,
    open: true
  },
  base: '/markabella.github.io/',
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});