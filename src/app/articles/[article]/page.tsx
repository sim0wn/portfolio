import type { Metadata } from "next"

import TagsIcon from "@/app/components/icons/tags.icon"
import { allArticles } from "contentlayer/generated"
import { formatWithOptions } from "date-fns/fp/formatWithOptions"
import { parseISO } from "date-fns/fp/parseISO"
import { enUS } from "date-fns/locale/en-US"
import { notFound } from "next/navigation"
import { useMDXComponent } from "next-contentlayer/hooks"

export async function generateMetadata({
  params,
}: {
  params: { article: string }
}) {
  const article = allArticles.find(({ slug }) => slug === params.article)
  if (article) {
    return {
      authors: article.authors,
      keywords: article.tags,
      publisher: "sim0wn",
      title: article.title,
    } as Metadata
  }
  return {}
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({ article: article.slug }))
}

export default function Article({ params }: { params: { article: string } }) {
  const article = allArticles.find(({ slug }) => slug === params.article)
  if (!article) notFound()
  const MDXContent = useMDXComponent(article.body.code)
  return (
    <article className="p-2 m-auto w-svw prose dark:prose-invert prose-neutral mx-auto divide-y divide-neutral-800">
      <header className="flex flex-col gap-0.5 items-center text-center">
        <h1 className="mb-2">{article.title}</h1>
        <address className="self-end">by {article.authors.join(", ")}</address>
        <time className="self-end" dateTime={article.date}>
          {formatWithOptions({ locale: enUS }, "PPP", parseISO(article.date))}
        </time>
        <p className="mx-4 px-2 my-2">{article.description}</p>
      </header>
      <section className="mt-6">
        <MDXContent />
      </section>
      <footer>
        {article.tags && (
          <ul className="flex flex-wrap items-center justify-end gap-1.5">
            <TagsIcon />
            {article.tags.map((tag) => (
              <li
                className="list-none text-sm m-0 border px-2 py-0 rounded-full border-neutral-800 bg-neutral-900"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </footer>
    </article>
  )
}
