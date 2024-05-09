import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

export const Article = defineDocumentType(() => ({
  computedFields: {
    article: {
      resolve: (article) => article._raw.sourceFileName.replace(/\.mdx?/, ""),
      type: "string",
    },
  },
  contentType: "markdown",
  fields: {
    authors: { of: { type: "string" }, required: true, type: "list" },
    date: { required: true, type: "date" },
    title: { required: true, type: "string" },
  },
  filePathPattern: "articles/**.md",
  name: "Article",
}))

export const Challenge = defineDocumentType(() => ({
  computedFields: {
    challenge: {
      resolve: (solution) => solution._raw.sourceFileName.replace(/\.mdx/, ""),
      type: "string",
    },
  },
  contentType: "mdx",
  fields: {
    category: { required: true, type: "string" },
    thumbnail: { required: false, type: "string" },
    title: { required: true, type: "string" },
    url: { required: false, type: "string" },
  },
  filePathPattern: "challenges/**/**/**.mdx",
  name: "Challenge",
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Article, Challenge],
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
