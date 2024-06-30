import type { Metadata } from "next"

import classNames from "classnames"
import { Raleway } from "next/font/google"
import { ReactNode } from "react"

import Navbar from "./components/navbar"
import "./styles.css"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  applicationName: "sim0wn's portfolio",
  authors: [{ name: "sim0wn" }],
  creator: "sim0wn",
  description:
    "Sou um estudante de Segurança da Informação apaixonado por desafios. Aqui, eu reúno minhas atividades e busco transmitir conhecimento. Confira meu portfólio completo e entre em contato para discutir oportunidades de trabalho.",
  icons: {
    icon: "/icons/favicon.ico",
  },
  keywords: [
    "Segurança da Informação",
    "Hacking",
    "Portfolio",
    "CTF",
    "Hackers do Bem",
    "Desenvolvedor Web",
    "Python",
    "BASH",
    "TypeScript",
    "API",
    "Linux",
  ],
  title: { default: "whoami | sim0wn", template: "%s | sim0wn" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html>
      <body
        className={classNames(
          raleway.className,
          "dark:bg-neutral-950 dark:text-neutral-50 h-screen grid grid-rows-[min-content_1fr]",
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
