import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: '@my-mono/ui',
      formats: ['es', 'cjs'],
      // 根据 format 生成对应文件名
      fileName: (format) => {
        if (format === 'es') {
          return 'index.esm.js';
        }
        return 'index.js';
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' }
      }
    },
    outDir: 'dist'
  }
});