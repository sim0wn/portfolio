import js from "@eslint/js"
import next from "eslint-config-next"
import prettier from "eslint-config-prettier"
import perfectionist from "eslint-plugin-perfectionist"

export default [
  js.configs.recommended,
  next.coreWebVitals,
  perfectionist.configs.recommendedNatural,
  prettier,
  {
    plugins: {
      perfectionist,
    },
    rules: {},
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
