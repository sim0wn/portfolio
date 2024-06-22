import { allPlatforms } from "@/utils/challenges.utils"
import Link from "next/link"

export default function Platforms() {
  return (
    <main className="flex-col p-2 gap-2">
      {allPlatforms.map((platform, index) => (
        <article className="bg-neutral-800 p-4 rounded-sm" key={index}>
          <Link href={`/challenges/${platform}`}>
            <p className="text-lg">{platform}</p>
          </Link>
        </article>
      ))}
    </main>
  )
}
