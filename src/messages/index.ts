// dynamically import the message files
const messages = {
  "en-US": async () => (await import("@/messages/en-US.json")).default,
  "pt-BR": async () => (await import("@/messages/pt-BR.json")).default,
}

export { messages }
