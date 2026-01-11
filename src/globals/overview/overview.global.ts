import { GlobalConfig } from "payload"

export const Overview: GlobalConfig = {
  admin: { livePreview: { url: "/" } },
  fields: [
    {
      fields: [
        {
          label: {
            en: "Headline",
            pt: "Título",
          },
          name: "headline",
          type: "text",
        },
        {
          label: {
            en: "Summary",
            pt: "Sumário",
          },
          localized: true,
          name: "summary",
          type: "textarea",
        },
      ],
      label: {
        en: "About me",
        pt: "Sobre mim",
      },
      name: "aboutMe",
      type: "group",
    },
    {
      fields: [
        {
          label: {
            en: "Phrase",
            pt: "Frase",
          },
          localized: true,
          name: "phrase",
          type: "text",
        },
        {
          label: {
            en: "Author",
            pt: "Autor",
          },
          name: "author",
          type: "text",
        },
      ],
      label: {
        en: "Quotation",
        pt: "Citação",
      },
      name: "quotation",
      type: "group",
    },
  ],
  label: {
    en: "Overview",
    pt: "Visão geral",
  },
  slug: "overview",
}
