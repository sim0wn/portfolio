import { Block } from "payload"
import { bundledLanguagesInfo } from "shiki/langs"

const CodeBlock: Block = {
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      admin: {
        description: {
          en: "Select the programming language for syntax highlighting.",
          pt: "Selecione a linguagem de programação para destaque de sintaxe.",
        },
        isClearable: true,
      },
      defaultValue: "text",
      label: "Language",
      name: "language",
      options: bundledLanguagesInfo.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
      required: false,
      type: "select",
    },
    {
      admin: {
        placeholder: "Optional file name (e.g. example.tsx)",
      },
      label: "Filename",
      name: "filename",
      required: false,
      type: "text",
    },
    {
      admin: {
        description: "Paste your code snippet here.",
        placeholder: `// Example:\nconsole.log('Hello, world!');`,
        rows: 8,
      },
      label: "Code",
      name: "code",
      required: true,
      type: "textarea",
    },
    {
      admin: {
        description: "Display line numbers in the code block.",
      },
      defaultValue: true,
      label: "Show Line Numbers",
      name: "showLineNumbers",
      type: "checkbox",
    },
  ],
  labels: {
    plural: "Code Snippets",
    singular: "Code Snippet",
  },
  slug: "codeBlock",
}

export { CodeBlock }
