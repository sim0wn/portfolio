import { formatDistanceToNow } from "date-fns"
import { enUS, ptBR } from "date-fns/locale"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Metadata } from "next"
import { hasLocale, Locale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Fragment } from "react"

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components"
import { Link, routing } from "@/i18n"
import { payload } from "@/lib"
import { NestedDocs, Note } from "@/types"
import { cn, NestedDocsTree } from "@/utils"

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/notes/[[...slug]]">): Promise<Metadata> {
  const { locale, slug } = await params
  const {
    docs: [page],
  } = await payload.find({
    collection: "notes",
    locale: locale as Locale,
    select: {
      description: true,
      title: true,
      url: true,
    },
    sort: ["parent.title", "title"],
    ...(slug && {
      where: {
        url: { equals: `/notes/${slug.join("/")}` },
      },
    }),
  })
  return {
    ...(page.description && { description: page.description }),
    title: page.title,
  }
}

export default async function NotesLayout({
  children,
  params,
}: LayoutProps<"/[locale]/notes/[[...slug]]">) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations("Notes")

  const { docs: notes } = await payload.find({
    collection: "notes",
    limit: 0,
    locale: locale,
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
  const nestedDocsTree = new NestedDocsTree(
    notes,
    (note) => note.slug,
    (note) =>
      note.parent && typeof note.parent === "object"
        ? note.parent.slug
        : note.parent,
  )
  const currentPage = slug
    ? nestedDocsTree.findByPredicate(
        (note) => note.url === (slug ? `/notes/${slug.join("/")}` : ""),
      )
    : notes[0]
  if (!currentPage) notFound()

  const prevPage = nestedDocsTree.getPrevious(currentPage.id, (doc) => doc.id)
  const nextPage = nestedDocsTree.getNext(currentPage.id, (doc) => doc.id)

  return (
    <SidebarProvider className="container flex min-h-[calc(100vh-var(--header-height))]">
      <Sidebar
        className={cn(
          "sticky top-(--header-height)",
          "h-[calc(100svh-var(--header-height))] min-h-0",
          "[--sidebar-width:--spacing(72)]",
        )}
      >
        <SidebarContent>
          {renderItems(currentPage, nestedDocsTree)}
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
            <nav className="not-prose flex h-(--header-height) items-center gap-2">
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
                            <BreadcrumbLink href={url ?? "#"}>
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
                      <Link href={prevPage.url} rel="prev">
                        {prevPage.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="justify-self-end">
                      {t("navigation.prevPage")}
                    </CardDescription>
                    <CardAction className="col-start-1 my-auto justify-self-start">
                      <Link
                        href={prevPage.breadcrumbs?.at(-1)?.url as string}
                        rel="prev"
                      >
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
                      <Link href={nextPage.url} rel="next">
                        {nextPage.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {t("navigation.nextPage")}
                    </CardDescription>
                    <CardAction className="my-auto">
                      <Link href={nextPage.url} rel="next">
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

function renderItems(currentNote: Note, nestedNotesTree: NestedDocsTree<Note>) {
  const Item = ({
    currentPage,
    level = 0,
    page,
  }: {
    currentPage: Note
    level: number
    page: NestedDocs<Note>
  }) => {
    const isActive = currentPage?.id === page.id

    // Seção: renderiza como grupo com label e conteúdo
    if (page.type === "section") {
      return (
        <SidebarGroup>
          <SidebarGroupLabel>{page.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {page.children.map((child) => (
                <Item
                  currentPage={currentPage}
                  key={child.id}
                  level={level + 1}
                  page={child}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )
    }

    // Página: renderiza como item de menu com possível submenu colapsável
    if (page.type === "page") {
      const hasChildren = page.children.length > 0
      const isOpen = hasChildren
        ? nestedNotesTree.isAncestor(page, currentPage, (note) => note.id)
        : false

      // Para níveis mais profundos (submenu), usa SidebarMenuSubItem
      if (level > 0) {
        return (
          <SidebarMenuSubItem>
            <SidebarMenuSubButton isActive={isActive}>
              <Link href={page.url}>{page.title}</Link>
            </SidebarMenuSubButton>
            {hasChildren && (
              <Collapsible defaultOpen={isOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRightIcon aria-hidden />
                    <span className="sr-only">Expandir submenu</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full">
                  <SidebarMenuSub className="mx-0 ml-3.5 px-0 pl-2.5">
                    {page.children.map((child) => (
                      <Item
                        currentPage={currentPage}
                        key={child.id}
                        level={level + 1}
                        page={child}
                      />
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            )}
          </SidebarMenuSubItem>
        )
      }

      // Para o primeiro nível, usa SidebarMenuItem
      return (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link href={page.url}>{page.title}</Link>
          </SidebarMenuButton>
          {hasChildren && (
            <Collapsible defaultOpen={isOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRightIcon aria-hidden />
                  <span className="sr-only">Expandir submenu</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {page.children.map((child) => (
                    <Item
                      currentPage={currentPage}
                      key={child.id}
                      level={level + 1}
                      page={child}
                    />
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )}
        </SidebarMenuItem>
      )
    }

    return null
  }
  return nestedNotesTree
    .getRoots()
    .map((note) => (
      <Item currentPage={currentNote} key={note.id} level={0} page={note} />
    ))
}
