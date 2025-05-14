export const environmentConfig = {
  databaseUri:
    process.env.DATABASE_URI ?? "mongodb://127.0.0.1:27017/portfolio",
  payloadSecret: process.env.PAYLOAD_SECRET ?? "",
  vercelBlogStorageToken: process.env.BLOB_READ_WRITE_TOKEN ?? "",
}
