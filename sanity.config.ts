"use client"

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { documentInternationalization } from "@sanity/document-internationalization"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { structure } from "./src/config/structure.config"
import { schema } from "./src/schemas"
import { apiVersion, dataset, projectId } from "./src/config/env.config"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './src/schemas' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en-US", title: "English (United States)" },
        { id: "pt-BR", title: "Português (Brazil)" },
      ],
      schemaTypes: [
        "article",
        "tag",
        "faq",
        "highlight",
        "skill",
        "testimonial",
      ],
      languageField: "locale",
    }),
  ],
})
