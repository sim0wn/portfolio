import classNames from "classnames"
import { HTMLAttributes } from "react"

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: React.FC<BodyProps> = ({ children, className, ...props }) => {
  return (
    <section className={classNames(className, "px-2")} {...props}>
      {children}
    </section>
  )
}

export default Body
