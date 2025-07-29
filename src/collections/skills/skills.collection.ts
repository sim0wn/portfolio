import { CollectionConfig } from "payload"

export const Skills: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "brief", "description"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: { en: "Title", pt: "Título" },
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    {
      admin: {
        description: "This is the description show in the card",
      },
      label: { en: "Description", pt: "Descrição" },
      localized: true,
      name: "description",
      required: true,
      type: "textarea",
    },
  ],
  labels: {
    plural: { en: "Skills", pt: "Habilidades" },
    singular: { en: "Skill", pt: "Habilidade" },
  },
  slug: "skills",
}
