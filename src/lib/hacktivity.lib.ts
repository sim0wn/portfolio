interface Machine {
  date: string
  date_diff: string
  object_type: "machine"
  type: "user" | "root"
  first_blood: boolean
  id: number
  name: string
  points: number
  machine_avatar: string
}

type ChallengeCategory =
  | "Stego"
  | "Crypto"
  | "Web"
  | "Reversing"
  | "Pwn"
  | "Misc"
  | "Forensics"
  | "OSINT"
  | "Hardware"

interface Challenge {
  date: string
  date_diff: string
  object_type: "challenge"
  type: "challenge"
  first_blood: boolean
  id: number
  name: string
  points: number
  challenge_category: ChallengeCategory
}

type ActivityResponse = {
  profile: {
    activity: Machine[] | Challenge[]
  }
}

type Activity = {
  name: string
  points: number
  date: string
  category: string
}

export async function findAllHacktivity() {
  const activities: Activity[] = []
  const response = await fetch(
    `${process.env.HTB_API}/profile/activity/${process.env.HTB_PROFILE_ID}`,
  )
  if (response && response.ok) {
    const htbActivities = (await response.json()) as ActivityResponse
    if (htbActivities && "profile" in htbActivities) {
      for (const activity of htbActivities.profile.activity) {
        if ("machine_avatar" in activity) {
          activities.push({
            name: activity.name,
            points: activity.points,
            date: activity.date_diff,
            category: activity.type,
          })
        } else if ("challenge_category" in activity) {
          activities.push({
            name: activity.name,
            points: activity.points,
            date: activity.date_diff,
            category: activity.challenge_category,
          })
        }
      }
    }
  }
  return activities
}
