import { revalidatePath } from "next/cache"
import { Breadcrumb } from "node_modules/@payloadcms/plugin-nested-docs/dist/types"
import { CollectionConfig, FieldHookArgs } from "payload"
import slug from "slug"

export const Notes: CollectionConfig = {
  admin: {
    defaultColumns: ["title", "slug", "type", "parent", "content"],
    group: { en: "Content", pt: "Conteúdo" },
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
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          (args) => {
            const breadcrumbs =
              args.data?.breadcrumbs ?? args.originalDoc.breadcrumbs
            if (breadcrumbs) {
              return breadcrumbs
                .map((breadcrumb: Breadcrumb) => breadcrumb.url)
                .reduce(
                  (previousUrl: string, url: string) =>
                    url.length > previousUrl.length ? url : previousUrl,
                  "",
                )
            }
            return args.value
          },
        ],
      },
      label: "URL",
      name: "url",
      required: true,
      type: "text",
      unique: true,
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
  hooks: {
    afterChange: [
      (args) => {
        if (
          (!args.previousDoc || args.previousDoc !== args.doc) &&
          args.doc._status === "published"
        ) {
          revalidatePath(
            `/(frontend)/[locale]/${args.collection.slug}/[[...slug]]`,
            "layout",
          )
        }
      },
    ],
  },
  labels: {
    plural: { en: "Notes", pt: "Notas" },
    singular: { en: "Note", pt: "Nota" },
  },
  slug: "notes",
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
