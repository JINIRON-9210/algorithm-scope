import { useState } from 'react'
import { bubbleSort } from './bubbleSort'

const INPUT = [7, 3, 9, 1, 5, 8, 2, 6]
const steps = [...bubbleSort(INPUT)]

function App() {
  const [idx, setIdx] = useState(0)
  const step = steps[idx]

  const colorOf = (i) => {
    if (i >= step.sortedFrom) return '#94a3b8'
    if (step.swapped?.includes(i)) return '#ef4444'
    if (step.comparing?.includes(i)) return '#facc15'
    return '#3b82f6'
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">AlgorithmScope — 버블 정렬</h1>

      <svg viewBox="0 0 400 200" className="w-full max-w-2xl border">
        {step.array.map((v, i) => (
          <rect
            key={i}
            x={i * 50 + 5}
            y={200 - v * 20}
            width={40}
            height={v * 20}
            fill={colorOf(i)}
          />
        ))}
      </svg>

      <div className="mt-6 flex gap-2 items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setIdx(Math.max(0, idx - 1))}
        >
          이전
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIdx(Math.min(steps.length - 1, idx + 1))}
        >
          다음
        </button>
        <span className="ml-4 text-gray-600">
          {idx + 1} / {steps.length}
        </span>
      </div>
    </div>
  )
}

export default App