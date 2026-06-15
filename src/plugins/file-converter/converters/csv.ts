import Papa from 'papaparse'

export function csvToJson(csv: string): string {
  const result = Papa.parse(csv, { header: true, skipEmptyLines: true })
  return JSON.stringify(result.data, null, 2)
}

export function jsonToCsv(json: string): string {
  const data = JSON.parse(json)
  return Papa.unparse(data)
}