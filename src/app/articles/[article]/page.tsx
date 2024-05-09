import type { Metadata } from "next"

import { allArticles } from "contentlayer/generated"
import { formatWithOptions } from "date-fns/fp/formatWithOptions"
import { parseISO } from "date-fns/fp/parseISO"
import { ptBR } from "date-fns/locale"

export async function generateStaticParams() {
  return allArticles.map((article) => ({ article: article._raw.flattenedPath }))
}

export async function generateMetadata({
  params,
}: {
  params: { article: string }
}) {
  const article = allArticles.find(({ article }) => article === params.article)
  if (article) {
    return { title: article.title } as Metadata
  }
}

export default function Article({ params }: { params: { article: string } }) {
  const article = allArticles.find(({ article }) => article === params.article)
  if (article) {
    return (
      <article className="prose p-2 m-auto dark:prose-invert prose-neutral">
        <header className="flex flex-col">
          <h1 className="mb-2 uppercase">{article.title}</h1>
          <address className="text-right">{article.authors.join(", ")}</address>
          <time className="text-right" dateTime={article.date}>
            {formatWithOptions(
              { locale: ptBR },
              "' 'd' de 'MMMM' de 'yyyy",
              parseISO(article.date),
            )}
          </time>
        </header>
        <main dangerouslySetInnerHTML={{ __html: article.body.html }}></main>
      </article>
    )
  }
}
