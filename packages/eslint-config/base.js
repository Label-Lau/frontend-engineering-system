import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // 添加 storybook-static
  globalIgnores(['dist', 'dist-ssr', 'storybook-static']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
]);
