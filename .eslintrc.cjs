module.exports = {
  root: true,
  plugins: ['eslint-plugin-import'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: true,
      },
    ],
    'import/no-extraneous-dependencies': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Paginator', 'Page'],
      },
    ],
  },
  globals: {
    NodeJS: true,
  },
};
