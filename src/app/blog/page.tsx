import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.utils"
import { formatDate } from "date-fns"
import Link from "next/link"

import { findAllArticles } from "@/lib/articles.lib"
import { findAuthorById } from "@/lib/authors.lib"
import { client } from "@/sanity/lib/client"
import { Card } from "../components/card"

export default async function Blog() {
  const translation = await getTranslation(getLocale())
  const articles = await findAllArticles()
  return (
    <main className="p-2 gap-2 flex flex-col">
      {articles.map(async (article, index) => (
        <Card key={index}>
          <Card.Header>
            <h1 className="flex-1 font-semibold text-lg">
              <Link href={`blog/${article.slug.current}`}>{article.title}</Link>
            </h1>
            <aside className="text-sm font-normal flex justify-between">
              <address>
                {translation.by}{" "}
                {(await findAuthorById(article.author._ref)).name}
              </address>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, "dd'/'MM'/'yyyy")}
              </time>
            </aside>
          </Card.Header>
          {article.description && (
            <Card.Body>
              <p className="italic">{article.description}</p>
            </Card.Body>
          )}
          <Card.Footer>
            {article.categories && (
              <ul className="flex">
                {article.categories.map(async (category, index) => (
                  <li
                    className="text-sm list-none border px-2 py-0 rounded-full border-neutral-800 bg-neutral-900"
                    key={index}
                  >
                    {await client.fetch(
                      "*[_type == 'category' && _id == $id][0].title",
                      { id: category._ref },
                    )}
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
