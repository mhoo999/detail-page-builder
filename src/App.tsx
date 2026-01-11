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
  const componentsHTML = components.map((comp) => {
    switch (comp.type) {
      case 'hero':
        return generateHeroHTML(comp)
      case 'slider':
        return generateSliderHTML(comp)
      case 'video':
        return generateVideoHTML(comp)
      case 'divider':
        return generateDividerHTML(comp)
      case 'grid':
        return generateGridHTML(comp)
      default:
        return ''
    }
  }).join('\n    ')

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    }
  </style>
</head>
<body>
  ${componentsHTML}
</body>
</html>`
}

function generateHeroHTML(comp: Extract<Component, { type: 'hero' }>): string {
  const { data } = comp
  const bgStyle = data.backgroundType === 'image' && data.backgroundImage
    ? `background-image: url(${data.backgroundImage}); background-size: cover; background-position: center;`
    : `background-color: ${data.backgroundColor};`

  const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' }
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end' }

  return `<div style="${bgStyle} height: ${data.height}; display: flex; flex-direction: column; align-items: ${alignMap[data.align]}; justify-content: ${justifyMap[data.justify]}; padding: 40px 20px;">
  <div style="max-width: 800px; width: 100%; text-align: ${data.align};">
    ${data.showSectionTitle ? `<div style="display: inline-block; background-color: ${data.sectionTitleBgColor}; color: ${data.sectionTitleColor}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 16px;">${data.sectionTitle}</div>` : ''}
    ${data.showTitle ? `<h1 style="font-size: ${data.titleSize}; font-weight: ${data.titleWeight}; color: ${data.titleColor}; margin-bottom: 16px;">${data.title}</h1>` : ''}
    ${data.showDescription ? `<p style="font-size: ${data.descriptionSize}; font-weight: ${data.descriptionWeight}; color: ${data.descriptionColor}; margin-bottom: 24px; line-height: 1.6;">${data.description}</p>` : ''}
    ${data.showButton ? `<button style="background-color: ${data.buttonBgColor}; color: ${data.buttonColor}; font-size: ${data.buttonSize}; font-weight: ${data.buttonWeight}; padding: 12px 32px; border-radius: 8px; border: none; cursor: pointer;">${data.buttonText}</button>` : ''}
  </div>
</div>`
}

function generateSliderHTML(comp: Extract<Component, { type: 'slider' }>): string {
  const { data } = comp
  return `<div style="height: ${data.height}; position: relative; overflow: hidden;">
  ${data.images.map((img, i) => `<img src="${img}" alt="Slide ${i + 1}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${i === 0 ? 1 : 0};">`).join('\n  ')}
</div>`
}

function generateVideoHTML(comp: Extract<Component, { type: 'video' }>): string {
  const { data } = comp
  if (data.videoType === 'youtube') {
    const videoId = data.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    return `<div style="height: ${data.height};">
  <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
</div>`
  }
  return `<div style="height: ${data.height};">
  <video width="100%" height="100%" controls ${data.autoPlay ? 'autoplay' : ''} ${data.muted ? 'muted' : ''} ${data.loop ? 'loop' : ''} style="object-fit: cover;">
    <source src="${data.videoUrl}">
  </video>
</div>`
}

function generateDividerHTML(comp: Extract<Component, { type: 'divider' }>): string {
  const { data } = comp
  return `<div style="height: ${data.height}; display: flex; align-items: center; justify-content: center;">
  ${data.showLine ? `<div style="width: 100%; height: ${data.lineWidth}; background-color: ${data.lineColor}; border-style: ${data.lineStyle};"></div>` : ''}
</div>`
}

function generateGridHTML(comp: Extract<Component, { type: 'grid' }>): string {
  const { data } = comp
  return `<div style="display: grid; grid-template-columns: repeat(${data.columns}, 1fr); gap: ${data.gap}; padding: 20px;">
  ${data.items.map(item => `<div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover;">
    <div style="padding: 16px;">
      <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">${item.title}</h3>
      <p style="font-size: 14px; color: #666;">${item.description}</p>
    </div>
  </div>`).join('\n  ')}
</div>`
}

export default App
