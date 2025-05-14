import { HacktivityCategory } from "@/enums/hacktivity-category.enum"
import { HacktivityType } from "@/types/hacktivity-type.type"
import { Platform } from "@/types/platform.type"

export interface Hacktivity {
  category: HacktivityCategory
  date: Date
  name: string
  platform: {
    iconUrl: string
    name: Platform
    profileUrl: string
    url: string
  }
  type: HacktivityType
  url: string
}
