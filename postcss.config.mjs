/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": { config: "./src/config/tailwind.config.ts" },
  },
}

export default config
