import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', 
  css: {
    // إجبار Vite على دمج جميع ملفات الـ CSS في ملف واحد فقط
    codeSplit: false,
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
    cssCodeSplit: false, // إلغاء تقسيم الـ CSS لأجزاء منفصلة
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'assets/main.js',
        chunkFileNames: 'assets/[name]-[hash].js',
        // توحيد اسم ملف الـ CSS المخرج إلى main.css دائماً
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/main.css';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
});