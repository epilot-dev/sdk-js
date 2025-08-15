import { defineConfig } from 'vitest/config';

export default defineConfig({
  assetsInclude: ['**/*.yml'],
  test: {
    coverage: {
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text-summary', 'html', 'cobertura'],
    },
    globals: true,
    outputFile: 'test-report.xml',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    reporters: ['default', 'junit'],
    silent: true,
    watch: false,
  },
});
