import TurndownService from 'turndown'

export function htmlToMarkdown(html: string): string {
  const turndown = new TurndownService()
  return turndown.turndown(html)
}