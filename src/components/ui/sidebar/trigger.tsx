"use client"

import { PanelLeftIcon } from "lucide-react"
import { ComponentProps } from "react"

import { Button } from "@/components"
import { cn } from "@/utils"

import { useSidebar } from "./provider"

function SidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { collapseMode, isMobile, toggleSidebar } = useSidebar()
  // Only show trigger if collapsible on current device
  if (
    collapseMode === "none" ||
    (collapseMode === "mobile-only" && !isMobile)
  ) {
    return null
  }
  return (
    <Button
      className={cn("size-7", className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      size="icon"
      variant="ghost"
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export { SidebarTrigger }
