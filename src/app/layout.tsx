import type { Metadata } from "next"

import {
  Email,
  GitHub,
  HackTheBox,
  Lattes,
  Lettermark,
  LinkedIn,
  TryHackMe,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/ui/external-link"
import { Toaster } from "@/components/ui/toaster"
import { getTranslation } from "@/lib/translations.lib"
import { getLocale, getLocaleDomain } from "@/utils/locale.util"
import classNames from "classnames"
import { Library, Newspaper, Send } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { lato, raleway } from "./fonts"
import "./styles.css"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
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
  const locale = await getLocale()
  const translation = await getTranslation(locale)
  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "grid h-dvh grid-rows-[min-content_1fr] gap-4 scroll-smooth bg-neutral-950 text-neutral-50",
        )}
      >
        <header
          className={classNames(
            lato.className,
            "w-dvw border-b border-b-neutral-900 bg-inherit bg-opacity-50 backdrop-blur-md sm:p-0",
          )}
        >
          <nav
            className="container flex items-center justify-between py-2"
            id="navbar"
          >
            <menu className="*:*:text-md flex w-full gap-1.5 *:*:flex *:flex *:*:items-center *:items-center *:*:gap-2">
              <li>
                <Button asChild variant={"ghost"} size={"sm"}>
                  <Link href={"/"}>
                    <Lettermark className="text-xl" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"} size={"sm"}>
                  <Link href={"/blog"}>
                    <Newspaper width={"1em"} />
                    Blog
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"} size={"sm"}>
                  <ExternalLink href={"https://logs.sim0wn.com.br/"}>
                    <Library width={"1em"} />
                    Logs
                  </ExternalLink>
                </Button>
              </li>
              <li className="flex-1 place-content-end">
                <Button asChild size={"sm"}>
                  <Link
                    className={classNames("flex items-center gap-2")}
                    href={"/#contact"}
                  >
                    <Send width={"1em"} />
                    {translation.navigationBar.contact}
                  </Link>
                </Button>
              </li>
            </menu>
          </nav>
        </header>
        {children}
        <footer className="h-fit border-t border-t-neutral-800 bg-neutral-900">
          <menu className="container flex justify-center gap-2 py-2 text-4xl hover:*:scale-125 hover:*:transition-transform">
            <li>
              <ExternalLink href="https://www.linkedin.com/in/halissoncruz/">
                <LinkedIn />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="http://lattes.cnpq.br/4781391320784524/">
                <Lattes />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://app.hackthebox.com/profile/143157/">
                <HackTheBox />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/sim0wn/">
                <GitHub />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://tryhackme.com/p/sim0wn/">
                <TryHackMe />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="mailto:contact@sim0wn.com">
                <Email />
              </ExternalLink>
            </li>
          </menu>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
