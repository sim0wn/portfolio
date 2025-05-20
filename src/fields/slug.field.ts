import { Field, FieldHookArgs } from "payload"
import slug from "slug"

export const SlugField: Field = {
  admin: {
    description: "This is the auto-generated URL slug for the highlight.",
    hidden: true,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }: FieldHookArgs) => {
        if (operation === "create" || operation === "update") {
          return slug(data?.title)
        }
        return data?.slug
      },
    ],
  },
  label: "Slug",
  localized: true,
  name: "slug",
  required: true,
  type: "text",
  unique: true,
}
