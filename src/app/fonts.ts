import { JetBrains_Mono, Lato, Raleway } from "next/font/google"

export const raleway = Raleway({ display: "swap", subsets: ["latin"] })
export const jetbrains_mono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
export const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "900"],
})
