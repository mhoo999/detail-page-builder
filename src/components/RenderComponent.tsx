import { Component } from '../types'

interface RenderComponentProps {
  component: Component
}

export function RenderComponent({ component }: RenderComponentProps) {
  const { type, content, styles } = component

  const style = {
    ...styles,
  }

  switch (type) {
    case 'text':
      return (
        <div style={style} className="cursor-pointer">
          {content}
        </div>
      )

    case 'image':
      return (
        <img
          src={content}
          alt="Component"
          style={style}
          className="cursor-pointer"
        />
      )

    case 'button':
      return (
        <button
          style={style}
          className="cursor-pointer font-medium"
        >
          {content}
        </button>
      )

    case 'container':
      return (
        <div style={style} className="cursor-pointer min-h-[100px]">
          {content || '컨테이너'}
        </div>
      )

    default:
      return null
  }
}
