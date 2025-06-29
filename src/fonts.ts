import { JetBrains_Mono, Lato, Raleway } from "next/font/google"

const jetbrains_mono = JetBrains_Mono({
  display: "swap",
  fallback: ["system-ui", "monospace"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
})

const raleway = Raleway({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "500", "700", "900"],
})

const lato = Lato({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
})

export { jetbrains_mono, lato, raleway }
