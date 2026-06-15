import { useEffect } from 'react'
import { useAppStore } from '../shared/store'
import { loadPlugins } from '../plugins/registry'
import Sidebar from './Sidebar'
import PluginLoader from './PluginLoader'

export default function Layout() {
  const { plugins, activePluginId, setPlugins, setActivePlugin } = useAppStore()

  useEffect(() => {
    loadPlugins().then((loaded) => {
      setPlugins(loaded)
      if (loaded.length > 0 && !activePluginId) {
        setActivePlugin(loaded[0].id)
      }
    })
  }, [setPlugins, setActivePlugin, activePluginId])

  const activePlugin = plugins.find((p) => p.id === activePluginId)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-tb-bg">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {activePlugin ? (
          <PluginLoader plugin={activePlugin} />
        ) : (
          <div className="flex items-center justify-center h-full text-tb-muted">
            加载中...
          </div>
        )}
      </main>
    </div>
  )
}