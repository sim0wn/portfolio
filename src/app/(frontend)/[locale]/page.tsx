import { Code, Scale, Shield } from "lucide-react"
import { Locale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"

import {
  Button,
  GitHub,
  HackTheBox,
  Lattes,
  LinkedIn,
  TryHackMe,
} from "@/components"
import { Link } from "@/i18n"

import { About, AboutFallback } from "./components/about"
import { Activity, ActivityFallback } from "./components/activity"
import { Featured, FeaturedFallback } from "./components/featured"
import { Hero, HeroFallback } from "./components/hero"
import { Skills, SkillsFallback } from "./components/skills"

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<SearchParams>
}

const social = [
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

export default async function LandingPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Home")
  return (
    <>
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<FeaturedFallback />}>
        <Featured locale={locale} />
      </Suspense>
      <Suspense fallback={<SkillsFallback />}>
        <Skills locale={locale} />
      </Suspense>
      <Suspense fallback={<ActivityFallback />}>
        <Activity locale={locale} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<AboutFallback />}>
        <About locale={locale} />
      </Suspense>
      <footer className="border-t">
        <div className="container flex h-fit w-full flex-col items-center justify-between md:flex-row">
          <menu className="flex w-full justify-center gap-2 py-2 md:justify-start">
            {social.map(({ icon, name, url }) => (
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
          <menu className="flex w-full flex-wrap justify-center gap-x-2 *:*:flex *:*:gap-2 *:*:px-0">
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
              {
                external: true,
                icon: <Code />,
                label: t("footer.sourceCode"),
                path: "https://github.com/sim0wn/portfolio",
              },
            ].map(({ external, icon, label, path }) => (
              <li key={label}>
                <Button asChild variant={"link"}>
                  <Link
                    href={path}
                    {...(external && {
                      prefetch: false,
                      rel: "noopener noreferrer",
                      target: "_blank",
                    })}
                  >
                    {icon}
                    {label}
                  </Link>
                </Button>
              </li>
            ))}
          </menu>
        </div>
      </footer>
    </>
  )
}
