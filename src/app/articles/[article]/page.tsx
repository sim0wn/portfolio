import type { Metadata } from "next"

import TagsIcon from "@/app/components/icons/tags.icon"
import { allArticles } from "contentlayer/generated"
import { formatWithOptions } from "date-fns/fp/formatWithOptions"
import { parseISO } from "date-fns/fp/parseISO"
import { ptBR } from "date-fns/locale"
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
    <article className="p-2 m-auto w-svw prose dark:prose-invert prose-neutral mx-auto">
      <header className="flex flex-col gap-0.5 items-center text-center border-b">
        <h1 className="mb-2">{article.title}</h1>
        {article.tags && (
          <ul className="flex flex-wrap items-center justify-stretch gap-1.5 m-0">
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
        <address>{article.authors.join(", ")}</address>
        <time dateTime={article.date}>
          {formatWithOptions(
            { locale: ptBR },
            "dd' de 'MMMM' de 'yyyy",
            parseISO(article.date),
          )}
        </time>
        <p className="border-b mx-4 px-2">{article.description}</p>
      </header>
      <main className="mt-6">
        <MDXContent />
      </main>
    </article>
  )
}
