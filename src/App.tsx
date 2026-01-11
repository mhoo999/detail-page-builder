import { useState, useEffect } from 'react'
import { useBuilder } from './hooks/useBuilder'
import { ComponentList } from './components/ComponentList'
import { Canvas } from './components/Canvas'
import { PropertyPanel } from './components/PropertyPanel'
import { supabase } from './lib/supabase'
import { Component } from './types'

interface SavedPage {
  id: string
  title: string
  content: { components: Component[] }
  created_at: string
  updated_at: string
}

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
  const [savedPages, setSavedPages] = useState<SavedPage[]>([])
  const [isLoadingPages, setIsLoadingPages] = useState(false)
  const [showPageList, setShowPageList] = useState(false)
  const [currentPageId, setCurrentPageId] = useState<string | null>(null)

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
      if (currentPageId) {
        // 기존 페이지 업데이트
        const { error } = await supabase
          .from('pages')
          .update({
            title: pageTitle,
            content: { components },
          })
          .eq('id', currentPageId)

        if (error) throw error
        alert('페이지가 업데이트되었습니다!')
      } else {
        // 새 페이지 저장
        const { data, error } = await supabase
          .from('pages')
          .insert({
            title: pageTitle,
            content: { components },
          })
          .select()

        if (error) throw error
        if (data && data[0]) {
          setCurrentPageId(data[0].id)
        }
        alert('페이지가 저장되었습니다!')
      }

      // 페이지 목록 새로고침
      loadPages()
    } catch (error) {
      console.error('Error saving page:', error)
      alert('저장 중 오류가 발생했습니다. Supabase 설정을 확인해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  const loadPages = async () => {
    if (!supabase) return

    setIsLoadingPages(true)
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setSavedPages(data || [])
    } catch (error) {
      console.error('Error loading pages:', error)
      alert('페이지 목록을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setIsLoadingPages(false)
    }
  }

  const loadPage = (page: SavedPage) => {
    setComponents(page.content.components)
    setPageTitle(page.title)
    setCurrentPageId(page.id)
    setShowPageList(false)
    selectComponent(null)
  }

  const deletePage = async (id: string) => {
    if (!supabase) return
    if (!confirm('정말 이 페이지를 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id)

      if (error) throw error

      alert('페이지가 삭제되었습니다.')
      loadPages()

      // 현재 열려있는 페이지가 삭제된 경우 초기화
      if (currentPageId === id) {
        setComponents([])
        setPageTitle('새 페이지')
        setCurrentPageId(null)
      }
    } catch (error) {
      console.error('Error deleting page:', error)
      alert('페이지 삭제 중 오류가 발생했습니다.')
    }
  }

  const createNewPage = () => {
    if (components.length > 0) {
      if (!confirm('현재 작업 중인 내용이 사라집니다. 새 페이지를 만드시겠습니까?')) {
        return
      }
    }
    setComponents([])
    setPageTitle('새 페이지')
    setCurrentPageId(null)
    selectComponent(null)
  }

  useEffect(() => {
    if (supabase) {
      loadPages()
    }
  }, [])

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
            {currentPageId && (
              <span className="text-sm text-gray-500">(편집 중)</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={createNewPage}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              새 페이지
            </button>
            {supabase && (
              <button
                onClick={() => setShowPageList(!showPageList)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                페이지 관리
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
            >
              {isSaving ? '저장 중...' : currentPageId ? '업데이트' : '저장'}
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

      {/* Page List Modal */}
      {showPageList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">저장된 페이지</h2>
              <button
                onClick={() => setShowPageList(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {isLoadingPages ? (
                <div className="text-center py-8 text-gray-500">로딩 중...</div>
              ) : savedPages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">저장된 페이지가 없습니다.</div>
              ) : (
                <div className="space-y-3">
                  {savedPages.map((page) => (
                    <div
                      key={page.id}
                      className={`border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition ${
                        currentPageId === page.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{page.title}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            <div>컴포넌트 {page.content.components.length}개</div>
                            <div>생성: {new Date(page.created_at).toLocaleString('ko-KR')}</div>
                            {page.updated_at !== page.created_at && (
                              <div>수정: {new Date(page.updated_at).toLocaleString('ko-KR')}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => loadPage(page)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                          >
                            불러오기
                          </button>
                          <button
                            onClick={() => deletePage(page.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
  const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' }
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end' }

  const overlayImageHTML = data.showOverlayImage && data.overlayImage
    ? `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url(${data.overlayImage}); background-size: cover; background-position: center; opacity: 0.3; pointer-events: none;"></div>`
    : ''

  return `<div style="width: 100%; background-color: ${data.backgroundColor}; position: relative; min-height: ${data.height};">
  ${overlayImageHTML}
  <div style="max-width: 1140px; margin: 0 auto; padding: 40px 20px; height: ${data.height}; display: flex; flex-direction: column; align-items: ${alignMap[data.align]}; justify-content: ${justifyMap[data.justify]}; position: relative; z-index: 1;">
    <div style="width: 100%; text-align: ${data.align};">
      ${data.showSectionTitle ? `<div style="display: inline-block; background-color: ${data.sectionTitleBgColor}; color: ${data.sectionTitleColor}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 16px;">${data.sectionTitle}</div>` : ''}
      ${data.showTitle ? `<h1 style="font-size: ${data.titleSize}; font-weight: ${data.titleWeight}; color: ${data.titleColor}; margin-bottom: 16px;">${data.title}</h1>` : ''}
      ${data.showDescription ? `<p style="font-size: ${data.descriptionSize}; font-weight: ${data.descriptionWeight}; color: ${data.descriptionColor}; margin-bottom: 24px; line-height: 1.6;">${data.description}</p>` : ''}
      ${data.showDescriptionImage && data.descriptionImage ? `<div style="margin-bottom: 24px;"><img src="${data.descriptionImage}" alt="Description" style="max-width: 100%; height: auto; border-radius: 8px;"></div>` : ''}
      ${data.showButton ? `<button style="background-color: ${data.buttonBgColor}; color: ${data.buttonColor}; font-size: ${data.buttonSize}; font-weight: ${data.buttonWeight}; padding: 12px 32px; border-radius: 8px; border: none; cursor: pointer;">${data.buttonText}</button>` : ''}
    </div>
  </div>
</div>`
}

function generateSliderHTML(comp: Extract<Component, { type: 'slider' }>): string {
  const { data } = comp
  return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div style="max-width: ${data.imageWidth}; margin: 0 auto; height: ${data.height}; position: relative; overflow: hidden; border-radius: 8px;">
    ${data.images.map((img, i) => `<img src="${img}" alt="Slide ${i + 1}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${i === 0 ? 1 : 0};">`).join('\n    ')}
  </div>
</div>`
}

function generateVideoHTML(comp: Extract<Component, { type: 'video' }>): string {
  const { data } = comp

  // URL이 없는 경우 빈 placeholder 반환
  if (!data.videoUrl) {
    return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div style="max-width: 1140px; margin: 0 auto; height: ${data.height}; display: flex; align-items: center; justify-content: center; border: 2px dashed #d1d5db; border-radius: 8px; color: #9ca3af;">
    비디오 URL을 입력하세요
  </div>
</div>`
  }

  const videoId = data.videoType === 'youtube'
    ? data.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    : null

  if (data.videoType === 'youtube') {
    if (videoId) {
      return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div style="max-width: 1140px; margin: 0 auto; height: ${data.height};">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=${data.autoPlay ? 1 : 0}&mute=${data.muted ? 1 : 0}&loop=${data.loop ? 1 : 0}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>`
    } else {
      return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div style="max-width: 1140px; margin: 0 auto; height: ${data.height}; display: flex; align-items: center; justify-content: center; border: 2px dashed #d1d5db; border-radius: 8px; color: #9ca3af;">
    유효하지 않은 YouTube URL입니다
  </div>
</div>`
    }
  }

  return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div style="max-width: 1140px; margin: 0 auto; height: ${data.height};">
    <video width="100%" height="100%" controls ${data.autoPlay ? 'autoplay' : ''} ${data.muted ? 'muted' : ''} ${data.loop ? 'loop' : ''} style="object-fit: cover;">
      <source src="${data.videoUrl}">
    </video>
  </div>
</div>`
}

function generateDividerHTML(comp: Extract<Component, { type: 'divider' }>): string {
  const { data } = comp
  return `<div style="width: 100%; background-color: ${data.backgroundColor}; height: ${data.height}; display: flex; align-items: center; justify-content: center;">
  ${data.showLine ? `<div style="max-width: 1140px; width: 100%; padding: 0 20px;"><div style="width: 100%; height: ${data.lineWidth}; background-color: ${data.lineColor}; border-style: ${data.lineStyle};"></div></div>` : ''}
</div>`
}

function generateGridHTML(comp: Extract<Component, { type: 'grid' }>): string {
  const { data } = comp
  return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div style="max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: repeat(${data.columns}, 1fr); gap: ${data.gap};">
    ${data.items.map(item => `<div style="background-color: ${data.itemBackgroundColor}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center;">
      <div style="width: ${data.iconSize}; height: ${data.iconSize}; margin-bottom: 16px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">${item.title}</h3>
      <p style="font-size: 14px; color: #666;">${item.description}</p>
    </div>`).join('\n    ')}
  </div>
</div>`
}

export default App
