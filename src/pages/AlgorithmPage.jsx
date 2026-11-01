import { useState } from 'react'
import Visualizer from '../components/Visualizer'
import { ALGORITHMS, CATEGORIES } from '../data/algorithms'

export default function AlgorithmPage({ id }) {
  const algo = ALGORITHMS.find((a) => a.id === id)
  const [input, setInput] = useState(() => algo?.createInput())
  const [seed, setSeed] = useState(0)

  if (!algo) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600">해당 알고리즘을 찾을 수 없습니다.</p>
        <a href="#/" className="mt-4 inline-block text-blue-600">← 목록으로</a>
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.id === algo.category)

  const shuffle = () => {
    setInput(algo.createInput())
    setSeed((s) => s + 1)
  }

  return (
    <div>
      <a href="#/" className="text-sm text-slate-500 hover:text-blue-600">← 목록으로</a>

      <div className="mt-3 mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{category?.name}</span>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold">{algo.name}</h1>
          <p className="text-sm text-slate-400">{algo.english}</p>
        </div>
        <button className="px-3 py-2 rounded bg-white border shadow-sm" onClick={shuffle}>
          🎲 새 데이터
        </button>
      </div>

      <Visualizer key={seed} algorithm={algo.run} input={input} />

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-3 bg-white rounded-xl border p-4">
          <h2 className="font-semibold mb-1">개념</h2>
          <p className="text-slate-600 leading-relaxed">{algo.description}</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <h2 className="font-semibold">시간 복잡도</h2>
          <p className="text-2xl mt-1 font-mono">{algo.time}</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <h2 className="font-semibold">공간 복잡도</h2>
          <p className="text-2xl mt-1 font-mono">{algo.space}</p>
        </div>
      </div>
    </div>
  )
}