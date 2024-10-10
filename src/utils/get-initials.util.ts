export function getInitials(fullName: string) {
  return `${fullName.charAt(0)}${fullName.split(" ").at(-1)?.charAt(0)}`.trim()
}
