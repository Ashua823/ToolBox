import type { ToolPlugin } from '../../types/plugin'

const plugin: ToolPlugin = {
  id: 'file-converter',
  name: '文件格式转换',
  categoryId: 'file-tools',
  icon: 'FileText',
  description: '支持 Markdown、HTML、JSON、YAML、PDF、Word 等格式互转',
  keywords: ['转换', '格式', 'pdf', 'word', 'markdown'],
  component: () => import('./FileConverter.tsx'),
}

export default plugin