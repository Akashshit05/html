import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

const apiPort = process.env.PORT || '5185';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': `http://localhost:${apiPort}`
    }
  }
});
