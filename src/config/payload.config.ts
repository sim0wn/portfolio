import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import {
  BlocksFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
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
import { AnnotationFeature, HighlighterFeature } from "@/features"
import { syncHackTheBoxActivity } from "@/tasks"

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
  ],
  db: mongooseAdapter({
    url: env.MONGODB_URI,
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      AnnotationFeature(),
      BlocksFeature({ blocks: [CodeBlock], inlineBlocks: [] }),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"] }),
      HighlighterFeature(),
    ],
  }),
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: "payload@resend.sim0wn.rocks",
    defaultFromName: "Payload CMS",
  }),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { en, pt },
  },
  jobs: {
    access: {
      run: ({ req }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) {
          return true
        }

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        return (
          req.headers.get("authorization") ===
          `Bearer ${process.env.CRON_SECRET}`
        )
      },
    },
    tasks: [
      {
        handler: syncHackTheBoxActivity,
        label: "Synchronize Hack The Box activities",
        slug: "syncHackTheBoxActivity",
      },
    ],
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
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
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
