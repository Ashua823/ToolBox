export function textToBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}

export function base64ToText(base64: string): string {
  return decodeURIComponent(escape(atob(base64)))
}