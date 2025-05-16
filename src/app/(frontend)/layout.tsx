import type { Metadata } from "next"

import { Lettermark } from "@/components/icons"
import { Button, ExternalLink, Toaster } from "@/components/ui"
import { getDictionary } from "@/lib"
import { getLocale, getLocaleDomain } from "@/utils"
import classNames from "classnames"
import { Code, Globe, Library, Send, Shield } from "lucide-react"
import { headers } from "next/headers"

import "./styles.css"

import Link from "next/link"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ReactNode, Suspense } from "react"

import { Social, SocialFallback } from "./_components/social"
import { lato, raleway } from "./fonts"

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale(await headers())
  const dictionary = await getDictionary(locale)
  return {
    applicationName: dictionary.metadata.applicationName,
    authors: [{ name: "sim0wn" }],
    creator: "sim0wn",
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    openGraph: {
      description: dictionary.metadata.description,
      images: [] /* TODO: add image to OpenGraph */,
      locale: locale,
      siteName: dictionary.metadata.applicationName,
      title: dictionary.metadata.title.default,
      type: "website",
      url: `https://www.${getLocaleDomain(locale)}`,
    },
    publisher: "Vercel",
    title: {
      default: dictionary.metadata.title.default,
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
  const locale = getLocale(await headers())
  const dictionary = await getDictionary(locale)
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
            "shadow-purple-1000 sticky inset-0 top-0 z-40 bg-neutral-100/85 drop-shadow-md backdrop-blur-md sm:p-0 dark:border-b dark:border-b-neutral-900 dark:bg-neutral-950/85",
          )}
        >
          <nav
            className="container flex items-center justify-between py-2"
            id="navbar"
          >
            <menu className="*:*:text-md flex w-full gap-1.5 *:*:flex *:flex *:*:items-center *:items-center *:*:gap-2">
              <li>
                <Button asChild size={"sm"} variant={"ghost"}>
                  <Link href={"/"}>
                    <Lettermark className="text-xl" />
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild size={"sm"} variant={"link"}>
                  <ExternalLink href={"https://logs.sim0wn.com.br/"}>
                    <Library width={"1em"} />
                    GitBook
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
                    {dictionary.navigationBar.contact}
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
            <h1 className="border-b px-2 text-center dark:border-b-neutral-800">
              {dictionary.footer.sections.social.title}
            </h1>
            <menu className="flex w-full flex-1 flex-wrap place-content-around items-start gap-2 py-2 *:*:flex *:*:gap-2">
              <Suspense fallback={<SocialFallback />}>
                <Social />
              </Suspense>
            </menu>
          </section>
          <section className="col-span-full flex h-full w-full flex-col p-2 sm:col-span-1">
            <h1 className="border-b px-2 text-center dark:border-b-neutral-800">
              {dictionary.footer.sections.links.title}
            </h1>
            <menu className="flex w-full flex-1 flex-wrap place-content-around items-start gap-2 *:*:flex *:*:gap-2">
              <li>
                <Button asChild variant={"link"}>
                  <Link
                    href={`https://${
                      locale === "pt-BR"
                        ? getLocaleDomain("en-US")
                        : getLocaleDomain("pt-BR")
                    }/`}
                  >
                    <Globe size={"1em"} />
                    {dictionary.footer.sections.links.switchLanguage}
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <ExternalLink href={"https://github.com/sim0wn/portfolio"}>
                    <Code size={"1em"} />
                    {dictionary.footer.sections.links.sourceCode}
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <Link href={"/privacy"}>
                    <Shield size={"1em"} />
                    {dictionary.footer.sections.links.privacyPolicy}
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={"link"}>
                  <Link href={"/terms"}>
                    <Library size={"1em"} />
                    {dictionary.footer.sections.links.termsOfService}
                  </Link>
                </Button>
              </li>
            </menu>
          </section>
          <p className="col-span-full items-center justify-center text-center text-sm">
            {dictionary.footer.title}
          </p>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
