import { CollectionConfig, FieldHookArgs } from "payload"
import slug from "slug"

export const Books: CollectionConfig = {
  admin: {
    group: { en: "Library", pt: "Biblioteca" },
    useAsTitle: "title",
  },
  fields: [
    {
      label: { en: "Cover", pt: "Capa" },
      name: "cover",
      relationTo: "images",
      type: "upload",
    },
    {
      label: { en: "Title", pt: "Título" },
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    {
      admin: {
        description: {
          en: "The identifier that will be part of the URL to access this book.",
          pt: "O identificador que fará parte da URL para acessar este livro.",
        },
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }: FieldHookArgs) => {
            if (data) {
              if ((operation === "create" || !data.slug) && data.title) {
                return slug(data.title)
              }
              return data?.slug
            }
          },
        ],
      },
      label: "Slug",
      name: "slug",
      required: true,
      type: "text",
    },
    {
      label: { en: "Description", pt: "Descrição" },
      localized: true,
      name: "description",
      type: "textarea",
    },
  ],
  labels: {
    plural: { en: "Books", pt: "Livros" },
    singular: { en: "Book", pt: "Livro" },
  },
  slug: "books",
}
