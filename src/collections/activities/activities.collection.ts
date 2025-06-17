import { CollectionConfig } from "payload"

export const activityCategories = [
  "certification",
  "course",
  "ctf",
  "event",
  "lecture",
  "workshop",
] as const

export const Activities: CollectionConfig = {
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      index: true,
      label: { en: "Title", pt: "Título" },
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    {
      label: { en: "Category", pt: "Categoria" },
      name: "category",
      options: activityCategories.map((category) => ({
        label: { en: category, pt: category },
        value: category,
      })),
      required: true,
      type: "select",
    },
    {
      admin: { date: { pickerAppearance: "dayOnly" } },
      index: true,
      name: "date",
      required: true,
      type: "date",
    },
    {
      admin: {
        description: {
          en: "The platform, organizer, or provider for this activity.",
          pt: "A plataforma, organizador ou provedor desta atividade.",
        },
      },
      name: "platform",
      relationTo: "platforms",
      required: false,
      type: "relationship",
    },
    {
      name: "description",
      required: false,
      type: "textarea",
    },
    {
      admin: { placeholder: "https://..." },
      label: "Activity URL",
      name: "url",
      required: false,
      type: "text",
    },
    {
      fields: [
        {
          admin: {
            placeholder: "https://...",
          },
          label: "URL",
          name: "url",
          required: true,
          type: "text",
        },
        {
          label: { en: "Description", pt: "Descrição" },
          name: "description",
          required: false,
          type: "text",
        },
      ],
      label: { en: "Attachments", pt: "Anexos" },
      labels: {
        plural: { en: "Attachments", pt: "Anexos" },
        singular: { en: "Attachment", pt: "Anexo" },
      },
      name: "attachments",
      type: "array",
    },
    {
      admin: {
        description: {
          en: "Add any extra info specific to this activity’s category (optional).",
          pt: "Adicione informações extras específicas para a categoria desta atividade (opcional).",
        },
      },
      label: {
        en: "Category-specific metadata",
        pt: "Metadados específicos da categoria",
      },
      name: "metadata",
      required: false,
      type: "json",
    },
  ],
  labels: {
    plural: { en: "Activities", pt: "Atividades" },
    singular: { en: "Activity", pt: "Atividade" },
  },
  slug: "activities",
}
