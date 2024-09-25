import { client } from "@/sanity/lib/client"
import { defineQuery } from "groq"
import { Category } from "sanity.types"

export async function findAllCategories() {
  return (await client.fetch(
    defineQuery("*[_type == 'category']"),
  )) as Category[]
}

export async function findCategoryById(id: string) {
  return (await client.fetch(
    defineQuery("*[_type == 'category' && _id == $id][0]"),
    { id },
  )) as Category
}
