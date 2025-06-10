import { Block } from "payload"

const languageOptions = {
  bash: "BASH",
  cpp: "C++",
  css: "CSS",
  java: "Java",
  javascript: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  plaintext: "Plain Text",
  python: "Python",
  tsx: "TSX",
  typescript: "TypeScript",
}

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
        isClearable: false,
      },
      defaultValue: "javascript",
      label: "Language",
      name: "language",
      options: Object.entries(languageOptions).map(([value, label]) => ({
        label,
        value,
      })),
      required: true,
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
