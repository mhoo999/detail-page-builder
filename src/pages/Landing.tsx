import { useState, useEffect } from 'react'

interface SavedPage {
  id: string
  title: string
  content: { components: any[] }
  created_at: string
  updated_at: string
}

const STORAGE_KEY = 'detail-page-builder-pages'

function getPagesFromStorage(): SavedPage[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

interface LandingProps {
  onStart: () => void
  onLoadPage: (page: SavedPage) => void
  onDeletePage: (id: string) => void
}

export function Landing({ onStart, onLoadPage, onDeletePage }: LandingProps) {
  const [savedPages, setSavedPages] = useState<SavedPage[]>([])
  const [isLoadingPages, setIsLoadingPages] = useState(false)

  const loadPages = () => {
    setIsLoadingPages(true)
    try {
      const pages = getPagesFromStorage()
      setSavedPages(pages)
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setIsLoadingPages(false)
    }
  }

  useEffect(() => {
    loadPages()
  }, [])

  const handleDeletePage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('정말 이 페이지를 삭제하시겠습니까?')) return
    onDeletePage(id)
    loadPages()
  }

  const handleLoadPage = (page: SavedPage) => {
    onLoadPage(page)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-black">상세페이지 빌더</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 새로 만들기 카드 */}
            <div
              onClick={onStart}
              className="border-2 border-black p-8 cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center min-h-[200px]"
            >
              <div className="text-5xl mb-4">+</div>
              <h3 className="text-xl font-bold text-black">새로 만들기</h3>
              <p className="text-gray-600 mt-2 text-sm text-center">
                새로운 상세페이지를 만들기
              </p>
            </div>

            {/* 저장된 페이지 카드들 */}
            {isLoadingPages ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                로딩 중...
              </div>
            ) : savedPages.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                저장된 페이지가 없습니다.
              </div>
            ) : (
              savedPages.map((page) => (
                <div
                  key={page.id}
                  className="border border-black p-6 hover:bg-gray-50 flex flex-col"
                >
                  <h3 className="text-lg font-bold text-black mb-2 truncate">
                    {page.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-4 flex-1">
                    <div>컴포넌트 {page.content.components.length}개</div>
                    <div className="mt-1">
                      {new Date(page.updated_at).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLoadPage(page)
                      }}
                      className="flex-1 px-3 py-2 bg-black text-white border border-black hover:bg-gray-800 text-sm"
                    >
                      불러오기
                    </button>
                    <button
                      onClick={(e) => handleDeletePage(page.id, e)}
                      className="px-3 py-2 bg-white text-black border border-black hover:bg-gray-100 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="https://hoons-service-archive.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white border border-black hover:bg-gray-800"
            >
              다른 서비스 이용해보기
            </a>
            <a
              href="https://buymeacoffee.com/hoonsdev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white border border-black hover:bg-gray-800"
            >
              개발자 커피 한잔 사주기
            </a>
          </div>
          <div className="text-center text-gray-600 text-sm">
            mhoo999@naver.com
          </div>
        </div>
      </footer>
    </div>
  )
}
