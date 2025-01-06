import { HacktivityCategory } from "@/enums/hacktivity-category.enum"
import { HacktivityType } from "@/types/hacktivity-type.type"
import { Platform } from "@/types/platform.type"

export interface Hacktivity {
  url: string
  name: string
  date: Date
  category: HacktivityCategory
  type: HacktivityType
  platform: {
    name: Platform
    url: string
    iconUrl: string
    profileUrl: string
  }
}
