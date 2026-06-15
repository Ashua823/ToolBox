import type { ToolPlugin } from '../../types/plugin'

const plugin: ToolPlugin = {
  id: 'audio-player',
  name: '音频播放器',
  categoryId: 'media-tools',
  icon: 'Music',
  description: '多格式音频播放、播放列表、均衡器、可视化',
  keywords: ['音频', '播放', '音乐'],
  component: () => import('./AudioPlayer.tsx'),
}

export default plugin