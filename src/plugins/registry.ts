import type { ToolPlugin, ToolCategory } from '../types/plugin'

/** 所有分类 */
export const categories: ToolCategory[] = [
  { id: 'file-tools', name: '文件工具', icon: 'FolderOpen', order: 1 },
  { id: 'media-tools', name: '媒体工具', icon: 'PlayCircle', order: 2 },
  { id: 'network-tools', name: '网络工具', icon: 'Globe', order: 3 },
]

/** 动态导入所有插件 */
const pluginModules = import.meta.glob('./**/index.ts', { eager: false })

/** 加载所有插件 */
export async function loadPlugins(): Promise<ToolPlugin[]> {
  const plugins: ToolPlugin[] = []
  for (const [, loader] of Object.entries(pluginModules)) {
    const mod = await (loader as () => Promise<{ default: ToolPlugin }>)()
    plugins.push(mod.default)
  }
  return plugins
}