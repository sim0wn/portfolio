import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Article } from "@/types/sanity-schema.type"
import groq, { defineQuery } from "groq"
import { Id } from "sanity"

export class ArticleRepository implements Repository<Article> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale?: Locale): Promise<Article[]> {
    const query = defineQuery(
      groq`*[_type == 'article' && locale == coalesce($locale, locale)] | order(date desc)`,
    )
    const params = { locale: locale ?? null }
    return await this.database.fetch<Article[]>(query, params)
  }

  async findById(id: Id): Promise<Article | null> {
    const query = defineQuery(`*[_type == "article" && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch<Article>(query, params)
  }

  async findBySlug(slug: string): Promise<Article | null> {
    const query = defineQuery(
      groq`*[_type == 'article' && slug.current == $slug][0]`,
    )
    return await this.database.fetch<Article>(query, { slug })
  }
}
