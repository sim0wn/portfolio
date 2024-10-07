import { formatDate } from "date-fns"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { findAllArticles } from "@/lib/articles.lib"
import { findAuthorById } from "@/lib/authors.lib"
import { findCategoryById } from "@/lib/categories.lib"

export default async function Blog() {
  const articles = await findAllArticles()
  return (
    <main className="flex flex-col gap-2 container">
      {articles.map(async (article, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              <Link href={`blog/${article.slug.current}`}>{article.title}</Link>
            </CardTitle>
            <aside className="text-sm font-normal flex justify-between">
              <address>
                {(await findAuthorById(article.author._ref)).name}
              </address>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, "dd'/'MM'/'yyyy")}
              </time>
            </aside>
            {article.description && (
              <CardDescription>
                <p className="italic">{article.description}</p>
              </CardDescription>
            )}
          </CardHeader>
          <CardFooter>
            {article.categories && (
              <ul className="flex">
                {article.categories.map(async (category, index) => (
                  <li key={index}>
                    <Badge>
                      {(await findCategoryById(category._ref)).title}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardFooter>
        </Card>
      ))}
    </main>
  )
}
