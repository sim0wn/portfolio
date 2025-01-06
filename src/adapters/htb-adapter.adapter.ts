import { HacktivityCategory } from "@/enums/hacktivity-category.enum"
import { Adapter } from "@/interfaces/adapter"
import { Hacktivity } from "@/interfaces/hacktivity"
import { parseISO } from "date-fns"

type HTBActivity = {
  profile: {
    activity: {
      date: string
      date_diff: string
      object_type: "machine"
      type: "user" | "root"
      first_blood: boolean
      id: number
      name: string
      points: number
      machine_avatar: string
      challenge_category?: string
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
          id,
          name,
          date,
          object_type: target,
          type,
          challenge_category: category,
        } of htbActivities.profile.activity) {
          const hacktivityCategory = Object.values(HacktivityCategory).includes(
            category as HacktivityCategory,
          )
            ? (category as HacktivityCategory)
            : null
          activities.push({
            url: `https://www.hackthebox.com/achievement/${target}/${process.env.HTB_PROFILE_ID}/${id}`,
            name,
            date: parseISO(date),
            type: target,
            category:
              hacktivityCategory ??
              (type === "user"
                ? HacktivityCategory.User
                : HacktivityCategory.System),
            platform: {
              name: "Hack The Box",
              url: "https://www.hackthebox.eu/",
              iconUrl: "/icons/hack-the-box.svg",
              profileUrl: `https://app.hackthebox.com/profile/${process.env.HTB_PROFILE_ID}/`,
            },
          })
        }
      }
    }
    return activities
  }
}
