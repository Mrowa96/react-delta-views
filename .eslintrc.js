module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-hooks', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'react/jsx-props-no-spreading': 'off',
  },
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {},
    },
  },
};
