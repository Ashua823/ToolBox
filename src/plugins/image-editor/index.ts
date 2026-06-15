import type { ToolPlugin } from '../../types/plugin'

const plugin: ToolPlugin = {
  id: 'image-editor',
  name: '图片编辑器',
  categoryId: 'media-tools',
  icon: 'Image',
  description: '裁剪、滤镜、标注、调色、格式转换',
  keywords: ['图片', '编辑', '裁剪', '滤镜'],
  component: () => import('./ImageEditor.tsx'),
}

export default plugin