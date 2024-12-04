import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import {
  GitHub,
  HackTheBox,
  Lattes,
  Lettermark,
  LinkedIn,
  TryHackMe,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/ui/external-link"
import { getTranslation } from "@/lib/translations.lib"
import { getLocale, getLocaleDomain } from "@/utils/locale.util"
import classNames from "classnames"
import { Code, Globe, Library, Newspaper, Send, Shield } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { lato, raleway } from "./fonts"
import "./styles.css"
import { Toaster } from "@/components/ui/toaster"

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
  modal,
}: Readonly<{
  children: ReactNode
  modal: ReactNode
}>) {
  const locale = await getLocale()
  const translation = await getTranslation(locale)
  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "flex min-h-svh flex-col scroll-smooth bg-neutral-100 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50",
        )}
      >
        <header
          className={classNames(
            lato.className,
            "sticky inset-0 top-0 z-40 bg-neutral-100/85 shadow-purple-1000 drop-shadow-md backdrop-blur-md sm:p-0 dark:border-b dark:border-b-neutral-900 dark:bg-neutral-950/85",
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
        {modal}
        <NuqsAdapter>{children}</NuqsAdapter>
        <footer className="grid h-fit grid-cols-2 justify-between border-t bg-neutral-100 p-2 dark:border-t-neutral-800 dark:bg-neutral-900">
          <section className="col-span-full flex h-full w-full flex-col p-2 sm:col-span-1">
            <h1 className="border-b px-2 text-center sm:text-start dark:border-b-neutral-800">
              {translation.footer.sections.social.title}
            </h1>
            <menu className="flex w-full flex-1 flex-col place-content-center items-start gap-2 *:*:flex *:*:gap-2">
              <li>
                <Button asChild variant={"link"}>
                  <ExternalLink href="https://www.linkedin.com/in/halissoncruz/">
                    <LinkedIn />
                    LinkedIn
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <ExternalLink href="http://lattes.cnpq.br/4781391320784524/">
                    <Lattes />
                    Lattes
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <ExternalLink href="https://app.hackthebox.com/profile/143157/">
                    <HackTheBox />
                    Hack The Box
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <ExternalLink href="https://github.com/sim0wn/">
                    <GitHub />
                    GitHub
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <ExternalLink href="https://tryhackme.com/p/sim0wn/">
                    <TryHackMe />
                    Try Hack Me
                  </ExternalLink>
                </Button>
              </li>
            </menu>
          </section>
          <section className="col-span-full flex h-full w-full flex-col p-2 sm:col-span-1">
            <h1 className="border-b px-2 text-center sm:text-start dark:border-b-neutral-800">
              {translation.footer.sections.links.title}
            </h1>
            <menu className="flex w-full flex-1 flex-col place-content-center items-start gap-2 *:*:flex *:*:gap-2">
              <li>
                <Button variant={"link"} asChild>
                  <Link
                    href={`https://${
                      locale === "pt-BR"
                        ? getLocaleDomain("en-US")
                        : getLocaleDomain("pt-BR")
                    }/`}
                  >
                    <Globe size={"1em"} />
                    {translation.footer.sections.links.switchLanguage}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild>
                  <ExternalLink href={"https://github.com/sim0wn/portfolio"}>
                    <Code size={"1em"} />
                    {translation.footer.sections.links.sourceCode}
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild>
                  <Link href={"/privacy"}>
                    <Shield size={"1em"} />
                    {translation.footer.sections.links.privacyPolicy}
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} asChild>
                  <Link href={"/terms"}>
                    <Library size={"1em"} />
                    {translation.footer.sections.links.termsOfService}
                  </Link>
                </Button>
              </li>
            </menu>
          </section>
          <p className="col-span-full items-center justify-center text-center text-sm">
            {translation.footer.title}
          </p>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
