import { ChallengeCategory } from "./challenge-category.type"

export type Hacktivity = {
  url: string
  name: string
  points: number
  date: string
  category: ChallengeCategory
  type: "challenge" | "machine"
  platform: "Hack The Box"
}
