import { Locale } from "next-intl"

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
} from "@/components"
import { payload } from "@/lib"
import { cn } from "@/utils"

export async function Featured({ locale }: { locale: Locale }) {
  const { docs: starredActivities } = await payload.find({
    collection: "activities",
    locale,
    where: {
      isFeatured: {
        equals: true,
      },
    },
  })
  return (
    <section className="border-border border-y py-4">
      <ul
        className={cn(
          "container my-auto",
          "flex flex-col justify-center gap-2 md:flex-row md:gap-4",
          // "overflow-x-auto",
        )}
      >
        {starredActivities.map(
          ({ category, description, id, platform, title }) => (
            <li className="w-full flex-1 md:max-w-md" key={id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="flex cursor-pointer flex-col *:flex-1">
                    <CardHeader>
                      <span className="flex gap-2">
                        <Badge>
                          {typeof category === "object" && category.name}
                        </Badge>
                        {platform && typeof platform === "object" && (
                          <Badge className="truncate" variant={"outline"}>
                            {platform.name}
                          </Badge>
                        )}
                      </span>
                      <CardTitle className="text-md">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-sm">{description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                  </DialogHeader>
                  {description}
                </DialogContent>
              </Dialog>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}

export function FeaturedFallback() {
  return (
    <section
      aria-busy="true"
      aria-label="Carregando atividades em destaque"
      className="border-border border-y py-4"
    >
      <ul className="container my-auto flex justify-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <li className="w-md" key={i}>
            <Card
              aria-hidden
              className="flex animate-pulse cursor-pointer flex-col *:flex-1"
              tabIndex={-1}
            >
              <CardHeader>
                <span className="flex gap-2">
                  <Badge className="h-6 w-20 p-0">
                    <Skeleton className="h-full w-full rounded" />
                  </Badge>
                  <Badge className="h-6 w-20 p-0" variant="outline">
                    <Skeleton className="h-full w-full rounded" />
                  </Badge>
                </span>
                <CardTitle className="text-md">
                  <Skeleton className="h-5 w-32 rounded" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-1 h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
