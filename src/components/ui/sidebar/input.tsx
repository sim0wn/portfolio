import { ComponentProps } from "react"

import { Input } from "@/components"
import { cn } from "@/utils"

function SidebarInput({ className, ...props }: ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn("bg-background h-8 w-full shadow-none", className)}
      data-sidebar="input"
      data-slot="sidebar-input"
      {...props}
    />
  )
}

export { SidebarInput }
