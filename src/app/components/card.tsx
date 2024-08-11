import classNames from "classnames"
import { HTMLAttributes } from "react"

function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={classNames(
        className,
        "bg-neutral-900 rounded-lg flex flex-col gap-2 break-inside-avoid",
      )}
      {...props}
    >
      {children}
    </article>
  )
}

function Header({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <header>
      <h1
        className={classNames(
          className,
          "font-bold text-lg border-b border-b-purple-800 p-2",
        )}
        {...props}
      >
        {children}
      </h1>
    </header>
  )
}

function Body({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <section className={classNames(className, "pb-2 px-2")} {...props}>
      {children}
    </section>
  )
}

Card.Header = Header
Card.Body = Body

export { Card }
