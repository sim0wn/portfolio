import { CollectionConfig } from "payload"

export const highlightCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["icon", "title", "description"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: { en: "Title", pt: "Título" },
      name: "title",
      required: true,
      type: "text",
    },
    {
      label: { en: "Description", pt: "Descrição" },
      name: "description",
      required: true,
      type: "richText",
    },
    {
      label: { en: "Icon", pt: "Ícone" },
      name: "icon",
      relationTo: "media",
      required: true,
      type: "upload",
    },
  ],
  labels: {
    plural: {
      en: "Highlights",
      pt: "Destaques",
    },
    singular: {
      en: "Highlight",
      pt: "Destaque",
    },
  },
  slug: "highlights",
}
