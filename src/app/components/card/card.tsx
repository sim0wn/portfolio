import classNames from "classnames"
import { HTMLAttributes } from "react"

import Body from "./body"
import Header from "./header"

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: {
  Body: typeof Body
  Header: typeof Header
} & React.FC<CardProps> = ({ children, className, ...props }) => {
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

Card.Header = Header
Card.Body = Body

export default Card
