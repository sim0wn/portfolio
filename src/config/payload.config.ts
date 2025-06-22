import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { en } from "@payloadcms/translations/languages/en"
import { pt } from "@payloadcms/translations/languages/pt"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"

import { CodeBlock } from "@/blocks"
import {
  Activities,
  ActivityCategories,
  ActivityPlatforms,
  Books,
  faqCollection,
  Images,
  Pages,
  skillCollection,
} from "@/collections"
import { socialCollection } from "@/collections/social.collection"

import { getEnv } from "./env.config"

const env = getEnv()

export default buildConfig({
  admin: {
    dateFormat: "dd/MM/yyyy",
    importMap: {
      baseDir: "@",
    },
  },
  blocks: [CodeBlock],
  collections: [
    Activities,
    ActivityCategories,
    ActivityPlatforms,
    Books,
    faqCollection,
    Images,
    Pages,
    skillCollection,
    socialCollection,
  ],
  db: mongooseAdapter({
    url: env.MONGODB_URI,
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [CodeBlock] }),
    ],
  }),
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: "payload@sim0wn.com",
    defaultFromName: "Payload CMS",
  }),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { en, pt },
  },
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
    nestedDocsPlugin({
      collections: ["pages"],
      generateURL: (docs) =>
        docs.reduce((url, { slug }) => `${url}/${slug}`, ""),
    }),
    vercelBlobStorage({
      collections: {
        images: true,
      },
      enabled: true,
      token: env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve("src/types/payload.type.ts"),
  },
})
