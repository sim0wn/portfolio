import type { Metadata } from "next"

import { getDictionary } from "@/lib/dictionaries"
import { getLocale } from "@/utils/locale.utils"
import classNames from "classnames"
import { headers } from "next/headers"
import Link from "next/link"
import { ReactNode } from "react"

import { Email } from "./components/icons/email"
import { Github } from "./components/icons/github"
import { HackTheBox } from "./components/icons/hackthebox"
import { Lattes } from "./components/icons/lattes"
import { LinkedIn } from "./components/icons/linkedin"
import { TryHackMe } from "./components/icons/tryhackme"
import Navbar from "./components/navbar"
import { lato, raleway } from "./fonts"
import "./styles.css"

export const metadata: Metadata = {
  applicationName: "sim0wn's portfolio",
  authors: [{ name: "sim0wn" }],
  creator: "sim0wn",
  description:
    "Hello, friend. I'm sim0wn, a developer and penetration tester specializing in web application vulnerability assessment.",
  keywords: [
    "Segurança da Informação",
    "Information Security",
    "Hacking",
    "Portfolio",
    "CTF",
    "Hackers do Bem",
    "Desenvolvedor Web",
    "Web Developer",
    "Python",
    "BASH",
    "TypeScript",
    "API",
    "Linux",
  ],
  title: { default: "whoami | sim0wn", template: "%s | sim0wn" },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const locale = getLocale(headers())
  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "bg-neutral-950 text-neutral-50 h-screen grid grid-rows-[min-content_1fr] md:px-16",
        )}
      >
        <header className={classNames(lato.className, "px-2 py-3 md:p-0")}>
          <Navbar dictionary={await getDictionary(locale)} />
        </header>
        {children}
        <footer>
          <menu className="py-2 text-4xl flex gap-2 justify-center hover:*:transition-transform hover:*:scale-125">
            <li>
              <Link
                href={"https://www.linkedin.com/in/halissoncruz/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedIn />
              </Link>
            </li>
            <li>
              <Link
                href={"http://lattes.cnpq.br/4781391320784524/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Lattes />
              </Link>
            </li>
            <li>
              <Link
                href={"https://app.hackthebox.com/profile/143157/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <HackTheBox />
              </Link>
            </li>
            <li>
              <Link
                href={"https://github.com/sim0wn/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github />
              </Link>
            </li>
            <li>
              <Link
                href={"https://tryhackme.com/p/sim0wn/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <TryHackMe />
              </Link>
            </li>
            <li>
              <Link
                href={"mailto:contact@sim0wn.com"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Email />
              </Link>
            </li>
          </menu>
        </footer>
      </body>
    </html>
  )
}
