import { CollectionConfig } from "payload"
import * as z from "zod"

export const Educations: CollectionConfig = {
  admin: {
    defaultColumns: ["degree", "institution.name", "course"],
    group: { en: "Career", pt: "Carreira" },
  },
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
        en: "Institution",
        pt: "Instituição",
      },
      name: "institution",
      required: true,
      type: "group",
    },
    {
      label: {
        en: "Course",
        pt: "Curso",
      },
      localized: true,
      name: "course",
      required: true,
      type: "text",
    },
    {
      label: {
        en: "Degree",
        pt: "Grau",
      },
      name: "degree",
      options: [
        {
          label: {
            en: "Master's degree",
            pt: "Mestrado",
          },
          value: "master",
        },
        {
          label: {
            en: "Doctorate (Ph.D.)",
            pt: "Doutorado",
          },
          value: "doctorate",
        },
        {
          label: {
            en: "Specialization / Professional qualification",
            pt: "Especialização / MBA",
          },
          value: "specialization",
        },
        {
          label: {
            en: "Associate degree",
            pt: "Tecnólogo",
          },
          value: "associate",
        },
        {
          label: {
            en: "Bachelor's degree",
            pt: "Bacharelado",
          },
          value: "bachelor",
        },
        {
          label: {
            en: "Technical course",
            pt: "Curso técnico",
          },
          value: "technical",
        },
      ],
      required: true,
      type: "select",
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
              required: true,
              type: "date",
            },
          ],
          type: "row",
        },
      ],
      label: {
        en: "Duration",
        pt: "Período",
      },
      name: "duration",
      type: "group",
    },
  ],
  slug: "educations",
}
