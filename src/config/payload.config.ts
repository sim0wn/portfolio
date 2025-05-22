import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"

import {
  faqCollection,
  highlightCollection,
  mediaCollection,
  skillCollection,
} from "@/collections"
import { socialCollection } from "@/collections/social.collection"
import { environmentConfig } from "@/config"

export default buildConfig({
  admin: {
    importMap: {
      baseDir: "@",
    },
  },
  collections: [
    faqCollection,
    highlightCollection,
    skillCollection,
    socialCollection,
    mediaCollection,
  ],
  db: mongooseAdapter({
    url: environmentConfig.databaseUri,
  }),
  editor: lexicalEditor(),
  localization: {
    defaultLocale: "pt-BR",
    fallback: true,
    locales: [
      {
        code: "en-US",
        label: "English (United States)",
      },
      {
        code: "pt-BR",
        label: "Português (Brasileiro)",
      },
    ],
  },
  plugins: [
    vercelBlobStorage({
      clientUploads: true,
      collections: {
        media: true,
      },
      enabled: true,
      token: environmentConfig.vercelBlogStorageToken,
    }),
  ],
  secret: environmentConfig.payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve("src/types/payload.type.ts"),
  },
})
