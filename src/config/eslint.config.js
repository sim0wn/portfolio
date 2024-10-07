import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import next from "eslint-config-next"
import prettier from "eslint-config-prettier"
import perfectionist from "eslint-plugin-perfectionist"

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
})

export default [
  js.configs.recommended,
  next.coreWebVitals,
  perfectionist.configs.recommendedNatural,
  prettier,
  {
    plugins: {
      perfectionist,
    },
    rules: {
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    env: {
      browser: true,
      es2021: true,
    },
  },
]
