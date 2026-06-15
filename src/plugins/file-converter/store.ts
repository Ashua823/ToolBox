import { create } from 'zustand'
import type { FileConverterState } from './types'

export const useFileConverterStore = create<FileConverterState>((set) => ({
  inputText: '',
  outputText: '',
  inputFormat: 'markdown',
  outputFormat: 'html',
  activeCategory: 'text',
  converting: false,
  error: null,
  setInputText: (text) => set({ inputText: text }),
  setOutputText: (text) => set({ outputText: text }),
  setInputFormat: (format) => set({ inputFormat: format }),
  setOutputFormat: (format) => set({ outputFormat: format }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setConverting: (val) => set({ converting: val }),
  setError: (err) => set({ error: err }),
}))