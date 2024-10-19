import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"

export async function ExternalLink({
  children,
  href,
  ...props
}: Readonly<{
  children: ReactNode
  href: string
}> &
  LinkProps) {
  return (
    <Link href={href} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </Link>
  )
}
