import { useState } from 'react'
import { Landing } from './pages/Landing'
import { Builder } from './components/Builder'

interface SavedPage {
  id: string
  title: string
  content: { components: any[] }
  created_at: string
  updated_at: string
}

function App() {
  const [showBuilder, setShowBuilder] = useState(false)
  const [initialPage, setInitialPage] = useState<SavedPage | null>(null)

  const handleStart = () => {
    setInitialPage(null)
    setShowBuilder(true)
  }

  const handleLoadPage = (page: SavedPage) => {
    setInitialPage(page)
    setShowBuilder(true)
  }

  const handleDeletePage = (id: string) => {
    const STORAGE_KEY = 'detail-page-builder-pages'
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      const pages: SavedPage[] = data ? JSON.parse(data) : []
      const filteredPages = pages.filter(p => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPages))
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  if (showBuilder) {
    return <Builder initialPage={initialPage} onBack={() => setShowBuilder(false)} />
  }

  return (
    <Landing
      onStart={handleStart}
      onLoadPage={handleLoadPage}
      onDeletePage={handleDeletePage}
    />
  )
}

export default App
