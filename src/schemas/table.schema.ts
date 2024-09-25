import { defineArrayMember, defineType } from "sanity"

export const tableType = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "thead",
      title: "Table Head",
      type: "array",
      validation: (Rule) => Rule.required().max(1).max(1),
      of: [
        defineArrayMember({
          name: "tr",
          title: "Table Row",
          type: "object",
          fields: [
            {
              name: "headers",
              title: "Table Headers",
              type: "array",
              of: [
                defineArrayMember({
                  name: "th",
                  title: "Table Header",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    },
    {
      name: "tbody",
      title: "Table Body",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          name: "tr",
          title: "Table Row",
          type: "object",
          fields: [
            {
              name: "data",
              title: "Table Data",
              type: "array",
              of: [
                defineArrayMember({
                  name: "td",
                  title: "Table Data",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    },
    {
      name: "tfoot",
      title: "Table Foot",
      type: "array",
      of: [
        defineArrayMember({
          name: "tr",
          title: "Table Row",
          type: "object",
          fields: [
            {
              name: "footers",
              title: "Table Footers",
              type: "array",
              of: [
                defineArrayMember({
                  name: "td",
                  title: "Table Footer",
                  type: "string",
                }),
              ],
            },
          ],
        }),
      ],
    },
  ],
})
