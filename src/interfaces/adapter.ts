import { Hacktivity } from "./hacktivity"

export interface Adapter {
  fetchActivities(): Promise<Hacktivity[]>
}
