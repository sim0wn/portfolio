import { SlugField } from "@/fields"
import { CollectionConfig } from "payload"

export const highlightCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["icon", "title", "slug", "description"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Title",
      name: "title",
      required: true,
      type: "text",
    },
    SlugField,
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
  ],
  slug: "highlights",
}
