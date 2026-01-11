import { ComponentTemplate } from '../types'

export const COMPONENT_TEMPLATES: ComponentTemplate[] = [
  {
    type: 'text',
    label: '텍스트',
    description: '텍스트 블록',
    icon: '📝',
    defaultContent: '여기에 텍스트를 입력하세요',
    defaultStyles: {
      fontSize: '16px',
      color: '#000000',
      padding: '16px',
    },
  },
  {
    type: 'image',
    label: '이미지',
    description: '이미지 블록',
    icon: '🖼️',
    defaultContent: 'https://via.placeholder.com/600x400',
    defaultStyles: {
      width: '100%',
      height: 'auto',
    },
  },
  {
    type: 'button',
    label: '버튼',
    description: '버튼 블록',
    icon: '🔘',
    defaultContent: '클릭하세요',
    defaultStyles: {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      textAlign: 'center',
    },
  },
  {
    type: 'container',
    label: '컨테이너',
    description: '레이아웃 블록',
    icon: '📦',
    defaultContent: '',
    defaultStyles: {
      padding: '24px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
    },
  },
]
