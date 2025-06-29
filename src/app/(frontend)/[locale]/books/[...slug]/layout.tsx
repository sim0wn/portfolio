import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { redirect } from "next/navigation"
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
import { payload } from "@/lib"
import { NestedDocs, Page } from "@/types"
import { getNestedDocs } from "@/utils"

import { SidebarItem } from "./components/sidebar-item"

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale; slug: string[] }>
}

export default async function Layout({ children, params }: Props) {
  const {
    locale,
    slug: [book, ...slug],
  } = await params
  setRequestLocale(locale)
  const { docs: pages } = await payload.find({
    collection: "pages",
    locale,
    select: {
      book: true,
      breadcrumbs: true,
      id: true,
      parent: true,
      slug: true,
      title: true,
      type: true,
    },
    where: {
      "book.slug": {
        equals: book,
      },
    },
  })
  const nestedPages = getNestedDocs(
    pages,
    (page) => page.slug,
    (page) =>
      page.parent && typeof page.parent === "object"
        ? page.parent.slug
        : page.parent,
  )
  const currentPage = pages.find(
    (page) =>
      page.breadcrumbs?.some(
        (breadcrumb) => `/${slug.join("/")}` === breadcrumb.url,
      ) && page.slug === slug[slug.length - 1],
  )
  if (slug.length === 0 || currentPage?.type === "section") {
    // If no slug is provided, redirect to the first page of the book
    const findFirstPage = (pages: NestedDocs<Page>[]): null | Page => {
      for (const page of pages) {
        if (page.type === "page") {
          return page
        }
        if (page.children && page.children.length > 0) {
          const firstChild = findFirstPage(page.children)
          if (firstChild) {
            return firstChild
          }
        }
      }
      return null
    }
    const firstPage = findFirstPage(nestedPages)
    if (
      firstPage &&
      firstPage.breadcrumbs &&
      firstPage.breadcrumbs.length > 0
    ) {
      redirect(
        `/books/${book}/${firstPage.breadcrumbs.at(firstPage.breadcrumbs.length - 1)?.url ?? ""}`,
      )
    }
  }
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
                ({ doc, id, label, url }, index, self) => {
                  return (
                    <Fragment key={id}>
                      <BreadcrumbItem>
                        {doc === currentPage.id ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={`/books/${book}${url ?? "/#"}`}>
                            {label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < self.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                  )
                },
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
