import { allArticles } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Link from "next/link"

export default function Articles() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <main className="p-2 gap-2 flex flex-col">
      {articles.map((article, index) => (
        <article className="p-4 bg-neutral-800 rounded-sm" key={index}>
          <Link href={article._raw.flattenedPath}>{article.title}</Link>
        </article>
      ))}
    </main>
  )
}
