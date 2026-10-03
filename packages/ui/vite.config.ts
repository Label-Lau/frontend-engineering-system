import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 构建配置
  build: {
    // 构建成一个库
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    // rollup 的配置选项
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
