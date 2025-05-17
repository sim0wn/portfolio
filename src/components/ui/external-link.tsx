import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"

export function ExternalLink({
  children,
  className,
  href,
  ...props
}: LinkProps &
  Readonly<{
  children: ReactNode
  className?: string
  href: string
}>) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
      className={classNames(className)}
    >
      {children}
    </Link>
  )
}
