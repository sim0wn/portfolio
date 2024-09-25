import { client } from "@/sanity/lib/client"
import { defineQuery } from "groq"
import { Article } from "sanity.types"

export async function findAllArticles() {
  return (await client.fetch(
    defineQuery("*[_type == 'article'] | order(date desc)"),
  )) as Article[]
}

export async function findArticleBySlug(slug: string) {
  return (await client.fetch(
    defineQuery("*[_type == 'article' && slug.current == $slug][0]"),
    {
      slug,
    },
  )) as Article
}
