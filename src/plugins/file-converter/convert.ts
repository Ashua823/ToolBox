import { markdownToHtml } from './converters/markdown'
import { htmlToMarkdown } from './converters/html'
import { jsonToYaml, yamlToJson } from './converters/json-yaml'
import { csvToJson, jsonToCsv } from './converters/csv'
import { textToBase64, base64ToText } from './converters/base64'
import { textToUrlEncode, urlEncodeToText } from './converters/url'
import { textToHex, hexToText } from './converters/hex'
import { decimalToBinary, decimalToHex, binaryToDecimal, hexToDecimal } from './converters/number'
import type { ConverterCategory } from './types'

type ConvertFn = (input: string) => Promise<string> | string

const converters: Record<string, Record<string, ConvertFn>> = {
  markdown: {
    html: markdownToHtml,
  },
  html: {
    markdown: (input) => htmlToMarkdown(input),
  },
  json: {
    yaml: jsonToYaml,
    csv: jsonToCsv,
  },
  yaml: {
    json: yamlToJson,
  },
  csv: {
    json: csvToJson,
  },
  text: {
    base64: textToBase64,
    urlencode: textToUrlEncode,
    hex: textToHex,
  },
  base64: {
    text: base64ToText,
  },
  urlencode: {
    text: urlEncodeToText,
  },
  hex: {
    text: hexToText,
  },
  decimal: {
    binary: decimalToBinary,
    hex: decimalToHex,
  },
  binary: {
    decimal: binaryToDecimal,
  },
  hexnumber: {
    decimal: hexToDecimal,
  },
}

export const categories: ConverterCategory[] = [
  {
    id: 'text',
    name: '纯文本/标记语言',
    icon: '📝',
    description: '适合在代码编辑器中查看、版本控制友好、体积小',
    formats: ['markdown', 'html', 'json', 'yaml', 'csv', 'text'],
  },
  {
    id: 'document',
    name: '二进制/办公文档',
    icon: '📄',
    description: '适合正式文档发布、打印、演示',
    formats: ['docx', 'pdf'],
  },
  {
    id: 'encoding',
    name: '编码/进制转换',
    icon: '🔣',
    description: '数据编码、进制互转、网络传输',
    formats: ['base64', 'urlencode', 'hex', 'decimal', 'binary', 'hexnumber'],
  },
]

export async function convert(input: string, from: string, to: string): Promise<string> {
  const fromConverters = converters[from]
  if (!fromConverters) {
    throw new Error(`不支持的输入格式: ${from}`)
  }
  const fn = fromConverters[to]
  if (!fn) {
    throw new Error(`不支持从 ${from} 转换到 ${to}`)
  }
  const result = fn(input)
  return result instanceof Promise ? result : Promise.resolve(result)
}

export function getOutputFormats(inputFormat: string): string[] {
  return Object.keys(converters[inputFormat] || {})
}

export function getInputFormats(): string[] {
  return Object.keys(converters)
}

export function getFormatsByCategory(categoryId: string): string[] {
  const cat = categories.find((c) => c.id === categoryId)
  return cat ? cat.formats : []
}