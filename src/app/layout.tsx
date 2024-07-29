import type { Metadata } from "next"

import EmailIcon from "@/icons/email.icon"
import GithubIcon from "@/icons/github.icon"
import HackTheBoxIcon from "@/icons/hackthebox.icon"
import LattesIcon from "@/icons/lattes.icon"
import LinkedInIcon from "@/icons/linkedin.icon"
import TryHackMeIcon from "@/icons/tryhackme.icon"
import classNames from "classnames"
import Link from "next/link"
import { ReactNode } from "react"

import { raleway } from "./fonts"
import "./styles.css"

export const metadata: Metadata = {
  applicationName: "sim0wn's portfolio",
  authors: [{ name: "sim0wn" }],
  creator: "sim0wn",
  description:
    "Hello, friend. I'm sim0wn, a developer and penetration tester specializing in web application vulnerability assessment.",
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
          "bg-neutral-950 text-neutral-50 h-screen grid grid-rows-[min-content_1fr] md:px-16",
        )}
      >
        <header>
          <nav className={"px-2 flex py-3 justify-center"}>
            <Link className="flex text-xl" href={"/"}>
              sim0wn
            </Link>
            <menu className="flex flex-1 gap-2 justify-end *:px-2 *:py-0.5 py-1 text-lg">
              <li>
                <Link href={"/articles"}>Articles</Link>
              </li>
              <li className="bg-purple-800 rounded-lg font-bold">
                <Link href={"/whoami"}>Who Am I</Link>
              </li>
            </menu>
          </nav>
        </header>
        {children}
        <footer>
          <menu className="py-2 text-4xl flex gap-2 justify-center">
            <li>
              <Link
                href={"https://www.linkedin.com/in/halissoncruz/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
              </Link>
            </li>
            <li>
              <Link
                href={"http://lattes.cnpq.br/4781391320784524/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <LattesIcon />
              </Link>
            </li>
            <li>
              <Link
                href={"https://app.hackthebox.com/profile/143157/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <HackTheBoxIcon />
              </Link>
            </li>
            <li>
              <Link
                href={"https://github.com/sim0wn/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon />
              </Link>
            </li>
            <li>
              <Link
                href={"https://tryhackme.com/p/sim0wn/"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <TryHackMeIcon />
              </Link>
            </li>
            <li>
              <Link
                href={"mailto:contact@sim0wn.com"}
                rel="noopener noreferrer"
                target="_blank"
              >
                <EmailIcon />
              </Link>
            </li>
          </menu>
        </footer>
      </body>
    </html>
  )
}
