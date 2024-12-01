import { Adapter } from "@/interfaces/adapter"
import { Hacktivity } from "@/interfaces/hacktivity"
import { ChallengeCategory } from "@/types/challenge-category.type"
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
      challenge_category?: ChallengeCategory
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
          object_type: type,
          type: category,
          challenge_category: challengeCategory,
        } of htbActivities.profile.activity) {
          activities.push({
            url: `https://www.hackthebox.com/achievement/${type}/${process.env.HTB_PROFILE_ID}/${id}`,
            name,
            date: parseISO(date),
            type,
            category:
              challengeCategory ?? (category === "user" ? "User" : "System"),
            platform: {
              name: "Hack The Box",
              url: "https://www.hackthebox.eu/",
            },
          })
        }
      }
    }
    return activities
  }
}
