import { generateSlug } from "@/hooks"
import { CollectionConfig } from "payload"

export const skillCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "description", "createdAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Title",
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    {
      admin: {
        description:
          "This is the brief description shown in the list of skills",
      },
      label: "Brief",
      localized: true,
      name: "brief",
      required: true,
      type: "textarea",
    },
    {
      label: "Description",
      localized: true,
      name: "description",
      required: true,
      type: "richText",
    },
    {
      admin: {
        description: "This is the slug used in the URL",
        readOnly: true,
      },
      hooks: {
        beforeValidate: [generateSlug],
      },
      label: "Slug",
      localized: true,
      name: "slug",
      required: false,
      type: "text",
      unique: true,
    },
  ],
  labels: {
    plural: "Skills",
    singular: "Skill",
  },
  slug: "skills",
}
