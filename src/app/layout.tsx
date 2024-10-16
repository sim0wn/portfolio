import type { Metadata } from "next"

import { getTranslation } from "@/lib/translations.lib"
import { getLocale, getLocaleDomain } from "@/utils/locale.util"
import classNames from "classnames"
import Link from "next/link"
import { ReactNode } from "react"

import { BusinessUserCurriculum } from "../components/icons/business-user-curriculum"
import { Email } from "../components/icons/email"
import { GiftOfKnowledge } from "../components/icons/gift-of-knowledge"
import { Github } from "../components/icons/github"
import { HackTheBox } from "../components/icons/hackthebox"
import { Lattes } from "../components/icons/lattes"
import { Lettermark } from "../components/icons/lettermark"
import { LinkedIn } from "../components/icons/linkedin"
import { SquareArticle } from "../components/icons/square-article"
import { TryHackMe } from "../components/icons/tryhackme"
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
  const translation = await getTranslation(locale)
  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "grid h-screen grid-rows-[min-content_1fr] scroll-smooth bg-neutral-950 text-neutral-50",
        )}
      >
        <header
          className={classNames(lato.className, "container px-2 py-3 sm:p-0")}
        >
          <nav
            className="grid grid-cols-[min-content_1fr] items-center px-2"
            id="navbar"
          >
            <Link href={"/"} className="flex items-end gap-2">
              <Lettermark className="text-3xl" />
              sim0wn
            </Link>
            <menu
              className={classNames(
                "col-span-full w-full place-self-end", // general style
                "my-4 flex-col justify-end gap-2 rounded-lg border border-neutral-800 bg-neutral-900 py-2", // mobile style
                "sm:col-span-1 sm:flex sm:w-fit sm:flex-row sm:gap-4 sm:border-0 sm:bg-neutral-950", // desktop style
                "*:group *:flex *:items-center *:gap-2", // children style
              )}
            >
              <li>
                <SquareArticle />
                <Link href={"/blog"}>Blog</Link>
              </li>
              <li>
                <GiftOfKnowledge />
                <Link
                  href={"https://logs.sim0wn.com.br/"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {translation.navigation_bar.knowledge_base}
                </Link>
              </li>
              <li className="group">
                <BusinessUserCurriculum
                  className={classNames(
                    "md:bg-berry-600 md:rounded-md md:p-1 md:text-2xl",
                    "md:animate-[pulse_2.5s_ease-in-out_infinite]", // animation
                    "md:group-hover:animate-none", // hover style
                  )}
                />
                <Link
                  className={classNames(
                    "md:max-w-0 md:overflow-hidden md:whitespace-nowrap md:opacity-0", // desktop style
                    "group-hover:max-w-xs group-hover:opacity-100", // hover style
                    "transition-[opacity,max-width] duration-300 ease-in-out", // transition properties
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={"https://drive.proton.me/urls/PYTJCHBEPG#7RGY5BfA2LU8"}
                >
                  {translation.navigation_bar.whoami}
                </Link>
              </li>
            </menu>
          </nav>
        </header>
        {children}
        {/* TODO: improve footer layout */}
        <footer>
          <menu className="container flex justify-center gap-2 py-2 text-4xl hover:*:scale-125 hover:*:transition-transform">
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
