import { Badge } from "@/components/ui/badge"
import { ButtonProps } from "@/components/ui/button"
import { HacktivityCategory } from "@/enums/hacktivity-category.enum"
import classNames from "classnames"
import {
  Brain,
  Bug,
  CodeXml,
  Cpu,
  Crosshair,
  FileSearch,
  FileStack,
  Hash,
  LucideProps,
  MessageSquareLock,
  UsersRound,
  Workflow,
} from "lucide-react"

export async function ChallengeCategoryIcon({
  category,
  className,
}: ButtonProps & {
  category: HacktivityCategory
}) {
  return (
    <Badge
      className={classNames(
        "m-0 flex w-fit gap-0.5 text-sm md:text-base",
        className,
      )}
      title={category}
      variant={"outline"}
    >
      <Icon
        aria-hidden={true}
        aria-label={category}
        category={category}
        height={"1em"}
        width={"1em"}
      />
      <span className="text-xs sm:text-sm">{category}</span>
    </Badge>
  )
}

const Icon = ({
  category,
  ...props
}: LucideProps & {
  category: HacktivityCategory
}) => {
  switch (category) {
    case "Crypto":
      return <MessageSquareLock {...props} />
    case "Forensics":
      return <FileSearch {...props} />
    case "Hardware":
      return <Cpu {...props} />
    case "Misc":
      return <Brain {...props} />
    case "OSINT":
      return <Crosshair {...props} />
    case "Pwn":
      return <Workflow {...props} />
    case "Reversing":
      return <Bug {...props} />
    case "Stego":
      return <FileStack {...props} />
    case "System":
      return <Hash {...props} />
    case "User":
      return <UsersRound {...props} />
    case "Web":
      return <CodeXml {...props} />
    default:
      return null
  }
}
