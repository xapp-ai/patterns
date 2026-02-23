import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "no-undef": "off", // TypeScript handles this
    },
  },
  {
    files: ["**/__test__/**/*.ts", "**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off", // Chai assertions use expressions
    },
  },
  {
    ignores: ["node_modules/**", "lib/**"],
  },
];
