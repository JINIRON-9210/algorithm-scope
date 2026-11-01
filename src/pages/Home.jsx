import { useState } from 'react'
import { ALGORITHMS, CATEGORIES } from '../data/algorithms'
import { matches } from '../utils/hangul'

export default function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = ALGORITHMS.filter(
    (a) =>
      (category === 'all' || a.category === category) &&
      matches(query, a.name, a.english, a.summary)
  )

  const groups = CATEGORIES.map((c) => ({
    ...c,
    items: filtered.filter((a) => a.category === c.id),
  })).filter((g) => g.items.length > 0)

  const tabs = [{ id: 'all', name: '전체' }, ...CATEGORIES]

  return (
    <div>
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold">눈으로 배우는 알고리즘</h1>
        <p className="mt-2 text-slate-600">
          알고리즘이 동작하는 과정을 한 단계씩 멈춰가며 확인해 보세요.
        </p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색 (예: 버블, ㅂㅂ, sort)"
          className="mt-6 w-full max-w-md px-4 py-3 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((c) => {
          const count =
            c.id === 'all'
              ? ALGORITHMS.length
              : ALGORITHMS.filter((a) => a.category === c.id).length
          return (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-full text-sm ${
                category === c.id ? 'bg-slate-800 text-white' : 'bg-white border'
              }`}
            >
              {c.name} <span className="opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      {groups.length === 0 ? (
        <p className="text-center text-slate-500 py-12">
          {query ? `'${query}'에 해당하는 알고리즘이 없습니다.` : '이 분류에는 아직 알고리즘이 없습니다.'}
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.id} className="mb-8">
            <h2 className="text-xl font-semibold">{g.name}</h2>
            <p className="text-sm text-slate-500 mb-3">{g.description}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((a) => (
                <a
                  key={a.id}
                  href={`#/${a.id}`}
                  className="block bg-white rounded-xl p-4 border shadow-sm hover:border-blue-400 hover:shadow transition"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{a.name}</h3>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                  <p className="text-xs text-slate-400">{a.english}</p>
                  <p className="mt-2 text-sm text-slate-600">{a.summary}</p>
                </a>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}