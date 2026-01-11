import { Component } from '../types'

interface PropertyPanelProps {
  selectedComponent: Component | undefined
  onUpdateComponent: (id: string, updates: Partial<Component>) => void
}

export function PropertyPanel({
  selectedComponent,
  onUpdateComponent,
}: PropertyPanelProps) {
  if (!selectedComponent) {
    return (
      <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">속성</h2>
        <p className="text-sm text-gray-500">
          컴포넌트를 선택하면 여기에서 편집할 수 있습니다
        </p>
      </aside>
    )
  }

  const handleContentChange = (value: string) => {
    onUpdateComponent(selectedComponent.id, { content: value })
  }

  const handleStyleChange = (key: string, value: string) => {
    onUpdateComponent(selectedComponent.id, {
      styles: { ...selectedComponent.styles, [key]: value },
    })
  }

  return (
    <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">속성</h2>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          내용
        </label>
        {selectedComponent.type === 'text' || selectedComponent.type === 'button' ? (
          <textarea
            value={selectedComponent.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        ) : selectedComponent.type === 'image' ? (
          <input
            type="text"
            value={selectedComponent.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="이미지 URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ) : null}
      </div>

      {/* Styles */}
      <h3 className="text-sm font-semibold text-gray-700 mb-2">스타일</h3>

      <div className="space-y-3">
        {/* Padding */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Padding
          </label>
          <input
            type="text"
            value={selectedComponent.styles.padding || ''}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            placeholder="16px"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Background Color */}
        {(selectedComponent.type === 'container' || selectedComponent.type === 'button') && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              배경색
            </label>
            <input
              type="color"
              value={selectedComponent.styles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        )}

        {/* Text Color */}
        {(selectedComponent.type === 'text' || selectedComponent.type === 'button') && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              텍스트 색상
            </label>
            <input
              type="color"
              value={selectedComponent.styles.color || '#000000'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        )}

        {/* Font Size */}
        {(selectedComponent.type === 'text' || selectedComponent.type === 'button') && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              폰트 크기
            </label>
            <input
              type="text"
              value={selectedComponent.styles.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Border Radius */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            둥근 모서리
          </label>
          <input
            type="text"
            value={selectedComponent.styles.borderRadius || ''}
            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            placeholder="8px"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </aside>
  )
}
