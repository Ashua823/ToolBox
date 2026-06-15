import { create } from 'zustand'
import type { ToolPlugin } from '../types/plugin'

interface AppState {
  plugins: ToolPlugin[]
  activePluginId: string | null
  sidebarCollapsed: boolean
  setPlugins: (plugins: ToolPlugin[]) => void
  setActivePlugin: (id: string) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>((set) => ({
  plugins: [],
  activePluginId: null,
  sidebarCollapsed: false,
  setPlugins: (plugins) => set({ plugins }),
  setActivePlugin: (id) => set({ activePluginId: id }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))