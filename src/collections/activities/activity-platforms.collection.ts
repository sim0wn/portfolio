import { CollectionConfig } from "payload"

export const ActivityPlatforms: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    group: { en: "Activities", pt: "Atividades" },
    useAsTitle: "name",
  },
  fields: [
    {
      label: { en: "Name", pt: "Nome" },
      name: "name",
      required: true,
      type: "text",
    },
    { name: "website", required: false, type: "text" },
  ],
  labels: {
    plural: { en: "Platforms", pt: "Plataformas" },
    singular: { en: "Platform", pt: "Plataforma" },
  },
  slug: "activity-platforms",
}
