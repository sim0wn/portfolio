import classNames from "classnames"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import { ReactNode } from "react"
import "./styles.css"

const raleway = Raleway({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { template: "%s | sim0wn", default: "whoami | sim0wn" },
  description:
    "Sou um estudante de Segurança da Informação apaixonado em solucionar desafios. Aqui, eu reúno minhas atividades e busco transmitir conhecimento. Confira meu portfólio completo e entre em contato para discutir oportunidades de trabalho.",
  authors: [{ name: "sim0wn" }],
  creator: "sim0wn",
  applicationName: "sim0wn's portfolio",
  keywords: ["Segurança da Informação", "Hacking", "Portfolio", "CTF"],
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
          "dark:bg-neutral-950 dark:text-neutral-50",
        )}
      >
        {children}
      </body>
    </html>
  )
}
