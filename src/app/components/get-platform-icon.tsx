import { HackTheBox } from "@/components/icons"
import { Platform } from "@/types/platform.type"

export function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case "Hack The Box":
      return <HackTheBox className="text-[#9FEF00]" />
    default:
      return <></>
  }
}
