export const environmentConfig = {
  databaseUri:
    process.env.DATABASE_URI ?? "mongodb://127.0.0.1:27017/portfolio",
  payloadSecret: process.env.PAYLOAD_SECRET ?? "",
  vercelBlogStorageToken: process.env.VERCEL_BLOB_STORAGE_TOKEN ?? "",
}
