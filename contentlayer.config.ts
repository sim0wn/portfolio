import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import { createHash } from "crypto"
import remarkGfm from "remark-gfm"

export const Article = defineDocumentType(() => ({
  computedFields: {
    slug: {
      resolve: (article) =>
        article.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w]/g, (match) => (match === " " ? "-" : "")),
      type: "string",
    },
  },
  contentType: "mdx",
  fields: {
    authors: {
      of: { type: "string" },
      required: false,
      type: "list",
      default: ["Hálisson Ferreira da Cruz (sim0wn)"],
    },
    description: { required: true, type: "string" },
    date: { required: true, type: "date" },
    title: { required: true, type: "string" },
    tags: { of: { type: "string" }, required: false, type: "list" },
  },
  filePathPattern: "articles/**.md",
  name: "Article",
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Article],
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          keepBackground: false,
          onVisitHighlightedChars(node) {
            node.properties.className = ["word"]
          },
          theme: {
            dark: "vitesse-black",
            light: "catppuccin-macchiato",
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
})
