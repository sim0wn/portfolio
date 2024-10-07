import { Article } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { sanityClient } from "./sanity-client.lib"

export async function findAllArticles() {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'article'] | order(date desc)"),
  )) as Article[]
}

export async function findArticleBySlug(slug: string) {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'article' && slug.current == $slug][0]"),
    {
      slug,
    },
  )) as Article
}
