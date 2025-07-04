import { CollectionConfig } from "payload"

export const ActivityCategories: CollectionConfig = {
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
      localized: true,
      name: "name",
      required: true,
      type: "text",
    },
    {
      admin: { placeholder: "e.g. certification, ctf, event..." },
      label: "Slug",
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      label: { en: "Description", pt: "Descrição" },
      localized: true,
      name: "description",
      required: false,
      type: "textarea",
    },
  ],
  labels: {
    plural: { en: "Categories", pt: "Categorias" },
    singular: { en: "Category", pt: "Categoria" },
  },
  slug: "activity-categories",
}
