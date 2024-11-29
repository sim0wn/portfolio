import type { Metadata } from "next"

import { portableTextComponents } from "@/components/portable-text-components"
import { urlFor } from "@/utils/image.util"
import { getLocale } from "@/utils/locale.util"
import { formatWithOptions } from "date-fns/fp/formatWithOptions"
import { parseISO } from "date-fns/fp/parseISO"
import { enUS } from "date-fns/locale/en-US"
import { PortableText } from "next-sanity"
import { notFound } from "next/navigation"
import { sanityClient } from "@/lib/sanity-client.lib"
import { ArticleRepository } from "@/repositories/article-repository"
import { AuthorRepository } from "@/repositories/author-repository"
import { TagRepository } from "@/repositories/tag-repository"
import { Tags } from "lucide-react"

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const { slug } = await props.params
  const locale = await getLocale()
  const articleRepository = new ArticleRepository(sanityClient)
  const authorRepository = new AuthorRepository(sanityClient)
  const tagRepository = new TagRepository(sanityClient)
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
  const articleRepository = new ArticleRepository(sanityClient)
  const articles = await articleRepository.findAll()
  return articles.map(({ slug: { current: slug } }) => ({
    params: { slug },
  }))
}

export default async function Article({ params }: { params: Params }) {
  const slug = (await params).slug
  const articleRepository = new ArticleRepository(sanityClient)
  const authorRepository = new AuthorRepository(sanityClient)
  const tagRepository = new TagRepository(sanityClient)
  const article = await articleRepository.findBySlug(slug)
  if (!article) notFound()
  return (
    <article className="container prose prose-neutral m-auto mx-auto w-svw divide-y divide-neutral-800 dark:prose-invert">
      <header className="flex flex-col items-center gap-0.5 text-center">
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
      <footer>
        {article.tags && (
          <ul className="flex flex-wrap items-center justify-end gap-1.5">
            <Tags />
            {article.tags.map(async ({ _ref }) => {
              const category = await tagRepository.findById(_ref)
              if (category) {
                return (
                  <li
                    className="m-0 list-none rounded-full border border-neutral-800 bg-neutral-900 px-2 py-0 text-sm"
                    key={category._id}
                  >
                    {category.title}
                  </li>
                )
              }
            })}
          </ul>
        )}
      </footer>
    </article>
  )
}
