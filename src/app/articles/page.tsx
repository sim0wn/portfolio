import { allArticles } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Link from "next/link"

export default function Articles() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <main className="p-2">
      {articles.map((article, index) => (
        <article key={index} className="p-4 bg-neutral-800">
          <Link href={article.url}>{article.title}</Link>
        </article>
      ))}
    </main>
  )
}
