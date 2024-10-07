import { CaseIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brief",
      title: "Brief",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "localization",
      title: "Language",
      type: "language",
      validation: (Rule) => Rule.required().valid(["pt-BR", "en-US"]),
    }),
  ],
})
