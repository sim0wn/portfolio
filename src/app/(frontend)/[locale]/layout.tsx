import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import classNames from "classnames"
import { Code, Globe, Library, Shield } from "lucide-react"
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ReactNode, Suspense } from "react"

import { lato, raleway } from "@/app/fonts"
import { Button, ExternalLink, Lettermark, Toaster } from "@/components"
import { Link, routing } from "@/i18n"

import { Social, SocialFallback } from "./components/social"

type Props = Readonly<{
  children: ReactNode
  params: Promise<{ locale: Locale }>
}>

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params
  const { Metadata } = await getMessages({ locale })
  return {
    applicationName: Metadata.applicationName,
    authors: [{ name: "sim0wn" }],
    creator: "sim0wn",
    description: Metadata.description,
    keywords: Metadata.keywords,
    openGraph: {
      description: Metadata.description,
      images: [] /* TODO: add image to OpenGraph */,
      locale: locale,
      siteName: Metadata.applicationName,
      title: Metadata.defaultTitle,
      type: "website",
      url: "https://www.sim0wn.rocks/" + locale,
    },
    publisher: "Vercel",
    title: {
      default: Metadata.defaultTitle,
      template: "%s | sim0wn",
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "Layout" })

  return (
    <html lang={locale}>
      <body
        className={classNames(
          raleway.className,
          "flex min-h-svh flex-col scroll-smooth",
        )}
      >
        <NextIntlClientProvider>
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
                    <Link href={"/books"}>
                      <Library width={"1em"} />
                      {t("nav.menu.library")}
                    </Link>
                  </Button>
                </li>
                <li className="flex-1 place-content-end">
                  <Button asChild size={"sm"}>
                    <Link
                      className={classNames("flex items-center gap-2")}
                      href={"/#contact"}
                    >
                      {t("nav.actions.contact")}
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant={"link"}>
                    <Link
                      href={"/"}
                      locale={locale === "pt-BR" ? "en-US" : "pt-BR"}
                    >
                      <Globe size={"1em"} />
                      {t("nav.actions.changeLocale")}
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
                        {t("footer.privacyPolicy")}
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant={"link"}>
                      <Link href={"/terms"}>
                        <Library size={"1em"} />
                        {t("footer.termsOfService")}
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant={"link"}>
                      <ExternalLink
                        href={"https://github.com/sim0wn/portfolio"}
                      >
                        <Code size={"1em"} />
                        {t("footer.sourceCode")}
                      </ExternalLink>
                    </Button>
                  </li>
                </menu>
              </section>
            </section>
          </footer>
          <Toaster />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
