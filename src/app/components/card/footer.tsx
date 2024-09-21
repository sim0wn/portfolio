import classNames from "classnames"
import { HTMLAttributes } from "react"

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Footer: React.FC<BodyProps> = ({ children, className, ...props }) => {
  return (
    <section className={classNames(className, "px-2 py-0")} {...props}>
      {children}
    </section>
  )
}

export default Footer
