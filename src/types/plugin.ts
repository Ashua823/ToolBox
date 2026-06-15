import type { ComponentType } from 'react'

/** 工具分类 */
export interface ToolCategory {
  id: string
  name: string
  icon: string
  order: number
}

/** 工具插件 */
export interface ToolPlugin {
  /** 插件唯一标识 */
  id: string
  /** 显示名称 */
  name: string
  /** 所属分类 ID */
  categoryId: string
  /** 图标名称 */
  icon: string
  /** 插件描述 */
  description: string
  /** 搜索关键词 */
  keywords: string[]
  /** 懒加载组件 */
  component: () => Promise<{ default: ComponentType }>
  /** 是否需要后端服务 */
  requiresBackend?: boolean
}