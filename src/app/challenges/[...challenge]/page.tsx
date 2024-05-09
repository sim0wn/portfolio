import { allChallenges } from "contentlayer/generated"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useMDXComponent } from "next-contentlayer/hooks"

export async function generateStaticParams() {
  return allChallenges.map((challenge) => ({
    challenge: challenge._raw.flattenedPath.split("/").slice(1),
  }))
}

export default function Challenge({
  params,
}: {
  params: { challenge: string }
}) {
  const challenge = allChallenges.find(
    ({ challenge }) => challenge === params.challenge.at(-1),
  )
  if (!challenge) notFound()
  const MDXContent = useMDXComponent(challenge.body.code)
  return (
    <article className="prose dark:prose-invert m-auto p-2">
      <header>
        <p className="font-bold text-3xl mb-0">{challenge.title}</p>
        {challenge.url && (
          <Link href={challenge.url} rel="noopener noreferrer" target="_blank">
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
