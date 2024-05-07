import { allSolutions } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return allSolutions.map((solution) => ({
    challenge: solution._raw.flattenedPath.split("/").slice(1),
  }))
}

export default function Solution({
  params,
}: {
  params: { challenge: string }
}) {
  const solution = allSolutions.find(
    ({ challenge }) => challenge === params.challenge.at(-1),
  )
  if (!solution) notFound()
  const MDXContent = useMDXComponent(solution.body.code)
  return (
    <article className="prose dark:prose-invert m-auto p-2">
      <header>
        <p className="font-bold text-3xl mb-0">{solution.title}</p>
        {solution.url && (
          <Link target="_blank" rel="noopener noreferrer" href={solution.url}>
            Acessar desafio
          </Link>
        )}
      </header>
      <main>
        <MDXContent />
      </main>
    </article>
  )
}
