import nextVitals from "eslint-config-next/core-web-vitals"
import prettier from "eslint-config-prettier"
import perfectionist from "eslint-plugin-perfectionist"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...nextVitals,
  perfectionist.configs["recommended-natural"],
  prettier,
  {
    files: ["/*.ts", "/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      perfectionist,
    },
    rules: {},
  },
  globalIgnores([
    ".next/**/*",
    "node_modules/**/*",
    "src/app/(payload)/admin/importMap.js",
  ]),
])
