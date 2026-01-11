import { CollectionConfig } from "payload"
import * as z from "zod"

export const Experiences: CollectionConfig = {
  admin: {
    defaultColumns: [
      "position",
      "organization.name",
      "duration.startDate",
      "duration.endDate",
    ],
    group: {
      en: "Career",
      pt: "Carreira",
    },
    useAsTitle: "position",
  },
  defaultSort: "-duration.startDate",
  fields: [
    {
      fields: [
        {
          label: {
            en: "Name",
            pt: "Nome",
          },
          name: "name",
          required: true,
          type: "text",
        },
        {
          label: "Website",
          name: "website",
          type: "text",
          validate: (value: null | string | undefined) => {
            const parsed = z.url().safeParse(value)
            return parsed.success || parsed.error.issues.join(", ")
          },
        },
      ],
      label: {
        en: "Organization",
        pt: "Empresa",
      },
      name: "organization",
      type: "group",
    },
    {
      fields: [
        {
          fields: [
            {
              admin: {
                date: {
                  displayFormat: "MMM yyyy",
                  pickerAppearance: "monthOnly",
                },
              },
              label: {
                en: "From",
                pt: "De",
              },
              name: "startDate",
              required: true,
              type: "date",
            },
            {
              admin: {
                condition: (_, siblingData) => !!!siblingData.currentPosition,
                date: {
                  displayFormat: "MMM yyyy",
                  pickerAppearance: "monthOnly",
                },
              },
              label: {
                en: "To",
                pt: "Até",
              },
              name: "endDate",
              type: "date",
            },
          ],
          type: "row",
        },
        {
          defaultValue: true,
          name: "currentPosition",
          required: true,
          type: "checkbox",
        },
      ],
      label: {
        en: "Duration",
        pt: "Período",
      },
      name: "duration",
      type: "group",
    },
    {
      label: {
        en: "Position",
        pt: "Cargo",
      },
      localized: true,
      name: "position",
      required: true,
      type: "text",
    },
  ],
  slug: "experiences",
}
