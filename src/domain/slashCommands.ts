export type SlashCommand = {
  id: string
  // What the person types after the slash, for example "verify".
  name: string
  // What it does, in words.
  label: string
  // A short key hint shown at the end of the row, for example "Ctrl K".
  shortcut?: string
}

const slashStart = '/'

// "/ve" asks for commands that match "ve". Text that does not start with a slash, or already has a space, is a question.
export function getSlashQuery(text: string): string | null {
  if (!text.startsWith(slashStart) || /\s/.test(text)) {
    return null
  }
  return text.slice(slashStart.length)
}

export function filterSlashCommands(commands: SlashCommand[], query: string): SlashCommand[] {
  const lowerQuery = query.toLowerCase()
  return commands.filter(
    (command) =>
      command.name.toLowerCase().includes(lowerQuery) ||
      command.label.toLowerCase().includes(lowerQuery),
  )
}
