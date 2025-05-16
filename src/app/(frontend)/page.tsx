import { Mascot } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ExternalLink,
  Skeleton,
} from "@/components/ui"
import { getDictionary, payload } from "@/lib"
import { HacktivityService } from "@/services/hacktivity-service.service"
import { Media } from "@/types"
import { cn, getLocale, truncateString } from "@/utils"
import { intlFormatDistance } from "date-fns"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  createSearchParamsCache,
  parseAsInteger,
  SearchParams,
} from "nuqs/server"
import { Suspense } from "react"

import { ChallengeCategoryIcon } from "./_components/challenge-category-icon"
import { ContactForm } from "./_components/contact-form"
import { Hero, HeroFallback } from "./_components/hero"
import { Highlights, HighlightsFallback } from "./_components/highlights"
import { Skills, SkillsFallback } from "./_components/skills"
import { Hacktivity, HacktivityFallback } from "./_components/hacktivity"
import { FaqFallback } from "./_components/faq"
import { Contact, ContactFallback } from "./_components/contact"

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return (
    <main className="flex flex-col place-content-center">
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<HighlightsFallback />}>
        <Highlights />
      </Suspense>
      <Suspense fallback={<SkillsFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<HacktivityFallback />}>
        <Hacktivity searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<ContactFallback />}>
        <Contact />
      </Suspense>
    </main>
  )
}
