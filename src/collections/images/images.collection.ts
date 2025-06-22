import type { CollectionConfig } from "payload"

import crypto from "crypto"
import sharp from "sharp"

export const Images: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    group: { en: "Assets", pt: "Recursos" },
  },
  fields: [
    {
      admin: {
        description: {
          en: "Caption for the image",
          pt: "Legenda para a imagem",
        },
      },
      localized: true,
      name: "caption",
      type: "text",
    },
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
      type: "textarea",
    },
  ],
  hooks: {
    beforeOperation: [
      async ({ args, operation, req }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          // If the image is not already optimized as WebP or AVIF, convert it using sharp
          if (!/image\/(webp|avif)/i.test(req.file.mimetype)) {
            req.file.data = await sharp(req.file.data)
              .webp({ lossless: true })
              .toBuffer()
            req.file.mimetype = "image/webp"
          }
          const hash = crypto
            .createHash("sha256")
            .update(req.file.data)
            .digest("hex")
          const fileExtension = req.file.mimetype.split("/")[1]
          req.file.name = `${hash}.${fileExtension}`
        }
        return args
      },
    ],
  },
  slug: "images",
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        height: undefined,
        name: "mobile",
        position: "centre",
        width: 480,
      },
      {
        height: undefined,
        name: "tablet",
        position: "centre",
        width: 1024,
      },
    ],
    mimeTypes: ["image/*"],
    resizeOptions: { width: 1920, withoutEnlargement: true },
    staticDir: "media/images",
  },
}
