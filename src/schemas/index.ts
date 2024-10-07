import { type SchemaTypeDefinition } from "sanity"

import { articleType } from "./article.schema"
import { authorType } from "./author.schema"
import { blockContentType } from "./block-content.schema"
import { categoryType } from "./category.schema"
import { languageType } from "./language.schema"
import { serviceType } from "./service.schema"
import { tableType } from "./table.schema"
import { testimonialType } from "./testimonial.schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    articleType,
    authorType,
    tableType,
    languageType,
    testimonialType,
    serviceType,
  ],
}
