import { JetBrains_Mono, Lato, Raleway } from "next/font/google"

export const raleway = Raleway({ subsets: ["latin"] })
export const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})
export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "900"],
})
