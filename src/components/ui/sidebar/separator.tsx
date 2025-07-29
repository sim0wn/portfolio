import { ComponentProps } from "react"

import { Separator } from "@/components"
import { cn } from "@/utils"

function SidebarSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn("bg-border mx-2 w-auto", className)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  )
}

export { SidebarSeparator }
