import { sanityClient } from "@/lib/sanity-client.lib"
import { Author } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"

export async function findAllAuthors() {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'author'] | order(name asc)"),
  )) as Author[]
}

export async function findAuthorById(id?: string) {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'author' && _id == $id][0]"),
    { id },
  )) as Author
}
