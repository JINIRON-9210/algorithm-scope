import { bubbleSort } from '../algorithms/bubbleSort'

export const randomArray = (n = 12, min = 10, max = 99) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min)

export const CATEGORIES = [
  { id: 'sorting', name: '정렬', description: '흩어진 데이터를 크기 순서대로 나열하는 방법' },
  { id: 'searching', name: '탐색', description: '데이터 속에서 원하는 값을 찾아내는 방법' },
  { id: 'data-structure', name: '자료구조', description: '데이터를 담고 꺼내는 규칙' },
]

export const ALGORITHMS = [
  {
    id: 'bubble-sort',
    name: '버블 정렬',
    english: 'Bubble Sort',
    category: 'sorting',
    summary: '이웃한 두 값을 비교해 큰 값을 뒤로 보내는 정렬',
    description:
      '앞에서부터 이웃한 두 값을 비교해 앞쪽이 더 크면 자리를 바꿉니다. 한 바퀴 돌 때마다 가장 큰 값이 맨 뒤로 이동하며, 이 모습이 거품이 떠오르는 것 같다고 해서 버블 정렬이라 부릅니다.',
    time: 'O(n²)',
    space: 'O(1)',
    run: bubbleSort,
    createInput: () => randomArray(12),
  },
]