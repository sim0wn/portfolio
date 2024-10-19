import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"

export async function ExternalLink({
  children,
  href,
  className,
  ...props
}: Readonly<{
  children: ReactNode
  href: string
  className?: string
}> &
  LinkProps) {
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
