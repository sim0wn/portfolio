"use server"

import { getLocale, getTranslations } from "next-intl/server"
import z from "zod/v4"

import { payload } from "@/lib"
import { getActivitySearchValidation } from "@/validations"

export async function getActivitiesAction(
  search: z.infer<ReturnType<typeof getActivitySearchValidation>> = {},
) {
  const locale = await getLocale()
  const t = await getTranslations("Actions.activitySearch")
  const { category, page, title } = getActivitySearchValidation({
    category: t("fields.category.error"),
    page: t("fields.page.error"),
    title: t("fields.title.error"),
  }).parse(search)
  const response = await payload.find({
    collection: "activities",
    limit: 10,
    locale,
    page,
    where: {
      ...(category ? { "category.slug": { equals: category } } : {}),
      ...(title ? { title: { like: title } } : {}),
    },
  })
  return response
}
export async function getActivityCategoriesAction() {
  const locale = await getLocale()
  return await payload.find({
    collection: "activity-categories",
    limit: 0,
    locale,
    sort: "name",
  })
}
