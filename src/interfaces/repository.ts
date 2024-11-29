import { Locale } from "@/types/locale.type"
import { Id } from "sanity"

export interface Repository<T> {
  findAll(locale?: Locale): Promise<T[]>
  findById(id: Id): Promise<T | null>
}
