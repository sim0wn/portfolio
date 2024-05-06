import { allArticles } from "contentlayer/generated"
import { format, parseISO } from "date-fns"

export async function generateStaticParams() {
  return allArticles.map((article) => ({ article: article._raw.flattenedPath }))
}

export default function Article({ params }: { params: { article: string } }) {
  const article = allArticles.find(
    (article) => article._raw.sourceFileName.split(".")[0] === params.article,
  )
  if (article) {
    return (
      <article className="prose p-2 m-auto dark:prose-invert prose-neutral">
        <header>
          <h1>{article.title}</h1>
          <time className="text-lg" dateTime={article.date}>
            {format(parseISO(article.date), "LLLL d, yyyy")}
          </time>
        </header>
        <main dangerouslySetInnerHTML={{ __html: article.body.html }}></main>
      </article>
    )
  }
}
