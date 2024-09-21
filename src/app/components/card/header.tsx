import classNames from "classnames"
import { HTMLAttributes } from "react"

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  return (
    <header
      className={classNames(
        className,
        "font-bold text-lg border-b border-b-purple-800 px-2 py-0",
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export default Header
