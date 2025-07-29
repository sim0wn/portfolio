import z from "zod/v4"

export const getActivitySearchValidation = ({
  category,
  page,
  title,
}: {
  category: string
  page: string
  title: string
}) =>
  z
    .object({
      category: z.string({ error: category }).max(50),
      page: z.number().positive({ error: page }),
      title: z.string({ error: title }).max(255),
    })
    .partial()
