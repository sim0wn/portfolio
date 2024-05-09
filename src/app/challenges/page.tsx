import { allChallenges } from "contentlayer/generated"
import Link from "next/link"

export default function Solutions() {
  return (
    <main className="flex p-2 gap-2 flex-wrap justify-center">
      {allChallenges.map((challenge, index) => (
        <article className="bg-neutral-800 p-3 w-fit" key={index}>
          <Link href={challenge._raw.flattenedPath}>
            <p className="font-semibold text-lg">{challenge.title}</p>
            <p className="text-center">
              {challenge._raw.sourceFileDir.split("/").at(1)}
            </p>
          </Link>
        </article>
      ))}
    </main>
  )
}
