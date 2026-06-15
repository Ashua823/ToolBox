import { useMemo } from 'react'
import { FolderOpen, PlayCircle, Globe, FileText, Music, Image, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppStore } from '../shared/store'
import { categories } from '../plugins/registry'

const iconMap: Record<string, React.ReactNode> = {
  FolderOpen: <FolderOpen size={18} />,
  PlayCircle: <PlayCircle size={18} />,
  Globe: <Globe size={18} />,
  FileText: <FileText size={18} />,
  Music: <Music size={18} />,
  Image: <Image size={18} />,
  Download: <Download size={18} />,
}

export default function Sidebar() {
  const { plugins, activePluginId, sidebarCollapsed, toggleSidebar, setActivePlugin } = useAppStore()

  const groupedPlugins = useMemo(() => {
    const sorted = [...categories].sort((a, b) => a.order - b.order)
    return sorted.map((cat) => ({
      ...cat,
      items: plugins.filter((p) => p.categoryId === cat.id),
    }))
  }, [plugins])

  return (
    <aside
      className={`flex flex-col bg-tb-bg2 border-r border-tb-rule transition-all duration-200 ${
        sidebarCollapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* 顶部 Logo 区域 */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-tb-rule">
        {!sidebarCollapsed && (
          <span className="text-lg font-bold text-tb-accent tracking-tight">ToolBox</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-tb-bg3 text-tb-muted transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* 插件列表 */}
      <nav className="flex-1 overflow-y-auto py-2">
        {groupedPlugins.map((group) => (
          <div key={group.id} className="mb-2">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-tb-muted uppercase tracking-wider">
                {iconMap[group.icon]}
                <span>{group.name}</span>
              </div>
            )}
            {group.items.map((plugin) => (
              <button
                key={plugin.id}
                onClick={() => setActivePlugin(plugin.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  activePluginId === plugin.id
                    ? 'bg-tb-bg3 text-tb-accent border-r-2 border-tb-accent'
                    : 'text-tb-ink hover:bg-tb-bg3'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={plugin.name}
              >
                <span className="flex-shrink-0">{iconMap[plugin.icon]}</span>
                {!sidebarCollapsed && <span className="truncate">{plugin.name}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}