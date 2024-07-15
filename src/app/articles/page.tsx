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
              <Link href={`articles/${article.slug}`}>{article.title}</Link>
            </h1>
            {article.date && (
              <time dateTime={article.date}>
                {formatDate(article.date, "dd'/'MM'/'yyyy")}
              </time>
            )}
          </header>
          {article.description && (
            <p className="italic mb-2">{article.description}</p>
          )}
          <footer className="flex gap-1.5">
            {article.tags && (
              <ul>
                {(article.tags as string[]).map((tag, index) => (
                  <li
                    key={index}
                    className="text-sm list-none border px-2 py-0 rounded-full border-neutral-800 bg-neutral-900"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </footer>
        </article>
      ))}
    </main>
  )
}
