import { Adapter } from "@/interfaces/adapter"
import { Hacktivity } from "@/interfaces/hacktivity"
import { getHacktivityCategory } from "@/utils/get-hacktivity-category.util"
import { parseISO } from "date-fns"

type HTBActivity = {
  profile: {
    activity: {
      challenge_category?: string
      date: string
      date_diff: string
      first_blood: boolean
      id: number
      machine_avatar: string
      name: string
      object_type: "machine"
      points: number
      type: "root" | "user"
    }[]
  }
}

export class HTBAdapter implements Adapter {
  async fetchActivities() {
    const activities: Hacktivity[] = []
    const response = await fetch(
      `${process.env.HTB_API}/profile/activity/${process.env.HTB_PROFILE_ID}`,
    )
    if (response && response.ok) {
      const htbActivities = (await response.json()) as HTBActivity
      if (htbActivities && "profile" in htbActivities) {
        for (const {
          challenge_category: category,
          date,
          id,
          name,
          object_type: target,
          type,
        } of htbActivities.profile.activity) {
          const hacktivityCategory = getHacktivityCategory(
            category ??
              (type === "user" ? "User" : type === "root" ? "System" : ""),
          )
          activities.push({
            category: hacktivityCategory,
            date: parseISO(date),
            name,
            platform: {
              iconUrl: "/icons/hack-the-box.svg",
              name: "Hack The Box",
              profileUrl: `https://app.hackthebox.com/profile/${process.env.HTB_PROFILE_ID}/`,
              url: "https://www.hackthebox.eu/",
            },
            type: target,
            url: `https://www.hackthebox.com/achievement/${target}/${process.env.HTB_PROFILE_ID}/${id}`,
          })
        }
      }
    }
    return activities
  }
}
