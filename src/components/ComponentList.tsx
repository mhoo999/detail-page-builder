import { COMPONENT_TEMPLATES, DEFAULT_HERO, DEFAULT_SLIDER, DEFAULT_VIDEO, DEFAULT_DIVIDER, DEFAULT_GRID } from '../constants/componentTemplates'
import { Component, HeroComponent, SliderComponent, VideoComponent, DividerComponent, GridComponent } from '../types'

interface ComponentListProps {
  onAddComponent: (component: Component) => void
}

export function ComponentList({ onAddComponent }: ComponentListProps) {
  const handleClick = (template: typeof COMPONENT_TEMPLATES[0]) => {
    let newComponent: Component

    switch (template.type) {
      case 'hero':
        newComponent = {
          id: `hero-${Date.now()}`,
          type: 'hero',
          data: { ...DEFAULT_HERO },
        } as HeroComponent
        break
      case 'slider':
        newComponent = {
          id: `slider-${Date.now()}`,
          type: 'slider',
          data: { ...DEFAULT_SLIDER },
        } as SliderComponent
        break
      case 'video':
        newComponent = {
          id: `video-${Date.now()}`,
          type: 'video',
          data: { ...DEFAULT_VIDEO },
        } as VideoComponent
        break
      case 'divider':
        newComponent = {
          id: `divider-${Date.now()}`,
          type: 'divider',
          data: { ...DEFAULT_DIVIDER },
        } as DividerComponent
        break
      case 'grid':
        newComponent = {
          id: `grid-${Date.now()}`,
          type: 'grid',
          data: { ...DEFAULT_GRID, items: DEFAULT_GRID.items.map(item => ({ ...item })) },
        } as GridComponent
        break
      default:
        return
    }

    onAddComponent(newComponent)
  }

  return (
    <aside className="w-64 bg-white border-r border-black p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-black">컴포넌트</h2>
      <div className="space-y-2">
        {COMPONENT_TEMPLATES.map((template) => (
          <div
            key={template.type}
            className="p-3 bg-white border border-black cursor-pointer hover:bg-gray-100"
            onClick={() => handleClick(template)}
          >
            <p className="font-medium text-black">
              {template.icon} {template.label}
            </p>
            <p className="text-xs text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}
