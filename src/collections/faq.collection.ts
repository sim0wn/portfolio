import { CollectionConfig } from "payload"

export const faqCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["question", "answer"],
    useAsTitle: "question",
  },
  fields: [
    {
      label: { en: "Question", pt: "Pergunta" },
      localized: true,
      name: "question",
      required: true,
      type: "text",
    },
    {
      label: { en: "Answer", pt: "Resposta" },
      localized: true,
      name: "answer",
      required: true,
      type: "textarea",
    },
  ],
  labels: {
    plural: { en: "Frequently asked questions", pt: "Questões comuns" },
    singular: { en: "Frequently asked question", pt: "Questão comum" },
  },
  slug: "faq",
}
