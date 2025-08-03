import { formatDistanceToNow } from "date-fns"
import { enUS, ptBR } from "date-fns/locale"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Metadata } from "next"
import { Locale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Fragment, ReactNode } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components"
import { Link } from "@/i18n"
import { payload } from "@/lib"
import { cn, flattenNestedDocs, getNestedDocs } from "@/utils"

import { SidebarItem } from "./components/sidebar-item"

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale; slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const {
    docs: [page],
  } = await payload.find({
    collection: "pages",
    limit: 1,
    locale,
    select: {
      description: true,
      title: true,
      url: true,
    },
    sort: ["parent.title", "title"],
    ...(slug && {
      where: {
        "breadcrumbs.url": { equals: "/" + slug.join("/") },
      },
    }),
  })
  return {
    description: page.description || undefined,
    title: page.title,
  }
}

export default async function KnowledgeBaseLayout({ children, params }: Props) {
  const { locale, slug } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations("KnowledgeBase")

  const { docs: pages } = await payload.find({
    collection: "pages",
    limit: 0,
    locale,
    select: {
      breadcrumbs: true,
      description: true,
      id: true,
      parent: true,
      slug: true,
      title: true,
      type: true,
      updatedAt: true,
      url: true,
    },
    sort: ["parent.title", "title"],
  })
  const currentPage = slug
    ? pages.find((page) => page.url === (slug ? slug.join("/") : ""))
    : pages[0]
  if (!currentPage) {
    notFound()
  }

  const nestedPages = getNestedDocs(
    pages,
    (page) => page.slug,
    (page) =>
      page.parent && typeof page.parent === "object"
        ? page.parent.slug
        : page.parent,
  )

  const flatPages = flattenNestedDocs(nestedPages)
  const currentIndex = flatPages.findIndex((page) => page.id === currentPage.id)

  const prevPage = currentIndex > 0 ? flatPages[currentIndex - 1] : null
  const nextPage =
    currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null

  return (
    <SidebarProvider className="container flex min-h-[calc(100vh-var(--header-height))]">
      <Sidebar
        className={cn(
          "sticky top-[var(--header-height)]",
          "h-[calc(100svh-var(--header-height))] min-h-0",
          "[--sidebar-width:--spacing(72)]",
        )}
      >
        <SidebarContent>
          {nestedPages.map((page) => (
            <SidebarItem currentPage={currentPage} key={page.id} page={page} />
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex w-full min-w-0 flex-col gap-2 max-lg:px-2">
        <article
          className={cn(
            "prose dark:prose-invert prose-lg prose-neutral",
            "mx-auto flex h-full w-full flex-col",
            "prose-code:bg-muted/50 prose-code:rounded prose-code:font-mono prose-code:transition-colors prose-code:hover:bg-muted/70 hover:prose-code:duration-200",
          )}
        >
          <header>
            <nav className="not-prose flex h-[var(--header-height)] items-center gap-2">
              <div className="flex items-center md:hidden">
                <SidebarTrigger />
                <Separator
                  className="data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
              </div>
              <Breadcrumb>
                <BreadcrumbList>
                  {currentPage?.breadcrumbs?.map(
                    ({ doc, id, label, url }, index, self) => (
                      <Fragment key={id}>
                        <BreadcrumbItem>
                          {doc === currentPage.id ? (
                            <BreadcrumbPage>{label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={"/knowledge-base" + url}>
                              {label}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < self.length - 1 && <BreadcrumbSeparator />}
                      </Fragment>
                    ),
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </nav>
            <h1>{currentPage?.title}</h1>
            {currentPage?.description && (
              <p className="text-muted-foreground">{currentPage.description}</p>
            )}
          </header>
          {children}
          <footer className="not-prose mb-4">
            {currentPage?.updatedAt && (
              <span className="text-muted-foreground mt-2 text-xs">
                {t("metadata.updatedAt")}
                {formatDistanceToNow(new Date(currentPage.updatedAt), {
                  addSuffix: true,
                  locale: locale === "pt-BR" ? ptBR : enUS,
                })}
              </span>
            )}
            <nav className="flex flex-col gap-4 md:flex-row">
              {prevPage && (
                <Card className="group flex-1">
                  <CardHeader>
                    <CardTitle>
                      <Link href={"/knowledge-base/" + prevPage.url} rel="prev">
                        {prevPage.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="justify-self-end">
                      {t("navigation.prevPage")}
                    </CardDescription>
                    <CardAction className="col-start-1 my-auto justify-self-start">
                      <Link href={"/knowledge-base/" + prevPage.url} rel="prev">
                        <ChevronLeftIcon
                          aria-hidden
                          className="text-muted-foreground group-hover:text-accent-foreground"
                        />
                      </Link>
                    </CardAction>
                  </CardHeader>
                </Card>
              )}
              {nextPage && (
                <Card className="group flex-1">
                  <CardHeader>
                    <CardTitle>
                      <Link href={"/knowledge-base/" + nextPage.url} rel="next">
                        {nextPage.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {t("navigation.nextPage")}
                    </CardDescription>
                    <CardAction className="my-auto">
                      <Link href={"/knowledge-base/" + nextPage.url} rel="next">
                        <ChevronRightIcon
                          aria-hidden
                          className="text-muted-foreground group-hover:text-accent-foreground"
                        />
                      </Link>
                    </CardAction>
                  </CardHeader>
                </Card>
              )}
            </nav>
          </footer>
        </article>
      </SidebarInset>
    </SidebarProvider>
  )
}
