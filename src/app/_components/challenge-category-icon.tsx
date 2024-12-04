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
}: {
  category: HacktivityCategory
} & ButtonProps) {
  return (
    <Badge
      variant={"outline"}
      className={classNames(
        "m-0 flex w-fit gap-0.5 text-sm md:text-base",
        className,
      )}
      title={category}
    >
      <Icon
        category={category}
        aria-label={category}
        aria-hidden={true}
        width={"1em"}
        height={"1em"}
      />
      <span className="text-xs sm:text-sm">{category}</span>
    </Badge>
  )
}

const Icon = ({
  category,
  ...props
}: {
  category: HacktivityCategory
} & LucideProps) => {
  switch (category) {
    case "Web":
      return <CodeXml {...props} />
    case "Crypto":
      return <MessageSquareLock {...props} />
    case "User":
      return <UsersRound {...props} />
    case "System":
      return <Hash {...props} />
    case "Forensics":
      return <FileSearch {...props} />
    case "Reversing":
      return <Bug {...props} />
    case "Misc":
      return <Brain {...props} />
    case "Hardware":
      return <Cpu {...props} />
    case "Stego":
      return <FileStack {...props} />
    case "OSINT":
      return <Crosshair {...props} />
    case "Pwn":
      return <Workflow {...props} />
    default:
      return null
  }
}
