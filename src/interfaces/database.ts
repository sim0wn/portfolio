export interface Database {
  fetch<T>(query: string, params?: any): Promise<T>
}
