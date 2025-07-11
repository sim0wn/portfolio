import { CollectionConfig, FieldHookArgs } from "payload"
import slug from "slug"

export const Pages: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "slug", "type", "parent", "content"],
    group: { en: "Library", pt: "Biblioteca" },
    useAsTitle: "title",
  },
  defaultSort: "title",
  fields: [
    {
      fields: [
        {
          admin: {
            description: {
              en: "The title of the page.",
              pt: "O título da página.",
            },
          },
          label: { en: "Title", pt: "Título" },
          localized: true,
          name: "title",
          required: true,
          type: "text",
        },
        {
          admin: {
            width: "30%",
          },
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
      ],
      type: "row",
    },
    {
      admin: {
        condition: (data) => !data.parent,
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          async ({ data, req: { payload }, value }) => {
            if (data?.parent) {
              const parent = await payload.findByID({
                collection: "pages",
                id: data.parent,
                select: { book: true },
              })
              if (parent.book) {
                const book = parent.book
                return typeof book === "object" ? book.id : book
              }
            }
            return value
          },
        ],
      },
      label: { en: "Book", pt: "Livro" },
      name: "book",
      relationTo: "books",
      required: true,
      type: "relationship",
    },
    {
      admin: {
        description: {
          en: "A unique identifier (per hierarchical level) that is human-readable for the page.",
          pt: "Um identificador único (por nível hierárquico) e legível por humanos para a página.",
        },
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }: FieldHookArgs) => {
            if (data) {
              if ((operation === "create" || !data.slug) && data.title) {
                return slug(data.title)
              }
              return slug(data.slug ?? "")
            }
          },
        ],
      },
      index: true,
      label: "Slug",
      name: "slug",
      required: true,
      type: "text",
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
    {
      admin: {
        readOnly: true,
      },
      hooks: {
        afterRead: [
          ({ data, req }) => {
            const localizedBreadcrumbs = data?.breadcrumbs
            if (typeof localizedBreadcrumbs !== "object") {
              return null
            }

            // Helper to extract unique segments from breadcrumbs
            const extractSegments = (
              breadcrumbs: undefined | { url: string }[],
            ) => {
              if (!breadcrumbs) return ""
              const segmentsSet = new Set<string>()
              for (const breadcrumb of breadcrumbs) {
                if (breadcrumb?.url) {
                  for (const segment of breadcrumb.url.split("/")) {
                    if (segment) {
                      segmentsSet.add(segment)
                    }
                  }
                }
              }
              return Array.from(segmentsSet).join("/")
            }

            if (!req.locale || req.locale === "all") {
              const slugs: { [locale: string]: string } = {}
              for (const [locale, breadcrumbs] of Object.entries(
                localizedBreadcrumbs,
              )) {
                slugs[locale] = extractSegments(
                  breadcrumbs as { url: string }[],
                )
              }
              return slugs
            }

            return extractSegments(
              localizedBreadcrumbs[req.locale] as { url: string }[],
            )
          },
        ],
      },
      name: "url",
      type: "text",
      virtual: true,
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
        interval: 1000 * 60 * 5, // 5 minutes
      },
      schedulePublish: true,
    },
    maxPerDoc: 10,
  },
}
