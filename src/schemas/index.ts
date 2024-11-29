import { type SchemaTypeDefinition } from "sanity"

import { articleType } from "./article.schema"
import { authorType } from "./author.schema"
import { blockContentType } from "./block-content.schema"
import { tagType } from "./tag.schema"
import { faqType } from "./faq.schema"
import { highlightType } from "./highlight.schema"
import { skillType } from "./skill.schema"
import { tableType } from "./table.schema"
import { testimonialType } from "./testimonial.schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    tagType,
    articleType,
    authorType,
    tableType,
    testimonialType,
    skillType,
    highlightType,
    faqType,
  ],
}
