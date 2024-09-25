import type { Metadata } from "next"

import { Tags } from "@/app/components/icons/tags"
import { portableTextComponents } from "@/app/components/portable-text-components"
import { findAllArticles, findArticleBySlug } from "@/lib/articles.lib"
import { findAuthorById } from "@/lib/authors.lib"
import { findCategoryById } from "@/lib/categories.lib"
import { getTranslation } from "@/lib/translations.lib"
import { urlFor } from "@/sanity/lib/image"
import { getLocale } from "@/utils/locale.utils"
import { formatWithOptions } from "date-fns/fp/formatWithOptions"
import { parseISO } from "date-fns/fp/parseISO"
import { enUS } from "date-fns/locale/en-US"
import { PortableText } from "next-sanity"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const article = await findArticleBySlug(slug)
  if (article) {
    const author = await findAuthorById(article.author._ref)
    return {
      authors: { name: author.name },
      creator: author.name,
      description: article.description,
      generator: "Sanity CMS",
      keywords: article.categories?.map(
        async ({ _ref }) => (await findCategoryById(_ref)).title,
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
        locale: getLocale(),
      },
      title: article.title,
    } as Metadata
  }
  return {}
}

export async function generateStaticParams() {
  return (await findAllArticles()).map(({ slug: { current: slug } }) => ({
    slug,
  }))
}

export default async function Article({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const translation = await getTranslation(getLocale())
  const article = await findArticleBySlug(slug)
  if (!article) notFound()
  return (
    <article className="p-2 m-auto w-svw prose dark:prose-invert prose-neutral mx-auto divide-y divide-neutral-800">
      <header className="flex flex-col gap-0.5 items-center text-center">
        <h1 className="mb-2">{article.title}</h1>
        <address className="self-end">
          {translation.by} {(await findAuthorById(article.author._ref)).name}
        </address>
        <time className="self-end" dateTime={article.publishedAt}>
          {formatWithOptions(
            { locale: enUS },
            "PPP",
            parseISO(article.publishedAt),
          )}
        </time>
        <p className="mx-4 px-2 my-2">{article.description}</p>
      </header>
      <section className="mt-6">
        <PortableText
          value={article.body}
          components={portableTextComponents}
        />
      </section>
      <footer>
        {article.categories && (
          <ul className="flex flex-wrap items-center justify-end gap-1.5">
            <Tags />
            {article.categories.map(async ({ _ref }) => {
              const category = await findCategoryById(_ref)
              if (category) {
                return (
                  <li
                    className="list-none text-sm m-0 border px-2 py-0 rounded-full border-neutral-800 bg-neutral-900"
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
