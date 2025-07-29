"use client"

import { ComponentProps } from "react"

import { cn } from "@/utils"

import { useSidebar } from "./provider"

function SidebarRail({ className, ...props }: ComponentProps<"button">) {
  const { collapseMode, isMobile, toggleSidebar } = useSidebar()
  // Only show rail if collapsible and not "mobile-only" on desktop
  if (
    collapseMode === "none" ||
    (collapseMode === "mobile-only" && !isMobile)
  ) {
    return null
  }
  return (
    <button
      aria-label="Toggle Sidebar"
      className={cn(
        "hover:after:bg-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle Sidebar"
      {...props}
    />
  )
}

export { SidebarRail }
