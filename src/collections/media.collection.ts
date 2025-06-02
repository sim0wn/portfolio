import type { CollectionConfig } from "payload"

import slug from "slug"

export const mediaCollection: CollectionConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      admin: {
        description: {
          en: "Alternative text for the image",
          pt: "Texto alternativo para a imagem",
        },
      },
      label: { en: "Alt text", pt: "Texto alternativo" },
      localized: true,
      name: "alt",
      required: true,
      type: "text",
    },
    {
      admin: {
        description: {
          en: "Use the normalized alt text as the filename for the image. If this is not checked, the filename will be automatically generated.",
          pt: "Usar o texto alternativo normalizado como o nome de arquivo da imagem. Se não for selecionado, o nome do arquivo será gerado automaticamente.",
        },
        readOnly: true,
      },
      defaultValue: true,
      hooks: { beforeChange: [() => undefined] },
      label: {
        en: "Use alt text as filename",
        pt: "Usar texto alternativo como nome de arquivo",
      },
      name: "useAltTextAsFilename",
      type: "checkbox",
    },
  ],
  hooks: {
    beforeOperation: [
      ({ args: { data }, operation, req }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          const fileExtension = req.file.name.split(".").pop()
          if (data.useAltTextAsFilename) {
            req.file.name = slug(data.alt)
          } else {
            const hasher = new Bun.CryptoHasher("sha256")
            hasher.update(req.file.data)
            req.file.name = hasher.digest("hex")
          }
          req.file.name += `.${fileExtension}`
        }
      },
    ],
  },
  slug: "media",
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        height: 300,
        name: "thumbnail",
        position: "centre",
        width: 400,
      },
      {
        height: 1024,
        name: "card",
        position: "centre",
        width: 768,
      },
      {
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        name: "tablet",
        position: "centre",
        width: 1024,
      },
    ],
    mimeTypes: ["image/*"],
    staticDir: "media",
  },
}
