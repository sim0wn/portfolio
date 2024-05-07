import { allSolutions } from "contentlayer/generated"
import Link from "next/link"

export default function Solutions() {
  return (
    <main className="flex p-2">
      {allSolutions.map((solution, index) => (
        <article key={index} className="bg-neutral-800 p-3 w-fit">
          <Link href={solution._raw.flattenedPath}>
            <p className="font-semibold text-lg">{solution.title}</p>
            <p className="text-center">
              {solution._raw.sourceFileDir.split("/").at(1)}
            </p>
          </Link>
        </article>
      ))}
    </main>
  )
}
