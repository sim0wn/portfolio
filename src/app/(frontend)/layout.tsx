import type { Metadata } from "next"

import classNames from "classnames"
import { Code, Globe, Library, Send, Shield } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ReactNode, Suspense } from "react"

import { Button, ExternalLink, Lettermark, Toaster } from "@/components"

import "./styles.css"

import { getDictionary } from "@/lib"
import { getLocale, getLocaleDomain } from "@/utils"

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
}: Readonly<{
  children: ReactNode
}>) {
  const locale = getLocale(await headers())
  const { footer, navigationBar } = await getDictionary(locale)
  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "bg-background flex min-h-svh flex-col scroll-smooth",
        )}
      >
        <header
          className={classNames(
            lato.className,
            "bg-background/85 sticky inset-0 top-0 z-50 backdrop-blur-md",
          )}
        >
          <nav
            className="container flex items-center justify-between"
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
                    {navigationBar.menu.contact}
                  </Link>
                </Button>
              </li>
            </menu>
          </nav>
        </header>
        <NuqsAdapter>{children}</NuqsAdapter>
        <footer className="border-t">
          <section className="container flex h-fit w-full flex-col flex-wrap justify-between md:flex-row">
            <aside className="flex flex-col gap-2 md:justify-center">
              <menu className="flex w-full flex-wrap gap-2 py-2">
                <Suspense fallback={<SocialFallback />}>
                  <Social />
                </Suspense>
              </menu>
            </aside>
            <section className="flex gap-4">
              <menu className="grid grid-cols-2 justify-items-start gap-x-4 *:*:flex *:*:gap-2 *:*:px-0">
                <li>
                  <Button asChild variant={"link"}>
                    <Link href={"/privacy"}>
                      <Shield size={"1em"} />
                      {footer.privacyPolicy}
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant={"link"}>
                    <Link href={"/terms"}>
                      <Library size={"1em"} />
                      {footer.termsOfService}
                    </Link>
                  </Button>
                </li>
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
                      {footer.switchLanguage}
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant={"link"}>
                    <ExternalLink href={"https://github.com/sim0wn/portfolio"}>
                      <Code size={"1em"} />
                      {footer.sourceCode}
                    </ExternalLink>
                  </Button>
                </li>
              </menu>
            </section>
          </section>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
