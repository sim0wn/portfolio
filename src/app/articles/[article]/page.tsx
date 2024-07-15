import type { Metadata } from "next"

import { allArticles } from "contentlayer/generated"
import { formatWithOptions } from "date-fns/fp/formatWithOptions"
import { parseISO } from "date-fns/fp/parseISO"
import { ptBR } from "date-fns/locale"
import { notFound } from "next/navigation"
import { useMDXComponent } from "next-contentlayer/hooks"
import TagsIcon from "@/icons/tags.icon"

export async function generateMetadata({
  params,
}: {
  params: { article: string }
}) {
  const article = allArticles.find(({ slug }) => slug === params.article)
  if (article) {
    return {
      authors: article.authors,
      publisher: "Hálisson Ferreira da Cruz",
      title: article.title,
      keywords: article.tags,
    } as Metadata
  }
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({ article: article.slug }))
}

export default function Article({ params }: { params: { article: string } }) {
  const article = allArticles.find(({ slug }) => slug === params.article)
  if (article) {
    const MDXContent = useMDXComponent(article.body.code)
    return (
      <article className="prose p-2 m-auto dark:prose-invert prose-neutral">
        <header className="flex flex-col gap-0.5">
          <h1 className="mb-2 capitalize">{article.title}</h1>
          {article.tags && (
            <ul className="flex self-end items-center gap-1.5 m-0">
              {article.tags.map((tag) => (
                <li
                  key={tag}
                  className="list-none m-0 border px-2 py-0 rounded-full border-neutral-800 bg-neutral-900"
                >
                  {tag}
                </li>
              ))}
              <TagsIcon />
            </ul>
          )}
          <address className="text-right">{article.authors.join(", ")}</address>
          <time className="text-right" dateTime={article.date}>
            {formatWithOptions(
              { locale: ptBR },
              "dd' de 'MMMM' de 'yyyy",
              parseISO(article.date),
            )}
          </time>
        </header>
        <main>
          <MDXContent />
        </main>
      </article>
    )
  } else {
    notFound()
  }
}
