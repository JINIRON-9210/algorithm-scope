import { useEffect, useState } from 'react'
import Home from './pages/Home'
import AlgorithmPage from './pages/AlgorithmPage'

const getRoute = () => window.location.hash.replace(/^#\/?/, '')

function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#/" className="text-xl font-bold">
            Algorithm<span className="text-blue-600">Scope</span>
          </a>
          <span className="hidden sm:block text-sm text-slate-500">눈으로 배우는 알고리즘·자료구조</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {route ? <AlgorithmPage key={route} id={route} /> : <Home />}
      </main>
    </div>
  )
}

export default App