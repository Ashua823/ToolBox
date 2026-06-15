import { Suspense, lazy, Component, type ReactNode } from 'react'
import type { ToolPlugin } from '../types/plugin'

interface ErrorBoundaryProps {
  pluginName: string
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class PluginErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <h3 className="text-lg font-bold text-red-400 mb-2">
            {this.props.pluginName} 加载失败
          </h3>
          <p className="text-tb-muted text-sm mb-4">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-tb-accent text-tb-bg rounded-lg text-sm font-medium hover:opacity-90"
          >
            重试
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function PluginSkeleton() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-tb-bg3"></div>
        <div className="w-32 h-4 rounded bg-tb-bg3"></div>
      </div>
    </div>
  )
}

interface PluginLoaderProps {
  plugin: ToolPlugin
}

export default function PluginLoader({ plugin }: PluginLoaderProps) {
  const LazyComponent = lazy(plugin.component)

  return (
    <PluginErrorBoundary pluginName={plugin.name}>
      <Suspense fallback={<PluginSkeleton />}>
        <LazyComponent />
      </Suspense>
    </PluginErrorBoundary>
  )
}