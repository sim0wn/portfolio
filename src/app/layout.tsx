import type { Metadata } from "next"

import { getTranslation } from "@/lib/translations.lib"
import { getLocale, getLocaleDomain } from "@/utils/locale.utils"
import classNames from "classnames"
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
  const translation = await getTranslation(locale)
  return {
    applicationName: translation.metadata.applicationName,
    authors: [{ name: "sim0wn" }],
    creator: "sim0wn",
    description: translation.metadata.description,
    keywords: translation.metadata.keywords,
    openGraph: {
      description: translation.metadata.description,
      images: [] /* TODO: add image to OpenGraph */,
      locale: locale,
      siteName: translation.metadata.applicationName,
      title: translation.metadata.title.default,
      type: "website",
      url: `https://www.${getLocaleDomain(locale)}`,
    },
    publisher: "Vercel",
    title: {
      default: translation.metadata.title.default,
      template: "%s | sim0wn",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const locale = getLocale()
  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "bg-neutral-950 text-neutral-50 h-screen grid grid-rows-[min-content_1fr] md:px-16",
        )}
      >
        <header className={classNames(lato.className, "px-2 py-3 md:p-0")}>
          <Navbar dictionary={await getTranslation(locale)} />
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
