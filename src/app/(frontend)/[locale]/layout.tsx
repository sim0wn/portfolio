import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import classNames from "classnames"
import { Code, Globe, Library, Scale, Shield } from "lucide-react"
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { notFound } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { ReactNode } from "react"

import {
  Button,
  GitHub,
  HackTheBox,
  Lattes,
  Lettermark,
  LinkedIn,
  Toaster,
  TryHackMe,
} from "@/components"
import { jetbrains_mono, lato, raleway } from "@/fonts"
import { Link, routing } from "@/i18n"
import { cn } from "@/utils"

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "Layout" })

  return (
    <html lang={locale}>
      <body
        className={classNames(
          "grid min-h-svh grid-rows-[auto_1fr_auto] scroll-smooth",
          raleway.variable,
          jetbrains_mono.variable,
          lato.variable,
        )}
      >
        <NextIntlClientProvider>
          <header
            className={classNames(
              "bg-background/85 sticky inset-0 top-0 z-50 border-b backdrop-blur-md",
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
                  <Button asChild variant={"link"}>
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
          <main
            className={cn("@container mx-auto w-full font-sans")}
            id="content"
            tabIndex={-1}
          >
            <NuqsAdapter>{children}</NuqsAdapter>
          </main>
          <footer className="border-t">
            <div className="container flex h-fit w-full flex-col items-center justify-between lg:flex-row">
              <section className="flex flex-col gap-2 md:justify-center">
                <menu className="flex w-full flex-wrap gap-2 py-2">
                  {[
                    {
                      icon: <GitHub />,
                      name: "GitHub",
                      url: "https://github.com/sim0wn/",
                    },
                    {
                      icon: <HackTheBox />,
                      name: "HackTheBox",
                      url: "https://app.hackthebox.com/profile/143157/",
                    },
                    {
                      icon: <Lattes />,
                      name: "Lattes",
                      url: "http://lattes.cnpq.br/4781391320784524/",
                    },
                    {
                      icon: <LinkedIn />,
                      name: "LinkedIn",
                      url: "https://www.linkedin.com/in/halissoncruz/",
                    },
                    {
                      icon: <TryHackMe />,
                      name: "TryHackMe",
                      url: "https://tryhackme.com/p/sim0wn/",
                    },
                  ].map(({ icon, name, url }) => (
                    <li key={name}>
                      <Button asChild size={"icon"} variant={"ghost"}>
                        <Link
                          href={url}
                          prefetch={false}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {icon}
                          <span className="sr-only">{name}</span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </menu>
              </section>
              <section className="flex gap-4">
                <menu className="flex justify-items-start gap-x-4 *:*:flex *:*:gap-2 *:*:px-0">
                  {[
                    {
                      icon: <Shield />,
                      label: t("footer.privacyPolicy"),
                      path: "/legal#privacy",
                    },
                    {
                      icon: <Scale />,
                      label: t("footer.termsOfService"),
                      path: "/legal#terms-of-service",
                    },
                  ].map(({ icon, label, path }) => (
                    <li key={label}>
                      <Button asChild variant={"link"}>
                        <Link href={path}>
                          {icon}
                          {label}
                        </Link>
                      </Button>
                    </li>
                  ))}
                  <li>
                    <Button asChild variant={"link"}>
                      <Link
                        href={"https://github.com/sim0wn/portfolio"}
                        prefetch={false}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Code size={"1em"} />
                        {t("footer.sourceCode")}
                      </Link>
                    </Button>
                  </li>
                </menu>
              </section>
            </div>
          </footer>
          <Toaster />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
