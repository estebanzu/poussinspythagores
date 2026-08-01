import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['public/js/**/*.test.js'],
    exclude: ['test/server.test.js'],
  },
});
