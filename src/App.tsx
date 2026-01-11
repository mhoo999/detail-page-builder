import { useState } from 'react'
import { Landing } from './pages/Landing'
import { Builder } from './components/Builder'

function App() {
  const [showBuilder, setShowBuilder] = useState(false)

  if (showBuilder) {
    return <Builder />
  }

  return <Landing onStart={() => setShowBuilder(true)} />
}

export default App
