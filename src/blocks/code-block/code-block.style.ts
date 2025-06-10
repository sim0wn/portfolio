import { CSSProperties } from "react"

import { jetbrains_mono } from "@/app/(frontend)/fonts"

const colors = {
  base: "#232136", // Background
  foam: "#9ccfd8", // Properties, foam accent
  gold: "#f6c177", // Keywords, warnings, gold accent
  highlightHigh: "#56526e", // High emphasis highlight
  highlightLow: "#2a283e", // Low emphasis highlight
  highlightMed: "#44415a", // Medium emphasis highlight
  iris: "#c4a7e7", // Variables, iris accent
  love: "#eb6f92", // Tags, errors, love accent
  muted: "#6e6a86", // Comments, disabled text
  overlay: "#393552", // Overlay background
  pine: "#3e8fb0", // Functions, pine accent
  rose: "#ea9a97", // Numbers, rose accent
  subtle: "#908caa", // Subtle text, punctuation
  surface: "#2d293b", // Elevated background
  text: "#e0def4", // Main text
}

const codeBlockStyle: { [key: string]: CSSProperties } = {
  hljs: {
    background: colors.base,
    color: colors.text,
    display: "block" as const,
    fontFamily: jetbrains_mono.style.fontFamily,
    overflowX: "auto" as const,
    padding: "1em",
  },
  "hljs-addition": { color: colors.pine },
  "hljs-attribute": { color: colors.foam },
  "hljs-built_in": { color: colors.gold },
  "hljs-builtin-name": { color: colors.gold },
  "hljs-bullet": { color: colors.love },
  "hljs-class": { color: colors.gold },
  "hljs-comment": { color: colors.muted, fontStyle: "italic" },
  "hljs-deletion": { color: colors.love },
  "hljs-doctag": { color: colors.muted },
  "hljs-emphasis": { fontStyle: "italic" as const },
  "hljs-function": { color: colors.iris },
  "hljs-keyword": { color: colors.gold },
  "hljs-link": { color: colors.foam },
  "hljs-literal": { color: colors.rose },
  "hljs-meta": { color: colors.muted },
  "hljs-name": { color: colors.love },
  "hljs-number": { color: colors.rose },
  "hljs-params": { color: colors.text },
  "hljs-quote": { color: colors.muted, fontStyle: "italic" },
  "hljs-section": { color: colors.gold },
  "hljs-selector-tag": { color: colors.love },
  "hljs-string": { color: colors.gold },
  "hljs-strong": { fontWeight: "bold" as const },
  "hljs-symbol": { color: colors.love },
  "hljs-tag": { color: colors.love },
  "hljs-title": { color: colors.pine },
  "hljs-type": { color: colors.gold },
  "hljs-variable": { color: colors.iris },
}
export default codeBlockStyle
