import { CollectionConfig } from "payload"

export const socialCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["icon", "label", "url"],
    useAsTitle: "label",
  },
  fields: [
    { name: "url", required: true, type: "text" },
    { name: "label", required: true, type: "text" },
    { name: "icon", relationTo: "media", required: true, type: "upload" },
  ],
  slug: "social",
}
