import { useState } from 'react'
import { useBuilder } from './hooks/useBuilder'
import { ComponentList } from './components/ComponentList'
import { Canvas } from './components/Canvas'
import { PropertyPanel } from './components/PropertyPanel'
import { supabase } from './lib/supabase'
import { Component } from './types'

function App() {
  const {
    components,
    selectedComponentId,
    addComponent,
    updateComponent,
    deleteComponent,
    selectComponent,
    getSelectedComponent,
    reorderComponents,
    setComponents,
  } = useBuilder()

  const [pageTitle, setPageTitle] = useState('새 페이지')
  const [isSaving, setIsSaving] = useState(false)

  const handleExportHTML = () => {
    const html = generateHTML(components, pageTitle)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${pageTitle}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = async () => {
    if (!supabase) {
      alert('Supabase가 설정되지 않았습니다.\n.env 파일에 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 추가해주세요.')
      return
    }

    setIsSaving(true)
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert({
          title: pageTitle,
          content: { components },
        })
        .select()

      if (error) throw error

      alert('페이지가 저장되었습니다!')
    } catch (error) {
      console.error('Error saving page:', error)
      alert('저장 중 오류가 발생했습니다. Supabase 설정을 확인해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">상세페이지 빌더</h1>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="페이지 제목"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
            >
              {isSaving ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={handleExportHTML}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              HTML 내보내기
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <ComponentList onAddComponent={addComponent} />
        <Canvas
          components={components}
          selectedComponentId={selectedComponentId}
          onSelectComponent={selectComponent}
          onReorderComponents={reorderComponents}
          onDeleteComponent={deleteComponent}
        />
        <PropertyPanel
          selectedComponent={getSelectedComponent()}
          onUpdateComponent={updateComponent}
        />
      </div>
    </div>
  )
}

function generateHTML(components: Component[], title: string): string {
  const componentsHTML = components
    .map((comp) => {
      const styleString = Object.entries(comp.styles)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ')

      switch (comp.type) {
        case 'text':
          return `<div style="${styleString}">${comp.content}</div>`
        case 'image':
          return `<img src="${comp.content}" style="${styleString}" alt="Image" />`
        case 'button':
          return `<button style="${styleString}">${comp.content}</button>`
        case 'container':
          return `<div style="${styleString}">${comp.content || ''}</div>`
        default:
          return ''
      }
    })
    .join('\n    ')

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
  </style>
</head>
<body>
  <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
    ${componentsHTML}
  </div>
</body>
</html>`
}

export default App
