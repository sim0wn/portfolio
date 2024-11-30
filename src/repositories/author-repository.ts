import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Author } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id } from "sanity"

export class AuthorRepository implements Repository<Author> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }
  async findAll(): Promise<Author[]> {
    const query = defineQuery("*[_type == 'author']")
    return await this.database.fetch<Author[]>(query)
  }
  async findById(id: Id): Promise<Author | null> {
    const query = defineQuery(`*[_type == 'author' && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch<Author>(query, params)
  }
}
