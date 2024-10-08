import { defineType } from "sanity"

export const localeType = defineType({
  name: "locale",
  title: "Locale",
  type: "string",
  options: {
    list: [
      { title: "Portuguese (Brazil)", value: "pt-BR" },
      { title: "English (United States)", value: "en-US" },
    ],
  },
  validation: (Rule) => Rule.required(),
})
