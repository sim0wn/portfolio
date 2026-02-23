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

import {
  Activities,
  ActivityCategories,
  ActivityPlatforms,
  Educations,
  Experiences,
  faqCollection,
  Images,
  Notes,
  Skills,
} from "@/collections"
import {
  AiFeature,
  AnnotationFeature,
  CalloutFeature,
  CodeBlockFeature,
  HighlighterFeature,
} from "@/features"
import { Overview } from "@/globals"
import { syncHackTheBoxActivity } from "@/tasks"

import { getEnv } from "./env.config"

const env = getEnv()

export default buildConfig({
  admin: {
    dateFormat: "dd/MM/yyyy",
    importMap: {
      baseDir: "@",
    },
    livePreview: {
      collections: [""],
      globals: ["overview"],
      url({ collectionConfig, globalConfig, locale }) {
        const baseUrl =
          process.env.NODE_ENV === "development"
            ? "https://dev.sim0wn.rocks"
            : "https://www.sim0wn.rocks"
        const localizedBaseUrl = new URL(locale.code, baseUrl).href
        const livePreviewUrl = (globalConfig || collectionConfig)?.admin
          ?.livePreview?.url
        const url = new URL(livePreviewUrl?.toString() ?? "/", localizedBaseUrl)
        return url.href
      },
    },
  },
  blocks: [],
  collections: [
    Activities,
    ActivityCategories,
    ActivityPlatforms,
    Experiences,
    Educations,
    faqCollection,
    Images,
    Notes,
    Skills,
  ],
  db: mongooseAdapter({
    url: env.MONGODB_URI,
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      AiFeature(),
      AnnotationFeature(),
      BlocksFeature({ blocks: [], inlineBlocks: [] }),
      CalloutFeature(),
      CodeBlockFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4", "h5", "h6"] }),
      HighlighterFeature(),
    ],
  }),
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: "payload@resend.sim0wn.rocks",
    defaultFromName: "Payload CMS",
  }),
  globals: [Overview],
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
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      if (!defaultJobsCollection.admin) {
        defaultJobsCollection.admin = {}
      }

      defaultJobsCollection.admin.hidden = false
      return defaultJobsCollection
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
      collections: ["notes"],
      generateURL(docs, _currentDoc, collection) {
        return docs.reduce(
          (url, doc) => `${url}/${doc.slug}`,
          `/${collection.slug}`,
        )
      },
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
