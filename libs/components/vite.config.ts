import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import stringHash from 'string-hash';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    root: resolve(__dirname, '.'),
    plugins: [
      vue(),
      dts({
        outDir: ['./dist'],
        tsconfigPath: resolve(__dirname, './tsconfig.app.json'),
        include: ['./src/**/*.ts', './src/**/*.vue', './index.ts', './reg.ts'],
        exclude: ['./src/**/__tests__'],
      }),
    ],
    build: {
      minify: false,

      rollupOptions: {
        external: ['vue', 'vue-router'],
        input: [
          resolve(__dirname, './reg.ts'),
          resolve(__dirname, './index.ts'),
          resolve(__dirname, './src/enums/index.ts'),
          resolve(__dirname, './src/components/app-link/index.ts'),
          resolve(__dirname, './src/components/app-link/enums.ts'),
          resolve(__dirname, './src/components/attachments/index.ts'),
          resolve(__dirname, './src/components/buttons/index.ts'),
          resolve(__dirname, './src/components/buttons/enums.ts'),
          resolve(__dirname, './src/components/calendars/index.ts'),
          resolve(__dirname, './src/components/calendars/enums.ts'),
          resolve(__dirname, './src/components/charts/index.ts'),
          resolve(__dirname, './src/components/documents/index.ts'),
          resolve(__dirname, './src/components/drag-and-drop/index.ts'),
          resolve(__dirname, './src/components/dropdown-menu/index.ts'),
          resolve(__dirname, './src/components/flexible-menu/index.ts'),
          resolve(__dirname, './src/components/forms/index.ts'),
          resolve(__dirname, './src/components/hints/index.ts'),
          resolve(__dirname, './src/components/icons/index.ts'),
          resolve(__dirname, './src/components/icons/enums.ts'),
          resolve(__dirname, './src/components/inputs/index.ts'),
          resolve(__dirname, './src/components/inputs/enums.ts'),
          resolve(__dirname, './src/components/modals/index.ts'),
          resolve(__dirname, './src/components/paginator/index.ts'),
          resolve(__dirname, './src/components/popup/index.ts'),
          resolve(__dirname, './src/components/portal-table/index.ts'),
          resolve(__dirname, './src/components/portal-table-model/index.ts'),
          resolve(__dirname, './src/components/selects/index.ts'),
          resolve(__dirname, './src/components/skeletons/index.ts'),
          resolve(__dirname, './src/components/snack-bar/index.ts'),
          resolve(__dirname, './src/components/stubs/index.ts'),
          resolve(__dirname, './src/components/tab-data/index.ts'),
          resolve(__dirname, './src/components/table/index.ts'),
          resolve(__dirname, './src/components/tags/index.ts'),
          resolve(__dirname, './src/components/tree/index.ts'),
        ],
        output: [
          {
            format: 'es',
            entryFileNames: '[name].mjs',
            preserveModules: true,
            preserveModulesRoot: '.',
            exports: 'named',
            dir: './dist',
            globals: {
              vue: 'Vue',
              'vue-router': 'vue-router',
            },
          },
          {
            format: 'cjs',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: '.',
            exports: 'named',
            dir: './dist',
            globals: {
              vue: 'Vue',
              'vue-router': 'vue-router',
            },
          },
        ],
      },
      lib: {
        entry: [
          resolve(__dirname, './reg.ts'),
          resolve(__dirname, './index.ts'),
          resolve(__dirname, './src/enums/index.ts'),
          resolve(__dirname, './src/components/app-link/index.ts'),
          resolve(__dirname, './src/components/app-link/enums.ts'),
          resolve(__dirname, './src/components/attachments/index.ts'),
          resolve(__dirname, './src/components/buttons/index.ts'),
          resolve(__dirname, './src/components/buttons/enums.ts'),
          resolve(__dirname, './src/components/calendars/index.ts'),
          resolve(__dirname, './src/components/calendars/enums.ts'),
          resolve(__dirname, './src/components/charts/index.ts'),
          resolve(__dirname, './src/components/documents/index.ts'),
          resolve(__dirname, './src/components/drag-and-drop/index.ts'),
          resolve(__dirname, './src/components/dropdown-menu/index.ts'),
          resolve(__dirname, './src/components/flexible-menu/index.ts'),
          resolve(__dirname, './src/components/forms/index.ts'),
          resolve(__dirname, './src/components/hints/index.ts'),
          resolve(__dirname, './src/components/icons/index.ts'),
          resolve(__dirname, './src/components/icons/enums.ts'),
          resolve(__dirname, './src/components/inputs/index.ts'),
          resolve(__dirname, './src/components/inputs/enums.ts'),
          resolve(__dirname, './src/components/modals/index.ts'),
          resolve(__dirname, './src/components/paginator/index.ts'),
          resolve(__dirname, './src/components/popup/index.ts'),
          resolve(__dirname, './src/components/portal-table/index.ts'),
          resolve(__dirname, './src/components/portal-table-model/index.ts'),
          resolve(__dirname, './src/components/selects/index.ts'),
          resolve(__dirname, './src/components/skeletons/index.ts'),
          resolve(__dirname, './src/components/snack-bar/index.ts'),
          resolve(__dirname, './src/components/stubs/index.ts'),
          resolve(__dirname, './src/components/tab-data/index.ts'),
          resolve(__dirname, './src/components/table/index.ts'),
          resolve(__dirname, './src/components/tags/index.ts'),
          resolve(__dirname, './src/components/tree/index.ts'),
        ],
        name: 'test',
      },
    },
    resolve: {
      alias: {
        '@comp': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          require('./plugins/postcss-tailwindcss-ts-classnames')({
            dest: 'src/types/cssClasses.d.ts',
            // Set isModule if you want to import ClassNames from another file
            isModule: true,
            exportAsDefault: true, // to use in combination with isModule
          }),
        ],
      },
    },
  });
};
