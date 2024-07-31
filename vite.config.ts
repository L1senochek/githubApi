import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitest from 'vitest';

const testConfig: vitest.InlineConfig = {
  coverage: {
    provider: 'v8',
  },
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/utils/tests/setup.ts',
};

export default defineConfig({
  plugins: [react()],
  test: testConfig,
});
