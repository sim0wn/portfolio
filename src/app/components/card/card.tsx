import classNames from "classnames"
import { HTMLAttributes } from "react"

import Body from "./body"
import Footer from "./footer"
import Header from "./header"

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: {
  Body: typeof Body
  Footer: typeof Footer
  Header: typeof Header
} & React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <article
      className={classNames(
        className,
        "bg-neutral-900 rounded-lg flex flex-col gap-0.5 break-inside-avoid py-1",
      )}
      {...props}
    >
      {children}
    </article>
  )
}

Card.Header = Header
Card.Body = Body
Card.Footer = Footer

export default Card
