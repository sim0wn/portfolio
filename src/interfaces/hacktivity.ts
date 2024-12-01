import { HacktivityCategory } from "@/enums/hacktivity-category.enum"
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
    iconUrl: string
    profileUrl: string
  }
}
