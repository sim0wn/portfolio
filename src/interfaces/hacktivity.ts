import { HacktivityCategory } from "@/types/hacktivity-category.type"
import { HacktivityType } from "@/types/hacktivity-type.type"

export interface Hacktivity {
  url: string
  name: string
  date: Date
  category: HacktivityCategory
  type: HacktivityType
  platform: {
    name: "Hack The Box"
    url: string
  }
}
