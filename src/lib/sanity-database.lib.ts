import { createClient, QueryParams, SanityClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "../config/env.config"
import { Database } from "@/interfaces/database"

export class SanityDatabase implements Database {
  private client: SanityClient

  constructor() {
    this.client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  }

  async fetch<T>(query: string, params: QueryParams): Promise<T> {
    return await this.client.fetch<T>(query, params)
  }
}
