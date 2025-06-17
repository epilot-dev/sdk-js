import { defineConfig } from 'vitest/config'

export default defineConfig({
  assetsInclude: ['**/*.yml'],
  test: {
    coverage: {
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text-summary', 'html', 'cobertura']
    },
    globals: true,
    outputFile: 'test-report.xml',
    poolOptions: {
      threads: {
        // Tests don't rely on globals but can't currently run concurrently
        // -> this improves performance by skipping test-level isolation.
        singleThread: true
      }
    },
    reporters: ['default', 'junit'],
    silent: true,
    watch: false
  }
})
