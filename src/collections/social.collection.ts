import { CollectionConfig } from "payload"

export const socialCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["label", "url", "icon"],
    useAsTitle: "label",
  },
  fields: [
    { name: "label", required: true, type: "text" },
    { label: "URL", name: "url", required: true, type: "text" },
    {
      admin: { description: { en: "Iconify icon", pt: "Ícone do Iconify" } },
      name: "icon",
      required: true,
      type: "text",
    },
  ],
  slug: "social",
}
