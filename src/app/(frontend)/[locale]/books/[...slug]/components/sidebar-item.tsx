import { ChevronRight } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components"
import { Book, NestedDocs, Page } from "@/types"
import { isAncestor } from "@/utils"

export function SidebarItem({
  currentPage,
  page,
}: {
  currentPage?: Page
  page: NestedDocs<Page>
}) {
  if (page.type === "section") {
    return (
      <SidebarGroup key={page.id}>
        <SidebarGroupLabel>{page.title}</SidebarGroupLabel>
        <SidebarGroupContent>
          {page.children.map((child) => (
            <SidebarItem
              currentPage={currentPage}
              key={child.id}
              page={child}
            />
          ))}
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }
  if (page.type === "page") {
    return (
      <SidebarMenu>
        <Collapsible
          defaultOpen={isAncestor(
            page,
            currentPage,
            (page) => page.children,
            (page) => page.id,
          )}
        >
          {/* Render the page itself */}
          <SidebarMenuItem key={page.id}>
            <SidebarMenuButton asChild isActive={currentPage?.id === page.id}>
              <Link
                href={`/books/${(page.book as Book).slug}${
                  page.breadcrumbs?.find(
                    (breadcrumb) => breadcrumb.doc === page.id,
                  )?.url || ""
                }`}
              >
                {page.title}
              </Link>
            </SidebarMenuButton>
            {/* Then, if the page has children, render them */}
            {page.children.length > 0 && (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenu key={`menu-${page.id}`}>
                      {page.children.map((child) => (
                        <SidebarItem
                          currentPage={currentPage}
                          key={child.id}
                          page={child}
                        />
                      ))}
                    </SidebarMenu>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            )}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    )
  }
  return null
}
