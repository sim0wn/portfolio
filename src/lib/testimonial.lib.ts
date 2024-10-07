import { Testimonial } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { sanityClient } from "./sanity-client.lib"

export async function findAllTestimonials() {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'testimonial'] | order(date desc)"),
  )) as Testimonial[]
}
