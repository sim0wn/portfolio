import { allPlatforms } from "@/utils/challenges.utils"
import { allChallenges } from "contentlayer/generated"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return allPlatforms.map((platform) => ({
    platform: platform,
  }))
}

export default function Challenges({
  params,
}: {
  params: { platform: string }
}) {
  const challenges = allChallenges.filter(
    ({ _raw }) => _raw.flattenedPath.split("/")[1] === params.platform,
  )
  if (!challenges || challenges.length < 1) notFound()
  return (
    <main className="flex p-2 gap-2 flex-wrap justify-between">
      {challenges.map((challenge, index) => (
        <article className="bg-neutral-800 p-3 w-full" key={index}>
          <Link
            className="w-full"
            href={challenge._raw.flattenedPath.split("/").slice(1).join("/")}
          >
            <p className="text-lg">{challenge.title}</p>
          </Link>
        </article>
      ))}
    </main>
  )
}
