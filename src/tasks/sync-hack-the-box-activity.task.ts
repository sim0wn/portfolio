import { TaskHandler } from "payload"

import { getEnv } from "@/config"

const env = getEnv()

export const syncHackTheBoxActivity: TaskHandler<
  "syncHackTheBoxActivity"
> = async ({ req }) => {
  try {
    const response = await fetch(
      `${env.HACK_THE_BOX_API}/profile/activity/${env.HACK_THE_BOX_PROFILE_ID}`,
    )
    const json = await response.json() // as ProfileActivityResponse
    const { docs: activities } = await req.payload.find({
      collection: "activities",
      limit: 0,
      select: { title: true },
      where: {
        "category.slug": {
          in: ["lab", "challenge"],
        },
        "platform.name": {
          equals: "Hack The Box",
        },
      },
    })
    const profileActivity = json.profile.activity.filter(
      ({ name }: { name: string }) =>
        !activities.some(({ title }) => title === name),
    )
    for (const {
      challenge_category: category,
      date,
      first_blood: firstBlood,
      id,
      name,
      object_type: resource,
      type,
    } of profileActivity) {
      await req.payload.create({
        collection: "activities",
        data: {
          category:
            resource === "machine"
              ? "6864909b13305ac310662e95"
              : "68648f7e13305ac310662e92",
          metadata: {
            category: resource === "machine" ? type : category,
            firstBlood,
          },
          platform: "68523f9657d6802d872dd8f1",
          schedule: {
            startDate: date,
          },
          title: name,
          url: `https://www.hackthebox.com/achievement/${resource}/${env.HACK_THE_BOX_PROFILE_ID}/${id}`,
        },
      })
    }
    return {
      output: {
        message: `Synced ${profileActivity.length} Hack The Box activities successfully.`,
      },
      state: "succeeded",
    }
  } catch (error) {
    return {
      errorMessage: "Failed to sync Hack The Box activity: " + error,
      state: "failed",
    }
  }
}
