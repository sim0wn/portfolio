import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Testimonial } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id } from "sanity"

export class TestimonialRepository implements Repository<Testimonial> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(): Promise<Testimonial[]> {
    const query = defineQuery(`*[_type == 'testimonial']`)
    return await this.database.fetch<Testimonial[]>(query)
  }

  async findById(id: Id): Promise<Testimonial | null> {
    const query = defineQuery(`*[_type == 'testimonial' && _id == $id]`)
    const params = { id }
    return await this.database.fetch<Testimonial>(query, params)
  }
}
