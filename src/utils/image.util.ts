import createImageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from "../config/env.config"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Generates a URL for a given Sanity image source.
 *
 * @param source - The source of the Sanity image.
 * @returns The URL for the image.
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
