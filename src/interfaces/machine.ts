export interface Machine {
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
