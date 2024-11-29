import { Repository } from "@/interfaces/repository"
import { Testimonial } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class TestimonialRepository implements Repository<Testimonial> {
  private db: SanityClient

  constructor(sanityClient: SanityClient) {
    this.db = sanityClient
  }

  async findAll(): Promise<Testimonial[]> {
    return await this.db.fetch<Testimonial[]>(
      defineQuery(`*[_type == 'testimonial']`),
    )
  }

  async findById(id: Id): Promise<Testimonial | null> {
    return await this.db.fetch<Testimonial>(
      defineQuery(`*[_type == 'testimonial' && _id == $id]`),
      { id },
    )
  }
}
