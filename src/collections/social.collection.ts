import { CollectionConfig } from "payload"

export const socialCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["label", "url", "icon"],
    useAsTitle: "label",
  },
  fields: [
    { name: "label", required: true, type: "text" },
    { name: "url", required: true, type: "text" },
    {
      admin: { description: "Iconify icon" },
      name: "icon",
      required: true,
      type: "text",
    },
  ],
  slug: "social",
}
