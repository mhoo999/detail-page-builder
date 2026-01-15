import { useState, useEffect, useRef } from 'react'
import { useBuilder } from '../hooks/useBuilder'
import { ComponentList } from './ComponentList'
import { Canvas } from './Canvas'
import { PropertyPanel } from './PropertyPanel'
import { Component } from '../types'

interface SavedPage {
  id: string
  title: string
  content: { components: Component[] }
  created_at: string
  updated_at: string
}

const STORAGE_KEY = 'detail-page-builder-pages'

// 로컬스토리지에서 페이지 목록 가져오기
function getPagesFromStorage(): SavedPage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

// 로컬스토리지에 페이지 목록 저장하기
function savePagesToStorage(pages: SavedPage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
    alert('저장 공간이 부족합니다. 일부 페이지를 삭제해주세요.')
  }
}

interface BuilderProps {
  initialPage?: SavedPage | null
  onBack?: () => void
}

export function Builder({ initialPage, onBack }: BuilderProps) {
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
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  
  const autoSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialMountRef = useRef(true)
  const savedMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const autoSave = (silent = false) => {
    if (!silent) {
      setIsSaving(true)
    }
    try {
      const pages = getPagesFromStorage()
      const now = new Date().toISOString()

      if (currentPageId) {
        // 기존 페이지 업데이트
        const pageIndex = pages.findIndex(p => p.id === currentPageId)
        if (pageIndex !== -1) {
          pages[pageIndex] = {
            ...pages[pageIndex],
            title: pageTitle,
            content: { components },
            updated_at: now,
          }
          savePagesToStorage(pages)
          if (!silent) {
            alert('페이지가 저장되었습니다!')
          }
        }
      } else {
        // 새 페이지 저장
        const newPage: SavedPage = {
          id: Date.now().toString(),
          title: pageTitle,
          content: { components },
          created_at: now,
          updated_at: now,
        }
        pages.unshift(newPage) // 최신 페이지를 맨 앞에 추가
        savePagesToStorage(pages)
        setCurrentPageId(newPage.id)
        if (!silent) {
          alert('페이지가 저장되었습니다!')
        }
      }

      // 저장 시간 업데이트
      setLastSavedAt(new Date())
      
      // 3초 후 저장 메시지 숨기기
      if (savedMessageTimeoutRef.current) {
        clearTimeout(savedMessageTimeoutRef.current)
      }
      savedMessageTimeoutRef.current = setTimeout(() => {
        setLastSavedAt(null)
      }, 3000)

      // 페이지 목록 새로고침
      if (!silent) {
        loadPages()
      }
    } catch (error) {
      console.error('Error saving page:', error)
      if (!silent) {
        alert('저장 중 오류가 발생했습니다.')
      }
    } finally {
      if (!silent) {
        setIsSaving(false)
      }
    }
  }

  const handleSave = () => {
    autoSave(false)
  }

  const loadPages = () => {
    setIsLoadingPages(true)
    try {
      const pages = getPagesFromStorage()
      setSavedPages(pages)
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
    // 불러온 페이지에서도 수정 가능하도록 초기 마운트 플래그 해제
    isInitialMountRef.current = false
  }

  const deletePage = (id: string) => {
    if (!confirm('정말 이 페이지를 삭제하시겠습니까?')) return

    try {
      const pages = getPagesFromStorage()
      const filteredPages = pages.filter(p => p.id !== id)
      savePagesToStorage(filteredPages)

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
    loadPages()
    if (initialPage) {
      setComponents(initialPage.content.components)
      setPageTitle(initialPage.title)
      setCurrentPageId(initialPage.id)
      selectComponent(null)
      // 불러온 페이지에서도 수정 가능하도록 초기 마운트 플래그 해제
      isInitialMountRef.current = false
    } else {
      // 새 페이지인 경우 초기 마운트 완료 표시
      setTimeout(() => {
        isInitialMountRef.current = false
      }, 100)
    }
  }, [initialPage])

  // 자동 저장: components 또는 pageTitle 변경 시 디바운스 적용
  useEffect(() => {
    // 초기 마운트 시에는 자동 저장하지 않음
    if (isInitialMountRef.current) {
      return
    }

    // 디바운스: 2초 후 자동 저장
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      // 컴포넌트가 하나라도 있거나, 페이지 제목이 기본값이 아니면 저장
      if (components.length > 0 || pageTitle !== '새 페이지') {
        autoSave(true)
      }
    }, 2000)

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [components, pageTitle, currentPageId])

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-black px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 bg-black text-white rounded-none hover:bg-gray-800 border border-black"
              >
                ← 뒤로
              </button>
            )}
            <h1 className="text-2xl font-bold text-black">상세페이지 빌더</h1>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="px-3 py-1 border border-black rounded-none focus:outline-none focus:ring-0"
              placeholder="페이지 제목"
            />
            {lastSavedAt && (
              <span className="text-sm text-gray-500">저장됨</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={createNewPage}
              className="px-4 py-2 bg-black text-white rounded-none hover:bg-gray-800 border border-black"
            >
              새 페이지
            </button>
            <button
              onClick={() => setShowPageList(!showPageList)}
              className="px-4 py-2 bg-black text-white rounded-none hover:bg-gray-800 border border-black"
            >
              페이지 관리
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-black text-white rounded-none hover:bg-gray-800 border border-black disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={handleExportHTML}
              className="px-4 py-2 bg-black text-white rounded-none hover:bg-gray-800 border border-black"
            >
              HTML 내보내기
            </button>
          </div>
        </div>
      </header>

      {/* Page List Modal */}
      {showPageList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-black w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-black flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">저장된 페이지</h2>
              <button
                onClick={() => setShowPageList(false)}
                className="text-black hover:text-gray-600 text-2xl"
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
                      className={`border border-black p-4 hover:bg-gray-50 ${
                        currentPageId === page.id ? 'border-2 border-black bg-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-black">{page.title}</h3>
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
                            className="px-3 py-1 bg-black text-white border border-black hover:bg-gray-800 text-sm"
                          >
                            불러오기
                          </button>
                          <button
                            onClick={() => deletePage(page.id)}
                            className="px-3 py-1 bg-white text-black border border-black hover:bg-gray-100 text-sm"
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
      case 'table':
        return generateTableHTML(comp)
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
      ${data.showTitle ? `<h1 style="font-size: ${data.titleSize.includes('px') ? data.titleSize : `${data.titleSize}px`}; font-weight: ${data.titleWeight}; color: ${data.titleColor}; margin-bottom: 16px; white-space: pre-wrap;">${data.title}</h1>` : ''}
      ${data.showDescription ? `<p style="font-size: ${data.descriptionSize.includes('px') ? data.descriptionSize : `${data.descriptionSize}px`}; font-weight: ${data.descriptionWeight}; color: ${data.descriptionColor}; margin-bottom: 24px; line-height: 1.6; white-space: pre-wrap; text-align: ${data.descriptionAlign}; letter-spacing: ${data.descriptionLetterSpacing.includes('px') ? data.descriptionLetterSpacing : `${data.descriptionLetterSpacing}px`};">${data.description}</p>` : ''}
      ${data.showDescriptionImage && data.descriptionImage ? `<div style="margin-bottom: 24px;"><img src="${data.descriptionImage}" alt="Description" style="max-width: 100%; height: auto; border-radius: 8px;"></div>` : ''}
      ${data.showButton ? `<button style="background-color: ${data.buttonBgColor}; color: ${data.buttonColor}; font-size: ${data.buttonSize.includes('px') ? data.buttonSize : `${data.buttonSize}px`}; font-weight: ${data.buttonWeight}; padding: 12px 32px; border-radius: 8px; border: none; cursor: pointer;">${data.buttonText}</button>` : ''}
    </div>
  </div>
</div>`
}

function generateSliderHTML(comp: Extract<Component, { type: 'slider' }>): string {
  const { data } = comp
  
  // 고유한 슬라이더 ID 생성
  const sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`
  
  const imagesHTML = data.images.map((img, i) => 
    `<img src="${img}" alt="Slide ${i + 1}" class="slider-image-${sliderId}" data-index="${i}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${i === 0 ? 1 : 0}; transition: opacity 0.5s ease-in-out;">`
  ).join('\n    ')
  
  const prevButton = data.images.length > 1 ? `
    <button class="slider-prev-${sliderId}" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background-color: transparent; color: white; border: none; padding: 15px 20px; cursor: pointer; font-size: 48px; font-weight: bold; line-height: 1; text-shadow: 0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5); z-index: 10;">‹</button>
  ` : ''
  
  const nextButton = data.images.length > 1 ? `
    <button class="slider-next-${sliderId}" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background-color: transparent; color: white; border: none; padding: 15px 20px; cursor: pointer; font-size: 48px; font-weight: bold; line-height: 1; text-shadow: 0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5); z-index: 10;">›</button>
  ` : ''
  
  const indicators = data.showIndicators && data.images.length > 1 ? `
    <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10;">
      ${data.images.map((_, i) => `<div class="slider-indicator-${sliderId}" data-index="${i}" style="width: 10px; height: 10px; border-radius: 50%; background-color: ${i === 0 ? 'white' : 'rgba(255,255,255,0.5)'}; cursor: pointer;"></div>`).join('\n      ')}
    </div>
  ` : ''
  
  // 각 슬라이더마다 독립적인 JavaScript 코드 생성
  const script = `
    <script>
      (function() {
        let currentIndex = 0;
        const slider = document.getElementById('${sliderId}');
        if (!slider) return;
        
        const images = slider.querySelectorAll('.slider-image-${sliderId}');
        const indicators = slider.querySelectorAll('.slider-indicator-${sliderId}');
        const prevBtn = slider.querySelector('.slider-prev-${sliderId}');
        const nextBtn = slider.querySelector('.slider-next-${sliderId}');
        
        if (images.length === 0) return;
        
        function updateSlider(index) {
          images.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0';
          });
          indicators.forEach((ind, i) => {
            ind.style.backgroundColor = i === index ? 'white' : 'rgba(255,255,255,0.5)';
          });
          currentIndex = index;
        }
        
        function changeSlide(direction) {
          const newIndex = (currentIndex + direction + images.length) % images.length;
          updateSlider(newIndex);
        }
        
        function goToSlide(index) {
          updateSlider(index);
        }
        
        // 버튼 이벤트 리스너
        if (prevBtn) {
          prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            changeSlide(-1);
          });
        }
        
        if (nextBtn) {
          nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            changeSlide(1);
          });
        }
        
        // 인디케이터 이벤트 리스너
        indicators.forEach((ind, index) => {
          ind.addEventListener('click', function(e) {
            e.stopPropagation();
            goToSlide(index);
          });
        });
        
        // 자동 재생
        ${data.autoPlay && data.images.length > 1 ? `
        let autoPlayInterval = setInterval(function() {
          changeSlide(1);
        }, ${data.interval});
        
        // 마우스 호버 시 자동 재생 일시 정지
        slider.addEventListener('mouseenter', function() {
          clearInterval(autoPlayInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
          autoPlayInterval = setInterval(function() {
            changeSlide(1);
          }, ${data.interval});
        });
        ` : ''}
      })();
    </script>
  `
  
  return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px;">
  <div id="${sliderId}" style="max-width: ${data.imageWidth}; margin: 0 auto; height: ${data.height}; position: relative; overflow: hidden; border-radius: 8px;">
    ${imagesHTML}
    ${prevButton}
    ${nextButton}
    ${indicators}
  </div>
  ${script}
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
  const heightStyle = data.height && data.height !== 'auto' ? `min-height: ${data.height};` : ''
  return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px; ${heightStyle}">
  <div style="max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: repeat(${data.columns}, 1fr); gap: ${data.gap};">
    ${data.items.map(item => `<div style="background-color: ${data.itemBackgroundColor}; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center;">
      <div style="width: ${data.iconSize}; height: ${data.iconSize}; margin-bottom: 16px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px; white-space: pre-wrap;">${item.title}</h3>
      <p style="font-size: 14px; color: #666;">${item.description}</p>
    </div>`).join('\n    ')}
  </div>
</div>`
}

function generateTableHTML(comp: Extract<Component, { type: 'table' }>): string {
  const { data } = comp
  const heightStyle = data.height && data.height !== 'auto' ? `min-height: ${data.height};` : ''
  
  const headerCells = data.columns.map(col => {
    const widthStyle = col.width && col.width !== 'auto' ? `width: ${col.width};` : ''
    const textAlign = col.textAlign || 'left'
    return `<th style="background-color: ${data.headerBackgroundColor}; color: ${data.headerTextColor}; padding: 12px; text-align: ${textAlign}; border: ${data.borderWidth} solid ${data.borderColor}; font-weight: 600; ${widthStyle}">${col.label}</th>`
  }).join('\n      ')
  
  const rows = data.rows.map(row => {
    const cells = row.cells.map((cell, cellIndex) => {
      const column = data.columns[cellIndex]
      const textAlign = column?.textAlign || 'left'
      return `<td style="background-color: ${data.cellBackgroundColor}; color: ${data.cellTextColor}; padding: 12px; border: ${data.borderWidth} solid ${data.borderColor}; white-space: pre-wrap; text-align: ${textAlign};">${cell}</td>`
    }).join('\n        ')
    return `<tr>
        ${cells}
      </tr>`
  }).join('\n      ')
  
  return `<div style="width: 100%; background-color: ${data.backgroundColor}; padding: 40px 20px; ${heightStyle}">
  <div style="max-width: 1140px; margin: 0 auto; overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; border: ${data.borderWidth} solid ${data.borderColor};">
      <thead>
        <tr>
      ${headerCells}
        </tr>
      </thead>
      <tbody>
      ${rows}
      </tbody>
    </table>
  </div>
</div>`
}
