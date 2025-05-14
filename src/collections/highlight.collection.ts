import { generateSlug } from "@/hooks"
import { CollectionConfig } from "payload"

export const highlightCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Title",
      name: "title",
      required: true,
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      required: true,
      type: "richText",
    },
    {
      label: "Icon",
      name: "icon",
      relationTo: "media",
      required: true,
      type: "upload",
    },
    {
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [generateSlug],
      },
      label: "Slug",
      name: "slug",
      type: "text",
      unique: true,
    },
  ],
  slug: "highlights",
}
