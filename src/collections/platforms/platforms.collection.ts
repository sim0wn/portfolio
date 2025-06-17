import { CollectionConfig } from "payload"

export const Platforms: CollectionConfig = {
  fields: [
    { name: "name", required: true, type: "text" },
    { name: "website", required: false, type: "text" },
  ],
  labels: {
    plural: { en: "Platforms", pt: "Plataformas" },
    singular: { en: "Platform", pt: "Plataforma" },
  },
  slug: "platforms",
}
