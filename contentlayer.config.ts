import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/**.md",
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    article: {
      type: "string",
      resolve: (article) => article._raw.sourceFileName.replace(/\.mdx?/, ""),
    },
  },
}))

export const Solution = defineDocumentType(() => ({
  name: "Solution",
  filePathPattern: "solutions/**/**/**.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    category: { type: "string", required: true },
    url: { type: "string", required: false },
    thumbnail: { type: "string", required: false },
  },
  computedFields: {
    challenge: {
      type: "string",
      resolve: (solution) => solution._raw.sourceFileName.replace(/\.mdx/, ""),
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Article, Solution],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: {
            dark: "vitesse-black",
            light: "catppuccin-macchiato",
          },
          onVisitHighlightedChars(node) {
            node.properties.className = ["word"]
          },
          keepBackground: false,
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
})
