import { allArticles } from "contentlayer/generated"
import { format, parseISO } from "date-fns"
import type { Metadata } from "next"

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
          <time className="text-lg self-end" dateTime={article.date}>
            {format(parseISO(article.date), "LLLL d, yyyy")}
          </time>
        </header>
        <main dangerouslySetInnerHTML={{ __html: article.body.html }}></main>
      </article>
    )
  }
}
