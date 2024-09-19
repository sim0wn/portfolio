import classNames from "classnames"
import { HTMLAttributes } from "react"

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Footer: React.FC<BodyProps> = ({ children, className, ...props }) => {
  return (
    <section className={classNames(className, "pb-2 px-2")} {...props}>
      {children}
    </section>
  )
}

export default Footer
