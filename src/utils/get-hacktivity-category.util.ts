import { HacktivityCategory } from "@/enums/hacktivity-category.enum"

export const getHacktivityCategory = (category: string) =>
  Object.values(HacktivityCategory).includes(category as HacktivityCategory)
    ? (category as HacktivityCategory)
    : HacktivityCategory.Misc
