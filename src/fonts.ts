import { Inter, JetBrains_Mono, Raleway } from "next/font/google"

const inter = Inter({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrains_mono = JetBrains_Mono({
  display: "swap",
  fallback: ["system-ui", "monospace"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const raleway = Raleway({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-raleway",
})

export { inter, jetbrains_mono, raleway }
