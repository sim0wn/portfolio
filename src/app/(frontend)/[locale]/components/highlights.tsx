import { Locale } from "next-intl"
import Image from "next/image"

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  RichText,
  Skeleton,
} from "@/components"
import { payload } from "@/lib"
import { Media } from "@/types"

export async function Highlights({ locale }: { locale: Locale }) {
  return (
    <section className="border-y">
      <ul className="container my-auto flex justify-center gap-2">
        {(
          await payload.find({
            collection: "highlights",
            locale,
          })
        ).docs.map(({ description, icon, id, title }) => (
          <li className="flex items-center" key={id}>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="group relative h-14 w-40" variant={"link"}>
                  <Image
                    alt={(icon as Media).alt}
                    className="bg-primary rounded-md bg-gradient-to-t object-contain p-2 group-hover:cursor-pointer group-hover:ring-2"
                    fill
                    src={(icon as Media).url ?? ""}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <RichText data={description} enableGutter={false} />
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function HighlightsFallback() {
  return (
    <section className="border-y">
      <ul className="container flex place-content-center gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li className="flex items-center" key={index}>
            <Skeleton className="h-16 w-40" key={index} />
          </li>
        ))}
      </ul>
    </section>
  )
}
