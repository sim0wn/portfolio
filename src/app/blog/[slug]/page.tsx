import type { Metadata } from "next"

import { portableTextComponents } from "@/components/portable-text-components"
import { urlFor } from "@/utils/image.util"
import { getLocale } from "@/utils/locale.util"
import { PortableText } from "next-sanity"
import { notFound } from "next/navigation"
import { ArticleRepository } from "@/repositories/article-repository"
import { AuthorRepository } from "@/repositories/author-repository"
import { TagRepository } from "@/repositories/tag-repository"
import { Tags } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SanityDatabase } from "@/lib/sanity-database.lib"
import { parseISO } from "date-fns"
import { enUS } from "date-fns/locale"
import { formatWithOptions } from "date-fns/fp"

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const { slug } = await props.params
  const locale = await getLocale()
  const database = new SanityDatabase()
  const articleRepository = new ArticleRepository(database)
  const authorRepository = new AuthorRepository(database)
  const tagRepository = new TagRepository(database)
  const article = await articleRepository.findBySlug(slug)
  if (article) {
    const author = await authorRepository.findById(article.author._ref)
    return {
      authors: { name: author?.name },
      creator: author?.name,
      description: article.description,
      generator: "Sanity CMS",
      keywords: article.tags?.map(
        async ({ _ref }) => (await tagRepository.findById(_ref))?.title,
      ),
      publisher: "sim0wn",
      openGraph: {
        type: "article",
        url: `https://sim0wn.dev/blog/${slug}`,
        image: {
          url: article.mainImage && urlFor(article.mainImage).url(),
          alt: article.mainImage?.alt,
        },
        description: article.description,
        locale,
      },
      title: article.title,
    } as Metadata
  }
  return {}
}

export async function generateStaticParams() {
  const database = new SanityDatabase()
  const articleRepository = new ArticleRepository(database)
  const articles = await articleRepository.findAll()
  return articles.map(({ slug: { current: slug } }) => ({
    params: { slug },
  }))
}

export default async function Article({ params }: { params: Params }) {
  const slug = (await params).slug
  const database = new SanityDatabase()
  const articleRepository = new ArticleRepository(database)
  const authorRepository = new AuthorRepository(database)
  const tagRepository = new TagRepository(database)
  const article = await articleRepository.findBySlug(slug)
  if (!article) notFound()
  return (
    <article className="prose prose-neutral dark:prose-invert container m-auto mx-auto w-svw p-2">
      <header className="flex flex-col items-center gap-0.5 rounded-md p-2 text-center">
        <h1 className="mb-2">{article.title}</h1>
        <address className="self-end">
          {(await authorRepository.findById(article.author._ref))?.name}
        </address>
        <time className="self-end" dateTime={article.publishedAt}>
          {formatWithOptions(
            { locale: enUS },
            "PPP",
            parseISO(article.publishedAt),
          )}
        </time>
        <p className="mx-4 my-2 px-2">{article.description}</p>
      </header>
      <section className="mt-6">
        <PortableText
          value={article.body}
          components={portableTextComponents}
        />
      </section>
      {article.tags && (
        <footer className="flex flex-wrap items-center justify-end gap-1.5">
          <Tags />
          {article.tags.map(async ({ _ref }) => {
            const category = await tagRepository.findById(_ref)
            if (category) {
              return (
                <Badge variant={"default"} key={category._id}>
                  {category.title}
                </Badge>
              )
            }
          })}
        </footer>
      )}
    </article>
  )
}
