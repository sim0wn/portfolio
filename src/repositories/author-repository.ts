import { Repository } from "@/interfaces/repository"
import { Author } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class AuthorRepository implements Repository<Author> {
  private db: SanityClient

  constructor(sanityClient: any) {
    this.db = sanityClient
  }
  async findAll(): Promise<Author[]> {
    return await this.db.fetch<Author[]>(defineQuery("*[_type == 'author']"))
  }
  async findById(id: Id): Promise<Author | null> {
    return await this.db.fetch<Author>(
      defineQuery(`*[_type == 'author' && _id == $id][0]`),
      { id },
    )
  }
}
