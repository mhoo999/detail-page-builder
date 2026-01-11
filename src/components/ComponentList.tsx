import { COMPONENT_TEMPLATES } from '../constants/componentTemplates'
import { Component } from '../types'

interface ComponentListProps {
  onAddComponent: (component: Component) => void
}

export function ComponentList({ onAddComponent }: ComponentListProps) {
  const handleClick = (template: typeof COMPONENT_TEMPLATES[0]) => {
    const newComponent: Component = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      content: template.defaultContent,
      styles: { ...template.defaultStyles },
    }
    onAddComponent(newComponent)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">컴포넌트</h2>
      <div className="space-y-2">
        {COMPONENT_TEMPLATES.map((template) => (
          <div
            key={template.type}
            className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition"
            onClick={() => handleClick(template)}
          >
            <p className="font-medium text-blue-800">
              {template.icon} {template.label}
            </p>
            <p className="text-xs text-blue-600">{template.description}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}
