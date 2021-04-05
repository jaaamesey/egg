import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import brotli from 'rollup-plugin-brotli';

export default defineConfig({
  server: { https: true },
  plugins: [reactRefresh(), brotli()],
});
