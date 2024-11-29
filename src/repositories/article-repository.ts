import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Article } from "@/types/sanity-schema.type"
import groq, { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class ArticleRepository implements Repository<Article> {
  private db: SanityClient

  constructor(sanityClient: SanityClient) {
    this.db = sanityClient
  }

  async findAll(locale: Locale): Promise<Article[]> {
    const query = defineQuery(
      groq`*[_type == 'article' && locale == $locale] | order(date desc)`,
    )
    return await this.db.fetch<Article[]>(query, { locale })
  }

  async findById(id: Id): Promise<Article | null> {
    const query = defineQuery(`*[_type == "article" && _id == $id][0]`)
    return await this.db.fetch<Article>(query, { id })
  }

  async findBySlug(slug: string): Promise<Article | null> {
    const query = defineQuery(
      groq`*[_type == 'article' && slug.current == $slug][0]`,
    )
    return await this.db.fetch<Article>(query, { slug })
  }
}
