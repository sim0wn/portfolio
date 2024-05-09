import { allSolutions } from "contentlayer/generated"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useMDXComponent } from "next-contentlayer/hooks"

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
          <Link href={solution.url} rel="noopener noreferrer" target="_blank">
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
