import { type SchemaTypeDefinition } from "sanity"

import { articleType } from "./article.schema"
import { authorType } from "./author.schema"
import { blockContentType } from "./block_content.schema"
import { categoryType } from "./category.schema"
import { tableType } from "./table.schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, articleType, authorType, tableType],
}
