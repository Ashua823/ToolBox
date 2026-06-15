export function decimalToBinary(num: string): string {
  const n = parseInt(num, 10)
  if (isNaN(n)) throw new Error('无效的十进制数')
  return n.toString(2)
}

export function decimalToHex(num: string): string {
  const n = parseInt(num, 10)
  if (isNaN(n)) throw new Error('无效的十进制数')
  return n.toString(16).toUpperCase()
}

export function binaryToDecimal(bin: string): string {
  if (!/^[01]+$/.test(bin.trim())) throw new Error('无效的二进制数')
  return parseInt(bin.trim(), 2).toString(10)
}

export function hexToDecimal(hex: string): string {
  if (!/^[0-9A-Fa-f]+$/.test(hex.trim())) throw new Error('无效的十六进制数')
  return parseInt(hex.trim(), 16).toString(10)
}