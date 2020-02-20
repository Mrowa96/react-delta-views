const javaScriptConfig = {
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-prototype-builtins': 'off',
    'prettier/prettier': 'error',
  },
  env: {
    node: true,
    es6: true,
  },
};

const typeScriptConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  env: {
    node: false,
    browser: true,
    jest: false,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};

const testsConfig = {
  ...typeScriptConfig,
  files: ['**/*.test.ts', '**/*.test.tsx'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  rules: {
    'no-restricted-globals': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  env: {
    node: true,
    browser: false,
    jest: true,
  },
};

module.exports = {
  ...javaScriptConfig,
  overrides: [typeScriptConfig, testsConfig],
};
