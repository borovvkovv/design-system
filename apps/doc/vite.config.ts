import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import stringHash from 'string-hash';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    publicDir: 'layout-page-example/dist',
    base: process.env.VITE_PUBLIC_PATH,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        input: {
          app: './index.html', // default
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
      modules: {
        generateScopedName: (name, filename, css) => {
          const hash = stringHash(css).toString(36).substring(0, 5);
          const fileAndQueryName = filename.split('/').pop();
          const fileName = fileAndQueryName && fileAndQueryName.split('.').shift();
          return `${fileName}_${name}_${hash}`;
        },
      },
    },
  });
};
