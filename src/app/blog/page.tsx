import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.utils"
import { allArticles } from "contentlayer/generated"
import { compareDesc, formatDate } from "date-fns"
import Link from "next/link"

import { Card } from "../components/card"

export default async function Blog() {
  const translation = await getTranslation(getLocale())
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  return (
    <main className="p-2 gap-2 flex flex-col">
      {articles.map((article, index) => (
        <Card key={index}>
          <Card.Header>
            <h1 className="flex-1 font-semibold text-lg">
              <Link href={`blog/${article.slug}`}>{article.title}</Link>
            </h1>
            {article.date && (
              <aside className="text-sm font-normal flex justify-between">
                <address>
                  {translation.by} {article.authors.join(",")}
                </address>
                <time dateTime={article.date}>
                  {formatDate(article.date, "dd'/'MM'/'yyyy")}
                </time>
              </aside>
            )}
          </Card.Header>
          {article.description && (
            <Card.Body>
              <p className="italic">{article.description}</p>
            </Card.Body>
          )}
          <Card.Footer>
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
          </Card.Footer>
        </Card>
      ))}
    </main>
  )
}
