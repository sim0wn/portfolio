import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "locale",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
  ],
})
