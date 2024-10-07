import { defineType } from "sanity"

export const languageType = defineType({
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: [
      { title: "Portuguese (Brazil)", value: "pt-BR" },
      { title: "English (United States)", value: "en-US" },
    ],
  },
  validation: (Rule) => Rule.required(),
})
