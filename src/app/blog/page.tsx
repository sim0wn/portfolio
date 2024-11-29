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
import { sanityClient } from "@/lib/sanity-client.lib"
import { getLocale } from "@/utils"
import { AuthorRepository } from "@/repositories/author-repository"
import { TagRepository } from "@/repositories/tag-repository"

export default async function Blog() {
  const locale = await getLocale()
  const articleRepository = new ArticleRepository(sanityClient)
  const authorRepository = new AuthorRepository(sanityClient)
  const tagRepository = new TagRepository(sanityClient)
  const articles = await articleRepository.findAll(locale)
  return (
    <main className="container flex flex-col gap-2">
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
