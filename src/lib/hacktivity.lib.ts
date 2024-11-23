import { Challenge } from "@/interfaces/challenge"
import { Machine } from "@/interfaces/machine"
import { Hacktivity } from "@/types/hacktivity.type"

type ActivityResponse = {
  profile: {
    activity: Machine[] | Challenge[]
  }
}

export async function findAllHacktivity() {
  const activities: Hacktivity[] = []
  const response = await fetch(
    `${process.env.HTB_API}/profile/activity/${process.env.HTB_PROFILE_ID}`,
  )
  if (response && response.ok) {
    const htbActivities = (await response.json()) as ActivityResponse
    if (htbActivities && "profile" in htbActivities) {
      for (const activity of htbActivities.profile.activity) {
        if ("machine_avatar" in activity) {
          activities.push({
            url: `https://www.hackthebox.com/achievement/machine/${process.env.HTB_PROFILE_ID}/${activity.id}`,
            name: activity.name,
            points: activity.points,
            date: activity.date,
            type: activity.object_type,
            category: `own (${activity.type})`,
          })
        } else if ("challenge_category" in activity) {
          activities.push({
            url: `https://www.hackthebox.com/achievement/challenge/${process.env.HTB_PROFILE_ID}/${activity.id}`,
            name: activity.name,
            points: activity.points,
            date: activity.date,
            category: activity.challenge_category,
            type: activity.object_type,
          })
        }
      }
    }
  }
  return activities
}
