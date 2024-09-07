import { allArticles } from "contentlayer/generated"
import { compareDesc, formatDate } from "date-fns"
import Link from "next/link"

export default function Blog() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <main className="p-2 gap-2 flex flex-col">
      {articles.map((article, index) => (
        <article className={"p-4 bg-neutral-800 rounded-sm"} key={index}>
          <header className="flex">
            <h1 className="flex-1 font-semibold text-lg">
              <Link href={`blog/${article.slug}`}>{article.title}</Link>
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
          <footer className="flex gap-1.5 flex-1">
            {article.tags && (
              <ul className="flex">
                {(article.tags as string[]).sort().map((tag, index) => (
                  <li
                    className="text-sm list-none border px-2 py-0 rounded-full border-neutral-800 bg-neutral-900"
                    key={index}
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
