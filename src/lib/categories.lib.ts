import { Category } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { sanityClient } from "./sanity-client.lib"

export async function findAllCategories() {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'category']"),
  )) as Category[]
}

export async function findCategoryById(id: string) {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'category' && _id == $id][0]"),
    { id },
  )) as Category
}
