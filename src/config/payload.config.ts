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
  faqCollection,
  highlightCollection,
  mediaCollection,
  skillCollection,
} from "@/collections"
import { bookCollection } from "@/collections/book.collection"
import { pageCollection } from "@/collections/page.collection"
import { socialCollection } from "@/collections/social.collection"
import { environmentConfig } from "@/config"

export default buildConfig({
  admin: {
    importMap: {
      baseDir: "@",
    },
  },
  blocks: [CodeBlock],
  collections: [
    bookCollection,
    faqCollection,
    highlightCollection,
    mediaCollection,
    pageCollection,
    skillCollection,
    socialCollection,
  ],
  db: mongooseAdapter({
    url: environmentConfig.databaseUri,
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [CodeBlock] }),
    ],
  }),
  email: resendAdapter({
    apiKey: environmentConfig.resendKey,
    defaultFromAddress: "payload@sim0wn.com",
    defaultFromName: "Payload CMS",
  }),
  i18n: {
    fallbackLanguage: "en",
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
