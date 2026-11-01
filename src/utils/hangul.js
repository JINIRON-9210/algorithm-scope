const CHOSUNG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

// 한글 완성형 글자 = 0xAC00 + (초성 × 588) + (중성 × 28) + 종성
// 이 공식을 거꾸로 계산해 초성만 뽑아냄
export function getChosung(text) {
  return [...text]
    .map((ch) => {
      const code = ch.charCodeAt(0) - 0xac00
      if (code < 0 || code > 11171) return ch
      return CHOSUNG[Math.floor(code / 588)]
    })
    .join('')
}

const isChosungOnly = (s) => /^[ㄱ-ㅎ]+$/.test(s)

export function matches(query, ...targets) {
  const q = query.toLowerCase().replace(/\s/g, '')
  if (!q) return true

  return targets.some((target, idx) => {
    const text = target.toLowerCase().replace(/\s/g, '')
    if (text.includes(q)) return true
    // 초성 검색은 첫 번째 대상(알고리즘 이름)에만 적용
    if (idx === 0 && isChosungOnly(q)) return getChosung(text).includes(q)
    return false
  })
}