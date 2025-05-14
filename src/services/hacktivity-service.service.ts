import { HTBAdapter } from "@/adapters/htb-adapter.adapter"
import { Adapter } from "@/interfaces/adapter"
import { Hacktivity } from "@/interfaces/hacktivity"

export class HacktivityService {
  private static adapters: Adapter[] = [new HTBAdapter()]

  static async fetchActivities(page: number = 1, limit: number = 10) {
    const activities: Hacktivity[] = []
    for (const adapter of this.adapters) {
      activities.push(...(await adapter.fetchActivities()))
    }
    const totalItems = activities.length
    const totalPages = Math.ceil(totalItems / limit)
    const itemsPerPage = limit
    const previousPage = page > 1 ? page - 1 : 1
    const nextPage = page < Math.ceil(totalItems / limit) ? page + 1 : page
    const startIndex =
      page <= totalPages ? (page - 1) * limit : (totalPages - 1) * limit
    const endIndex = startIndex + limit
    const data = activities.slice(startIndex, endIndex)
    return {
      data,
      pagination: {
        currentPage: page,
        itemsPerPage,
        nextPage,
        previousPage,
        totalItems,
        totalPages,
      },
    }
  }
}
