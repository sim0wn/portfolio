import type { Linter } from "eslint"

import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import perfectionist from "eslint-plugin-perfectionist"

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  perfectionist.configs["recommended-natural"],
  prettier,
  {
    files: ["/*.ts", "/*.tsx"],
    ignores: [".next/**/*", "node_modules/**/*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      perfectionist,
    },
    rules: {},
  },
] satisfies Linter.Config[]

export default config
