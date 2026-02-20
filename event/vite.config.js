import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5175, // Set default port to 5175
  },
  plugins: [react()],
});
