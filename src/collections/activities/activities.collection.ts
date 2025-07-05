import { CollectionConfig } from "payload"
import * as z from "zod/v4"

import { Activity } from "@/types"

export const Activities: CollectionConfig = {
  access: {
    read({ req: { query, user } }) {
      const schema = z
        .object({
          depth: z.literal("1").optional(),
          limit: z.coerce.number().positive().max(20).optional(),
          locale: z.string().max(5).optional(),
          page: z.coerce.number().int().positive().optional(),
          where: z
            .object({
              "category.slug": z
                .object({ equals: z.string().max(50) })
                .optional(),
              title: z.object({ like: z.string().max(255) }).optional(),
            })
            .optional(),
        })
        .strict()
      return !!(user || schema.safeParse(query).success)
    },
  },
  admin: {
    group: { en: "Activities", pt: "Atividades" },
    useAsTitle: "title",
  },
  defaultSort: "-schedule.startDate",
  fields: [
    {
      fields: [
        {
          admin: {
            description: {
              en: "The title of the activity.",
              pt: "O título da atividade.",
            },
          },
          index: true,
          label: { en: "Title", pt: "Título" },
          name: "title",
          required: true,
          type: "text",
        },
        {
          admin: {
            description: {
              en: "The category this activity belongs to.",
              pt: "A categoria à qual esta atividade pertence.",
            },
            width: "25%",
          },
          label: { en: "Category", pt: "Categoria" },
          name: "category",
          relationTo: "activity-categories",
          required: true,
          type: "relationship",
        },
        {
          admin: {
            description: {
              en: "The platform, organizer, or provider for this activity.",
              pt: "A plataforma, organizador ou provedor desta atividade.",
            },
            width: "30%",
          },
          label: { en: "Platform", pt: "Plataforma" },
          name: "platform",
          relationTo: "activity-platforms",
          required: false,
          type: "relationship",
        },
      ],
      type: "row",
    },
    {
      admin: { placeholder: "https://activity.platform.com" },
      label: "Website",
      name: "url",
      required: false,
      type: "text",
    },
    {
      name: "description",
      required: false,
      type: "textarea",
    },
    {
      admin: {
        description: {
          en: "Mark this activity as featured to display it in special sections.",
          pt: "Marque esta atividade como destaque para exibi-la em seções especiais.",
        },
      },
      defaultValue: false,
      index: true,
      label: { en: "Featured", pt: "Destaque" },
      name: "isFeatured",
      type: "checkbox",
    },
    {
      fields: [
        {
          fields: [
            {
              admin: {
                date: {
                  displayFormat: "dd/MM/yyyy",
                  pickerAppearance: "dayOnly",
                },
              },
              index: true,
              label: { en: "Start date", pt: "Início em" },
              name: "startDate",
              required: true,
              type: "date",
            },
            {
              admin: {
                date: {
                  displayFormat: "dd/MM/yyyy",
                  pickerAppearance: "dayOnly",
                },
              },
              index: true,
              label: { en: "End date", pt: "Encerramento" },
              name: "endDate",
              type: "date",
              validate: (val, { siblingData }) => {
                const activity = siblingData as Activity["schedule"]
                if (val && activity.startDate) {
                  return new Date(val) > new Date(activity.startDate)
                    ? true
                    : "End date must be after start date."
                }
                return true
              },
            },
          ],
          type: "row",
        },
        {
          admin: {
            description: {
              en: "The total workload (in minutes) for this activity.",
              pt: "A carga horária total (em minutos) para esta atividade.",
            },
            placeholder: { en: "e.g. 90", pt: "ex: 90" },
          },
          label: { en: "Workload", pt: "Carga horária" },
          min: 1,
          name: "workload",
          type: "number",
        },
      ],
      label: { en: "Schedule", pt: "Agenda" },
      name: "schedule",
      type: "group",
    },
    {
      fields: [
        {
          admin: {
            placeholder: "https://...",
          },
          label: "URL",
          name: "url",
          required: true,
          type: "text",
        },
        {
          label: { en: "Description", pt: "Descrição" },
          name: "description",
          required: false,
          type: "text",
        },
      ],
      label: { en: "Attachments", pt: "Anexos" },
      labels: {
        plural: { en: "Attachments", pt: "Anexos" },
        singular: { en: "Attachment", pt: "Anexo" },
      },
      name: "attachments",
      type: "array",
    },
    {
      admin: {
        description: {
          en: "Add any extra info specific to this activity’s category (optional).",
          pt: "Adicione informações extras específicas para a categoria desta atividade (opcional).",
        },
      },
      label: {
        en: "Category-specific metadata",
        pt: "Metadados específicos da categoria",
      },
      name: "metadata",
      required: false,
      type: "json",
    },
  ],
  labels: {
    plural: { en: "Activities", pt: "Atividades" },
    singular: { en: "Activity", pt: "Atividade" },
  },
  slug: "activities",
}
