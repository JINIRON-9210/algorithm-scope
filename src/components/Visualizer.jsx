import { useEffect, useMemo, useState } from 'react'

const COLORS = {
  default: '#3b82f6',
  compare: '#facc15',
  swap: '#ef4444',
  sorted: '#94a3b8',
  pivot: '#a855f7',
  found: '#22c55e',
  active: '#f97316',
  dim: '#e2e8f0',
}

const LABELS = {
  compare: '비교 중',
  swap: '교환',
  sorted: '정렬 완료',
  pivot: '기준(피벗)',
  found: '찾음',
  active: '현재 위치',
  dim: '탐색 제외',
}

const SPEEDS = [0.5, 1, 2, 4]

export default function Visualizer({ algorithm, input }) {
  const steps = useMemo(() => [...algorithm(input)], [algorithm, input])
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const last = steps.length - 1
  const atEnd = idx >= last
  const isPlaying = playing && !atEnd
  const step = steps[idx]

  // 자동 재생: isPlaying이면 일정 시간마다 idx를 1씩 올림
  useEffect(() => {
    if (!isPlaying) return
    const timer = setTimeout(() => setIdx((i) => i + 1), 500 / speed)
    return () => clearTimeout(timer)
  }, [isPlaying, idx, speed])

  const togglePlay = () => {
    if (atEnd) {
      setIdx(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  const go = (i) => {
    setPlaying(false)
    setIdx(Math.max(0, Math.min(last, i)))
  }

  // 이 알고리즘에서 실제로 쓰인 색상만 범례로 표시
  const usedMarks = useMemo(() => {
    const set = new Set()
    steps.forEach((s) => Object.values(s.marks || {}).forEach((m) => set.add(m)))
    return [...set]
  }, [steps])

  const n = step.array.length
  const maxVal = Math.max(...step.array, 1)
  const W = 600
  const H = 260
  const barW = W / n

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full">
        {step.array.map((v, i) => {
          const h = (v / maxVal) * (H - 20)
          const mark = step.marks?.[i] || 'default'
          return (
            <g key={i}>
              <rect
                x={i * barW + barW * 0.1}
                y={H - h}
                width={barW * 0.8}
                height={h}
                rx={3}
                fill={COLORS[mark]}
              />
              {n <= 20 && (
                <text
                  x={i * barW + barW / 2}
                  y={H + 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#475569"
                >
                  {v}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <p className="mt-3 min-h-6 text-center text-slate-700">{step.message}</p>

      <input
        type="range"
        min={0}
        max={last}
        value={idx}
        onChange={(e) => go(Number(e.target.value))}
        className="w-full mt-3"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button className="px-3 py-2 rounded bg-slate-200" onClick={() => go(0)}>⏮ 처음</button>
        <button className="px-3 py-2 rounded bg-slate-200" onClick={() => go(idx - 1)}>◀ 이전</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white w-24" onClick={togglePlay}>
          {isPlaying ? '⏸ 정지' : atEnd ? '↻ 다시' : '▶ 재생'}
        </button>
        <button className="px-3 py-2 rounded bg-slate-200" onClick={() => go(idx + 1)}>다음 ▶</button>

        <div className="ml-auto flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded text-sm ${speed === s ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
        <span>{idx + 1} / {steps.length} 단계</span>
        {usedMarks.map((m) => (
          <span key={m} className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS[m] }} />
            {LABELS[m]}
          </span>
        ))}
      </div>
    </div>
  )
}