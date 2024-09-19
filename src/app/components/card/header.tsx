import classNames from "classnames"
import { HTMLAttributes } from "react"

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {}

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <header>
      <h1
        className={classNames(
          className,
          "font-bold text-lg border-b border-b-purple-800 px-2",
        )}
        {...props}
      >
        {children}
      </h1>
    </header>
  )
}

export default Header
