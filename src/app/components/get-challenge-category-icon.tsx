import { Badge } from "@/components/ui/badge"
import { ChallengeCategory } from "@/types/challenge-category.type"
import {
  Brain,
  Bug,
  CodeXml,
  Cpu,
  Crosshair,
  FileSearch,
  FileStack,
  Hash,
  MessageSquareLock,
  UsersRound,
  Workflow,
} from "lucide-react"

export async function getChallengeCategoryIcon(category: ChallengeCategory) {
  const getIcon = () => {
    switch (category) {
      case "Web":
        return <CodeXml />
      case "Crypto":
        return <MessageSquareLock />
      case "User":
        return <UsersRound />
      case "System":
        return <Hash />
      case "Forensics":
        return <FileSearch />
      case "Reversing":
        return <Bug />
      case "Misc":
        return <Brain />
      case "Hardware":
        return <Cpu />
      case "Stego":
        return <FileStack />
      case "OSINT":
        return <Crosshair />
      case "Pwn":
        return <Workflow />
      default:
        return null
    }
  }
  return (
    <Badge variant={"outline"} className="flex w-fit gap-0.5">
      {getIcon()}
      {category}
    </Badge>
  )
}
