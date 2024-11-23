import { ChallengeCategory } from "@/types/challenge-category"

export interface Challenge {
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
