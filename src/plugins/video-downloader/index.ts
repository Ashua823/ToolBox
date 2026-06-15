import type { ToolPlugin } from '../../types/plugin'

const plugin: ToolPlugin = {
  id: 'video-downloader',
  name: '视频下载',
  categoryId: 'network-tools',
  icon: 'Download',
  description: '解析视频链接、多平台支持、下载管理',
  keywords: ['视频', '下载'],
  requiresBackend: true,
  component: () => import('./VideoDownloader.tsx'),
}

export default plugin