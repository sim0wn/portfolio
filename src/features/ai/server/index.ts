import { createServerFeature } from "@payloadcms/richtext-lexical"

export const AiFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/features/ai/client#AiFeatureClient",
    i18n: {
      en: {
        description: "Enhance your content with AI capabilities.",
        label: "AI",
      },
      pt: {
        description: "Melhore seu conteúdo com recursos de IA.",
        label: "IA",
      },
    },
  }),
  key: "ai",
})
