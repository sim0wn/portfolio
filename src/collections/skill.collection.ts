import { CollectionConfig } from "payload"

export const skillCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "brief", "description"],
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
        description: "This is the description show in the card",
      },
      label: "Description",
      localized: true,
      name: "description",
      required: true,
      type: "textarea",
    },
  ],
  labels: {
    plural: "Skills",
    singular: "Skill",
  },
  slug: "skills",
}
