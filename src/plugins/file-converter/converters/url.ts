export function textToUrlEncode(text: string): string {
  return encodeURIComponent(text)
}

export function urlEncodeToText(text: string): string {
  return decodeURIComponent(text)
}