export interface Converter {
  inputFormat: string
  outputFormat: string
  displayName: string
  convert: (input: string) => Promise<string>
}

export interface FileConverterState {
  inputText: string
  outputText: string
  inputFormat: string
  outputFormat: string
  activeCategory: string
  converting: boolean
  error: string | null
  setInputText: (text: string) => void
  setOutputText: (text: string) => void
  setInputFormat: (format: string) => void
  setOutputFormat: (format: string) => void
  setActiveCategory: (cat: string) => void
  setConverting: (val: boolean) => void
  setError: (err: string | null) => void
}

export interface ConverterCategory {
  id: string
  name: string
  icon: string
  description: string
  formats: string[]
}