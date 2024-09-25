import { client } from "@/sanity/lib/client"
import { defineQuery } from "groq"
import { Author } from "sanity.types"

export async function findAllAuthors() {
  return (await client.fetch(
    defineQuery("*[_type == 'author'] | order(name asc)"),
  )) as Author[]
}

export async function findAuthorById(id?: string) {
  return (await client.fetch(
    defineQuery("*[_type == 'author' && _id == $id][0]"),
    { id },
  )) as Author
}
