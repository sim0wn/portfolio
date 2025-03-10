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
import { ArticleRepository } from "@/repositories/article-repository"
import { getLocale } from "@/utils"
import { AuthorRepository } from "@/repositories/author-repository"
import { TagRepository } from "@/repositories/tag-repository"
import { SanityDatabase } from "@/lib/sanity-database.lib"

export default async function Blog() {
  const locale = await getLocale()
  const database = new SanityDatabase()
  const articleRepository = new ArticleRepository(database)
  const authorRepository = new AuthorRepository(database)
  const tagRepository = new TagRepository(database)
  const articles = await articleRepository.findAll(locale)
  return (
    <main className="flex flex-col gap-2 p-2">
      {articles.map(async (article, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              <Link href={`blog/${article.slug.current}`}>{article.title}</Link>
            </CardTitle>
            <aside className="flex justify-between text-sm font-normal">
              <address>
                {(await authorRepository.findById(article.author._ref))?.name}
              </address>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt, "dd'/'MM'/'yyyy")}
              </time>
            </aside>
            {article.description && (
              <CardDescription className="italic">
                {article.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardFooter>
            {article.tags && (
              <ul className="flex">
                {article.tags.map(async (category, index) => (
                  <li key={index}>
                    <Badge>
                      {(await tagRepository.findById(category._ref))?.title}
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
