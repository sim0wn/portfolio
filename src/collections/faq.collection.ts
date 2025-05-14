import { CollectionConfig } from "payload"

export const faqCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["question"],
    useAsTitle: "question",
  },
  fields: [
    {
      label: "Question",
      name: "question",
      required: true,
      type: "text",
    },
    {
      label: "Answer",
      localized: true,
      name: "answer",
      required: true,
      type: "textarea",
    },
  ],
  slug: "faq",
}
