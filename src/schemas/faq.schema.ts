import { defineField, defineType } from "sanity"

export const faqType = defineType({
  name: "faq",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "locale",
      validation: (Rule) => Rule.required().valid(["pt-BR", "en-US"]),
    }),
  ],
})
