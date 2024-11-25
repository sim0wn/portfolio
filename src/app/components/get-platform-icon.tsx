import { HackTheBox } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/ui/external-link"
import { Platform } from "@/types/platform.type"

export function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case "Hack The Box":
      return (
        <Button asChild variant={"ghost"}>
          <ExternalLink
            href={`https://app.hackthebox.com/profile/${process.env.HTB_PROFILE_ID}/`}
          >
            <HackTheBox className="text-[#9FEF00]" />
          </ExternalLink>
        </Button>
      )
    default:
      return <></>
  }
}
