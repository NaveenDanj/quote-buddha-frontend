import { describe, expect, it } from 'vitest'
import { filterSlashCommands, getSlashQuery, type SlashCommand } from './slashCommands'

const commands: SlashCommand[] = [
  { id: 'verify', name: 'verify', label: 'Check a quote' },
  { id: 'reader', name: 'reader', label: 'Open the Reader' },
  { id: 'terms', name: 'terms', label: 'Look up a term' },
]

describe('getSlashQuery', () => {
  it('is the text after the slash', () => {
    expect(getSlashQuery('/')).toBe('')
    expect(getSlashQuery('/ver')).toBe('ver')
  })

  it('is null for an ordinary question', () => {
    expect(getSlashQuery('What is craving?')).toBeNull()
    expect(getSlashQuery('')).toBeNull()
  })

  it('is null once the person types a space, because that is no longer a command', () => {
    expect(getSlashQuery('/verify this')).toBeNull()
  })

  it('is null when the slash is not the first character', () => {
    expect(getSlashQuery('about / and')).toBeNull()
  })
})

describe('filterSlashCommands', () => {
  it('keeps every command for an empty query', () => {
    expect(filterSlashCommands(commands, '')).toEqual(commands)
  })

  it('finds a command by the name that is typed, even when the label says something else', () => {
    expect(filterSlashCommands(commands, 'verify').map((command) => command.id)).toEqual(['verify'])
  })

  it('finds a command by a word in its label, ignoring capital letters', () => {
    expect(filterSlashCommands(commands, 'READER').map((command) => command.id)).toEqual(['reader'])
    expect(filterSlashCommands(commands, 'quote').map((command) => command.id)).toEqual(['verify'])
  })

  it('finds nothing for a query that matches no name or label', () => {
    expect(filterSlashCommands(commands, 'zzz')).toEqual([])
  })
})
