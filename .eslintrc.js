const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import'],
  extends: ['airbnb-typescript/base', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
    'no-case-declarations': 'off',
    'no-restricted-syntax': ['error', "BinaryExpression[operator='of']"],
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'no-await-in-loop': 'off',
    "@typescript-eslint/no-unused-vars": 'off',
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': ['error', prettierOptions],
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
};
