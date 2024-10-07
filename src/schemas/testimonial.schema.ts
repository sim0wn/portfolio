import { StarFilledIcon } from "@sanity/icons"
import { defineType } from "sanity"

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: StarFilledIcon,
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    { name: "photo", type: "image" },
    {
      name: "role",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "company",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "review",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    },
  ],
})
