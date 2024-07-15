import classNames from "classnames"
import Link from "next/link"
import { HTMLAttributes } from "react"

export default function Navbar({
  className,
  props,
}: {
  className?: string
  props?: HTMLAttributes<HTMLDivElement>
}) {
  return (
    <nav
      className={classNames(
        "border-b px-2 flex py-4 justify-center mx-1.5 dark:border-neutral-800",
        className,
      )}
      {...props}
    >
      <Link className="flex text-2xl" href={"/"}>
        ~/
      </Link>
      <menu className="flex flex-1 gap-2 justify-end *:border-b *:px-2 py-1 dark:*:border-neutral-800">
        <li>
          <Link href={"/articles"}>~/artigos</Link>
        </li>
      </menu>
    </nav>
  )
}
