import { Metadata } from "next"
import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Fragment, ReactNode } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components"
import { routing } from "@/i18n"
import { payload } from "@/lib"
import { getNestedDocs } from "@/utils"

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
    locale:
      locale === "pt-BR" || locale === "en-US" ? locale : routing.defaultLocale,
    sort: ["parent.slug", "slug"],
    ...(slug && {
      where: {
        "breadcrumbs.url": { equals: `/${slug.join("/")}` },
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
  setRequestLocale(locale)
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
      url: true,
    },
    sort: ["parent.slug", "slug"],
  })
  const currentPage = slug
    ? pages.find((page) => page.url === (slug ? slug.join("/") : ""))
    : pages[0]
  const nestedPages = getNestedDocs(
    pages,
    (page) => page.slug,
    (page) =>
      page.parent && typeof page.parent === "object"
        ? page.parent.slug
        : page.parent,
  )
  return (
    <SidebarProvider className="relative h-full min-h-0 min-w-0">
      <Sidebar
        className="fixed top-[calc(--spacing(12)+4px)] h-full"
        variant="sidebar"
      >
        <SidebarContent>
          {nestedPages.map((page) => (
            <SidebarItem currentPage={currentPage} key={page.id} page={page} />
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex max-w-full min-w-0 flex-col gap-2 p-4">
        <header className="flex items-center gap-2 border-b pb-2">
          <SidebarTrigger />
          <Separator
            className="data-[orientation=vertical]:h-4"
            orientation="vertical"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {currentPage?.breadcrumbs?.map(
                ({ doc, id, label, url }, index, self) => (
                  <Fragment key={id}>
                    <BreadcrumbItem>
                      {doc === currentPage.id ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={url ?? "/#"}>
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
        </header>
        <article>
          <header>
            <h1 className="text-accent-foreground font-bold">
              {currentPage?.title}
            </h1>
            {currentPage?.description && (
              <p className="text-muted-foreground">{currentPage.description}</p>
            )}
          </header>
          {children}
        </article>
      </SidebarInset>
    </SidebarProvider>
  )
}
