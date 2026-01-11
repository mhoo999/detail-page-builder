export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">상세페이지 빌더</h1>
            <button
              onClick={onStart}
              className="px-4 py-2 bg-black text-white border border-black hover:bg-gray-800"
            >
              시작하기
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">
              상세페이지를 쉽게 만드세요
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              드래그 앤 드롭으로 간편하게 상세페이지를 제작하고 HTML로 내보낼 수 있습니다
            </p>
            <button
              onClick={onStart}
              className="px-8 py-4 bg-black text-white text-lg border border-black hover:bg-gray-800"
            >
              시작하기
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <div className="border border-black p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-black mb-3">빠른 제작</h3>
              <p className="text-gray-600">
                직관적인 드래그 앤 드롭 인터페이스로 빠르게 상세페이지를 만들 수 있습니다
              </p>
            </div>
            <div className="border border-black p-8">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-black mb-3">다양한 컴포넌트</h3>
              <p className="text-gray-600">
                히어로, 슬라이더, 비디오, 그리드 등 다양한 컴포넌트를 제공합니다
              </p>
            </div>
            <div className="border border-black p-8">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold text-black mb-3">HTML 내보내기</h3>
              <p className="text-gray-600">
                완성된 페이지를 HTML 파일로 내보내어 바로 사용할 수 있습니다
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
          <p>© 2024 상세페이지 빌더. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  )
}
