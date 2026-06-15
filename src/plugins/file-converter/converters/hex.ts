export function textToHex(text: string): string {
  return Array.from(text)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ')
}

export function hexToText(hex: string): string {
  const cleaned = hex.replace(/\s/g, '')
  const bytes = cleaned.match(/.{1,2}/g) || []
  return bytes.map((b) => String.fromCharCode(parseInt(b, 16))).join('')
}