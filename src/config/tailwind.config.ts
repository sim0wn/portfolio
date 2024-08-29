import type { Config } from "tailwindcss"

import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        purple: {
          "deep-plum": "#34233C",
          plum: "#732961",
        },
      },
    },
  },
}
export default config
