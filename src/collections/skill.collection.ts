import { CollectionConfig } from "payload"

import { SlugField } from "@/fields"

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
    SlugField,
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
  ],
  labels: {
    plural: "Skills",
    singular: "Skill",
  },
  slug: "skills",
}
