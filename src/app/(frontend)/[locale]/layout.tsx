import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  Code,
  Globe,
  Library,
  MailIcon,
  MapPinIcon,
  Menu,
  Scale,
  Shield,
} from "lucide-react"
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
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Toaster,
  TryHackMe,
} from "@/components"
import { inter, jetbrains_mono, raleway } from "@/fonts"
import { Link, routing } from "@/i18n"
import { cn } from "@/utils"

type Props = Readonly<{
  children: ReactNode
  params: Promise<{ locale: Locale }>
}>

const socialLinks = [
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
]

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params
  const { Metadata } = await getMessages({ locale })
  return {
    applicationName: Metadata.applicationName,
    authors: [{ name: "sim0wn", url: "https://www.sim0wn.rocks/" }],
    creator: "sim0wn",
    description: Metadata.description,
    keywords: Metadata.keywords,
    openGraph: {
      description: Metadata.description,
      images: [] /* TODO: add image to OpenGraph */,
      locale,
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

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "Layout" })

  const legalLinks = [
    {
      icon: <Shield className="h-4 w-4" />,
      label: t("footer.privacyPolicy"),
      path: "/legal#privacy",
    },
    {
      icon: <Scale className="h-4 w-4" />,
      label: t("footer.termsOfService"),
      path: "/legal#terms-of-service",
    },
  ] as const

  const navItems = [
    {
      href: "/",
      icon: <Lettermark className="text-xl" />,
      label: t("nav.menu.home"),
    },
    {
      href: "/knowledge-base",
      icon: <Library className="h-4 w-4" />,
      label: t("nav.menu.knowledgeBase"),
    },
  ]

  const projectLinks = [
    {
      external: true,
      icon: <Code className="h-4 w-4" />,
      label: t("footer.sourceCode"),
      path: "https://github.com/sim0wn/portfolio",
    },
  ] as const

  const quickLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/#skills" },
    { label: t("nav.projects"), path: "/#activities" },
    {
      label: t("nav.menu.knowledgeBase"),
      path: "/knowledge-base",
    },
    { label: t("nav.contact"), path: "/#contact" },
  ] as const

  return (
    <html lang={locale}>
      <body
        className={cn(
          "grid min-h-svh grid-rows-[auto_1fr_auto] scroll-smooth",
          jetbrains_mono.variable,
          raleway.variable,
          inter.variable,
        )}
      >
        <NextIntlClientProvider>
          {/* Skip to main content */}
          <Link
            className="bg-primary text-primary-foreground sr-only z-[100] rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
            href="#main-content"
          >
            {t("nav.skipToMain")}
          </Link>
          <header
            className={cn(
              "border-border bg-background/85 sticky top-0 z-50 w-full border-b backdrop-blur-md",
              "h-[var(--header-height)] transition-colors duration-200",
            )}
            role="banner"
          >
            <div className="container flex h-full items-center justify-between">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <Button
                  aria-label={t("nav.brand.ariaLabel")}
                  asChild
                  className="mr-2 p-2"
                  size="sm"
                  variant="ghost"
                >
                  <Link className="flex items-center gap-2" href="/">
                    <Lettermark className="text-xl" />
                    <span className="sr-only">{t("nav.brand.name")}</span>
                  </Link>
                </Button>
              </div>

              {/* Desktop Navigation */}
              <nav
                aria-label={t("nav.main.ariaLabel")}
                className="hidden md:flex md:items-center md:space-x-1"
                role="navigation"
              >
                <ul className="flex items-center space-x-1">
                  {navItems.slice(1).map(({ href, icon, label }) => (
                    <li key={href}>
                      <Button
                        asChild
                        className={cn("gap-2 transition-colors duration-200")}
                        size="sm"
                        variant={"link"}
                      >
                        <Link className="flex items-center" href={href}>
                          {icon}
                          {label}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* Language Toggle */}
                <Button
                  aria-label={t("nav.menu.locale")}
                  asChild
                  className="gap-2 max-md:hidden"
                  size="sm"
                  variant="ghost"
                >
                  <Link
                    className="flex items-center"
                    href={"/"}
                    locale={locale == "en-US" ? "pt-BR" : "en-US"}
                  >
                    <Globe className="h-4 w-4" />
                    <span>{t("nav.menu.locale")}</span>
                  </Link>
                </Button>

                {/* Mobile Menu Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      aria-label={t("nav.mobile.openMenu")}
                      className="md:hidden"
                      size="sm"
                      variant="outline"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-80" side="right">
                    <SheetHeader>
                      <SheetTitle>{t("nav.main.ariaLabel")}</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 px-2">
                      {/* Mobile Navigation */}
                      <nav
                        aria-label={t("nav.mobile.ariaLabel")}
                        role="navigation"
                      >
                        <ul className="space-y-2">
                          {navItems.map(({ href, icon, label }) => (
                            <li key={href}>
                              <Button
                                asChild
                                className="w-full justify-start gap-2"
                                size="sm"
                                variant={"ghost"}
                              >
                                <Link className="flex items-center" href={href}>
                                  {icon}
                                  {label}
                                </Link>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                    <SheetFooter>
                      {/* Mobile Language Toggle */}
                      <Button
                        asChild
                        className="w-full gap-2"
                        size="sm"
                        variant="outline"
                      >
                        <Link
                          href={"/"}
                          locale={locale === "en-US" ? "pt-BR" : "en-US"}
                        >
                          <Globe className="h-4 w-4" />
                          {t("nav.menu.locale")}
                        </Link>
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          <main
            className={cn("@container mx-auto w-full font-sans")}
            id="content"
            tabIndex={-1}
          >
            <NuqsAdapter>{children}</NuqsAdapter>
          </main>
          <footer
            className={"bg-muted/30 border-border border-t"}
            role="contentinfo"
          >
            <div className="container py-8">
              {/* Main Footer Content */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {/* About Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {t("footer.about.title")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("footer.about.description")}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <MailIcon className="h-4 w-4" />
                      <Link
                        className="hover:text-foreground transition-colors"
                        href="mailto:root@sim0wn.rocks"
                      >
                        root@sim0wn.rocks
                      </Link>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{t("footer.location")}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {t("footer.quickLinks.title")}
                  </h3>
                  <nav aria-label={t("footer.quickLinks.ariaLabel")}>
                    <ul className="space-y-2">
                      {quickLinks.map(({ label, path }) => (
                        <li key={path}>
                          <Link
                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                            href={path}
                            scroll={true}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {t("footer.social.title")}
                  </h3>
                  <nav aria-label={t("footer.social.ariaLabel")}>
                    <ul className="flex flex-wrap gap-2">
                      {socialLinks.map(({ icon, name, url }) => (
                        <li key={name}>
                          <Button asChild size="icon" variant="ghost">
                            <Link
                              className="hover:bg-primary/10"
                              href={url}
                              prefetch={false}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {icon}
                              <span className="sr-only">
                                {t("footer.social.openLink", {
                                  platform: name,
                                })}
                              </span>
                            </Link>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {t("footer.tech.title")}
                  </h3>
                  <div className="text-muted-foreground space-y-2 text-sm">
                    <p>{t("footer.tech.builtWith")}</p>
                    <ul className="space-y-1 *:before:content-['•_']">
                      <li>Next.js 15</li>
                      <li>React 19</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>PayloadCMS</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Bottom Section */}
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                {/* Copyright */}
                <div className="text-muted-foreground text-center text-sm md:text-left">
                  <p>
                    © {new Date().getFullYear()} {t("footer.copyright.rights")}
                  </p>
                  <p className="mt-1">
                    {t("footer.lastUpdated")}: {new Date().toLocaleDateString()}{" "}
                    UTC
                  </p>
                </div>

                {/* Legal & Project Links */}
                <nav
                  aria-label={t("footer.legal.ariaLabel")}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  {/* Legal Links */}
                  {legalLinks.map(({ icon, label, path }) => (
                    <Button asChild key={path} size="sm" variant="link">
                      <Link className="gap-2" href={path}>
                        {icon}
                        {label}
                      </Link>
                    </Button>
                  ))}

                  <Separator className="h-4" orientation="vertical" />

                  {/* Project Links */}
                  {projectLinks.map(({ external, icon, label, path }) => (
                    <Button asChild key={path} size="sm" variant="link">
                      <Link
                        className="gap-2"
                        href={path}
                        {...(external && {
                          prefetch: false,
                          rel: "noopener noreferrer",
                          target: "_blank",
                        })}
                      >
                        {icon}
                        {label}
                        {external && (
                          <span className="sr-only">
                            {t("footer.opensInNewTab")}
                          </span>
                        )}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>
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
