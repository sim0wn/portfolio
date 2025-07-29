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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components"
import { NestedDocs, Page } from "@/types"
import { isAncestor } from "@/utils"

interface SidebarItemProps {
  currentPage?: Page
  level?: number // Novo: controla o nível de profundidade
  page: NestedDocs<Page>
}

/**
 * Recursivamente renderiza itens do menu da sidebar para documentação.
 * Suporta aninhamento ilimitado de níveis.
 */
export function SidebarItem({
  currentPage,
  level = 0,
  page,
}: SidebarItemProps) {
  const isActive = currentPage?.id === page.id

  // Seção: renderiza como grupo com label e conteúdo
  if (page.type === "section") {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{page.title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {page.children.map((child) => (
              <SidebarItem
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
      ? isAncestor(
          page,
          currentPage,
          (p) => p.children,
          (p) => p.id,
        )
      : false

    // Para níveis mais profundos (submenu), usa SidebarMenuSubItem
    if (level > 0) {
      return (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild isActive={isActive}>
            <Link href={`/knowledge-base/${page.url}`}>{page.title}</Link>
          </SidebarMenuSubButton>
          {hasChildren && (
            <Collapsible defaultOpen={isOpen}>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight aria-hidden />
                  <span className="sr-only">Expandir submenu</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-full">
                <SidebarMenuSub className="mx-0 ml-3.5 px-0 pl-2.5">
                  {page.children.map((child) => (
                    <SidebarItem
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
          <Link href={`/knowledge-base/${page.url}`}>{page.title}</Link>
        </SidebarMenuButton>
        {hasChildren && (
          <Collapsible defaultOpen={isOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight aria-hidden />
                <span className="sr-only">Expandir submenu</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {page.children.map((child) => (
                  <SidebarItem
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
