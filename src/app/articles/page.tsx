import { allArticles } from "contentlayer/generated"
import { compareDesc, formatDate } from "date-fns"
import Link from "next/link"

export default function Articles() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <main className="p-2 gap-2 flex flex-col">
      {articles.map((article, index) => (
        <article className={"p-4 bg-neutral-800 rounded-sm"} key={index}>
          <header className="flex">
            <h1 className="flex-1 font-semibold text-lg">
              <Link href={article._raw.flattenedPath}>{article.title}</Link>
            </h1>
            {article.date && (
              <time dateTime={article.date}>
                {formatDate(article.date, "dd'/'MM'/'yyyy")}
              </time>
            )}
          </header>
          {article.content && <p className="italic">{article.content}</p>}
        </article>
      ))}
    </main>
  )
}
