import { CaseIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const skillType = defineType({
  name: "skill",
  title: "Skill",
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
      validation: (Rule) => Rule.required().min(250).max(300),
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
      type: "string",
    }),
  ],
})
