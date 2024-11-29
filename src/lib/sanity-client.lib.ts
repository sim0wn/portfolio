import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "../config/env.config"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
