import { CollectionConfig, FieldHookArgs } from "payload"
import slug from "slug"

export const pageCollection: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "slug", "type", "parent", "content"],
    useAsTitle: "title",
  },
  defaultPopulate: {
    slug: true,
  },
  fields: [
    {
      label: { en: "Title", pt: "Título" },
      localized: true,
      name: "title",
      type: "text",
    },
    {
      admin: {
        description: {
          en: "The identifier that will be part of the URL to access this page.",
          pt: "O identificador que fará parte da URL para acessar esta página.",
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
      label: { en: "Book", pt: "Livro" },
      name: "book",
      relationTo: "books",
      required: true,
      type: "relationship",
    },
    {
      defaultValue: "page",
      label: { en: "Type", pt: "Tipo" },
      name: "type",
      options: [
        { label: { en: "Page", pt: "Página" }, value: "page" },
        { label: { en: "Section", pt: "Seção" }, value: "section" },
      ],
      required: true,
      type: "select",
    },
    {
      admin: {
        condition: (data) => data.type !== "section",
      },
      label: { en: "Description", pt: "Descrição" },
      localized: true,
      maxLength: 160,
      name: "description",
      required: false,
      type: "textarea",
    },
    {
      admin: {
        condition: (data) => data.type !== "section",
      },
      label: { en: "Conteúdo", pt: "Content" },
      localized: true,
      name: "content",
      type: "richText",
    },
  ],
  labels: {
    plural: { en: "Pages", pt: "Páginas" },
    singular: { en: "Page", pt: "Página" },
  },
  slug: "pages",
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 10,
  },
}
