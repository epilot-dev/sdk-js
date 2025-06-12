import { resolve } from 'path'

export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'epilot-app-bridge',
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        output: {
          entryFileNames: 'index.js',
        },
      },
    },
  },
}
