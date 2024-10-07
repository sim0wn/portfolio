import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "../utils/env.util"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
