import type { CollectionConfig } from "payload"

import { slugify } from "@/utils"

export const mediaCollection: CollectionConfig = {
  fields: [
    {
      admin: {
        description: "Alternative text for the image",
      },
      label: "Alt Text",
      name: "alt",
      required: true,
      type: "text",
    },
    {
      admin: {
        description:
          "Use the normalized alt text as the filename for the image. If this is not checked, the filename will be automatically generated.",
      },
      defaultValue: true,
      label: "Use alt text as filename",
      name: "useAltAsFilename",
      type: "checkbox",
      virtual: true,
    },
  ],
  hooks: {
    beforeOperation: [
      ({ args: { data }, operation, req }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          if (data.useAltAsFilename) {
            req.file.name = slugify(data.alt)
          } else {
            const hasher = new Bun.CryptoHasher("sha256")
            hasher.update(req.file.data)
            req.file.name = hasher.digest("hex")
          }
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
