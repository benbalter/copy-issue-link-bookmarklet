const { defineConfig } = require('eslint/config');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
);
