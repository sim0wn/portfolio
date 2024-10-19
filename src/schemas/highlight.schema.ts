import { defineField, defineType } from "sanity"

export const highlightType = defineType({
  name: "highlight",
  title: "Highlight",
  type: "document",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "locale",
    }),
  ],
})
