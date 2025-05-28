export const environmentConfig = {
  databaseUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/portfolio",
  payloadSecret: process.env.PAYLOAD_SECRET ?? "",
  resendKey: process.env.RESEND_API_KEY ?? "",
  vercelBlogStorageToken: process.env.BLOB_READ_WRITE_TOKEN ?? "",
}
