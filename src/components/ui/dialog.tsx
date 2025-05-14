"use client"

import classNames from "classnames"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { DialogHTMLAttributes, HTMLAttributes } from "react"

import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

const Dialog = React.forwardRef<
  HTMLDialogElement,
  DialogHTMLAttributes<HTMLDialogElement>
>(({ children, ...props }, ref) => {
  return (
    <dialog
      className={classNames(
        "fixed inset-0 z-50", // position
        "flex place-content-center items-center justify-center", // layout
        "h-svh w-svw", // sizing
        "bg-neutral-950/75", // color
        "p-4 sm:p-8 md:p-24 lg:p-36 xl:p-48", // spacing
      )}
      ref={ref}
      {...props}
    >
      <Card>{children}</Card>
    </dialog>
  )
})

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const router = useRouter()
  return (
    <CardHeader className={"flex flex-row"} ref={ref} {...props}>
      {children}
      <Button onClick={() => router.back()}>
        <X />
      </Button>
    </CardHeader>
  )
})

const DialogTitle = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <CardTitle className="flex-1" ref={ref} {...props}>
      {children}
    </CardTitle>
  )
})

const DialogContent = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <CardContent className={classNames("w-full")} ref={ref} {...props}>
      {children}
    </CardContent>
  )
})

Dialog.displayName = "Dialog"
DialogHeader.displayName = "DialogHeader"
DialogContent.displayName = "DialogContent"
DialogTitle.displayName = "DialogTitle"

export { Dialog, DialogContent, DialogHeader, DialogTitle }
