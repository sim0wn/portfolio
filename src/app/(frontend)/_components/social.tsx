import { Icon } from "@iconify/react"

import { Button, ExternalLink, Skeleton } from "@/components/ui"
import { payload } from "@/lib"

export async function Social() {
  const { docs: socials } = await payload.find({
    collection: "social",
    sort: "label",
  })
  return socials.map(({ icon, id, label, url }) => (
    <li key={id}>
      <Button asChild className="flex w-fit gap-0 p-0" variant={"ghost"}>
        <ExternalLink href={url}>
          <Icon icon={icon} ssr={true} />
          <span className="sr-only">{label}</span>
        </ExternalLink>
      </Button>
    </li>
  ))
}

export function SocialFallback() {
  return Array.from({ length: 3 }, (_, index) => (
    <li className="mx-auto md:mx-0" key={index}>
      <Skeleton className="h-8 w-64" />
    </li>
  ))
}
