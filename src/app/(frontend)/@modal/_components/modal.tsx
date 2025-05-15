"use client"

import { Dialog } from "@/components/ui"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"

export function Modal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const onOpenChange = () => {
    setOpen(false)
    router.back()
  }
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      {children}
    </Dialog>
  )
}
