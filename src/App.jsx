import { useState } from 'react'
import Visualizer from './components/Visualizer'
import { bubbleSort } from './algorithms/bubbleSort'

const randomArray = (n = 12) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10)

function App() {
  const [input, setInput] = useState(() => randomArray())
  const [seed, setSeed] = useState(0)

  const shuffle = () => {
    setInput(randomArray())
    setSeed((s) => s + 1)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AlgorithmScope</h1>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">버블 정렬</h2>
          <button className="px-3 py-2 rounded bg-white shadow" onClick={shuffle}>🎲 새 배열</button>
        </div>
        <Visualizer key={seed} algorithm={bubbleSort} input={input} />
      </div>
    </div>
  )
}

export default App