import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@layout': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist/layout-page-example',
      rollupOptions: {
        input: {
          app: './index.html', // default
          sm: './index-sm.html', // default
          md: './index-md.html', // default
          lg: './index-lg.html', // default
        },
      },
    },
    server: {
      watch: {
        ignored: ['**.d.ts'],
      },
    },
    css: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  });
};
