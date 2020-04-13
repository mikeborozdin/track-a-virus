module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-named-as-default': 'off',
  },
  settings: {
    react: {
      version: 'autodetect',
    },
  },
};
