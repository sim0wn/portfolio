import { allPlatforms } from "@/utils/challenges.utils"
import Image from "next/image"
import Link from "next/link"

export default function Platforms() {
  const iconSize = 210
  return (
    <main className="flex p-2 gap-2 justify-evenly">
      {allPlatforms.map((platform, index) => (
        <article
          className="bg-neutral-800 p-4 rounded-sm h-fit w-fit flex-col text-center"
          key={index}
        >
          <header className="border-b">
            <Link href={`/challenges/${platform}`}>
              <Image
                alt={platform ?? `Logo da plataforma`}
                height={iconSize}
                src={`/icons/platforms/${platform}.png`}
                width={iconSize}
              />
              <h1 className="text-lg">{platform}</h1>
            </Link>
          </header>
        </article>
      ))}
    </main>
  )
}
