import { bubbleSort } from '../algorithms/bubbleSort'
import { selectionSort } from '../algorithms/selectionSort'
import { insertionSort } from '../algorithms/insertionSort'
import { mergeSort } from '../algorithms/mergeSort'
import { quickSort } from '../algorithms/quickSort'
import { heapSort } from '../algorithms/heapSort'
import { shellSort } from '../algorithms/shellSort'
import { linearSearch } from '../algorithms/linearSearch'
import { binarySearch } from '../algorithms/binarySearch'
import { stack } from '../algorithms/stack'
import { queue } from '../algorithms/queue'

export const randomArray = (n = 12, min = 10, max = 99) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min)

// 중복 없는 값 n개 (이진 탐색은 정렬된 상태로)
export const uniqueArray = (n = 12) => {
  const pool = Array.from({ length: 90 }, (_, i) => i + 10)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, n)
}

// 80% 확률로 배열 안의 값, 20%는 없는 값을 찾게 함
const pickTarget = (array) => {
  if (Math.random() < 0.8) return array[Math.floor(Math.random() * array.length)]
  let t
  do t = Math.floor(Math.random() * 90) + 10
  while (array.includes(t))
  return t
}

export const searchInput = (sorted) => () => {
  const array = uniqueArray(12)
  if (sorted) array.sort((a, b) => a - b)
  return { array, target: pickTarget(array) }
}

// push/pop 연산 순서를 무작위로 생성 (비어 있을 땐 항상 push)
export const randomStackOps = (count = 12) => {
  const ops = []
  let size = 0
  for (let i = 0; i < count; i++) {
    if (size === 0 || Math.random() < 0.6) {
      ops.push({ type: 'push', value: Math.floor(Math.random() * 90) + 10 })
      size++
    } else {
      ops.push({ type: 'pop' })
      size--
    }
  }
  return ops
}

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
  {
    id: 'selection-sort',
    name: '선택 정렬',
    english: 'Selection Sort',
    category: 'sorting',
    summary: '남은 값 중 가장 작은 값을 골라 앞에서부터 채우는 정렬',
    description:
      '정렬되지 않은 구간 전체를 훑어 가장 작은 값을 찾고, 그 값을 구간의 맨 앞과 맞바꿉니다. 이 과정을 반복하면 앞에서부터 차례로 자리가 확정됩니다. 교환 횟수는 적지만 비교 횟수는 항상 많습니다.',
    time: 'O(n²)',
    space: 'O(1)',
    run: selectionSort,
    createInput: () => randomArray(12),
  },
  {
    id: 'insertion-sort',
    name: '삽입 정렬',
    english: 'Insertion Sort',
    category: 'sorting',
    summary: '값을 하나씩 꺼내 앞쪽 정렬된 구간의 알맞은 자리에 끼워 넣는 정렬',
    description:
      '카드 게임에서 손에 든 카드를 정리하는 방식과 같습니다. 두 번째 값부터 하나씩 꺼내 앞쪽 정렬된 구간과 비교하며, 자기보다 큰 값을 만날 때마다 한 칸씩 앞으로 이동합니다. 거의 정렬된 데이터에서는 매우 빠릅니다.',
    time: 'O(n²)',
    space: 'O(1)',
    run: insertionSort,
    createInput: () => randomArray(12),
  },
  {
    id: 'merge-sort',
    name: '병합 정렬',
    english: 'Merge Sort',
    category: 'sorting',
    summary: '반으로 계속 나눈 뒤, 정렬된 조각끼리 합쳐 나가는 정렬',
    description:
      '배열을 더 이상 나눌 수 없을 때까지 반으로 쪼갠 뒤, 정렬된 두 조각의 앞부분을 비교하며 작은 값부터 차례로 합칩니다. 데이터 상태와 상관없이 항상 일정한 속도를 내지만, 합치는 과정에서 추가 메모리가 필요합니다.',
    time: 'O(n log n)',
    space: 'O(n)',
    run: mergeSort,
    createInput: () => randomArray(12),
  },
  {
    id: 'quick-sort',
    name: '퀵 정렬',
    english: 'Quick Sort',
    category: 'sorting',
    summary: '기준값(피벗)보다 작은 값과 큰 값으로 나눠 가며 정렬',
    description:
      '기준값 하나를 정해, 그보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 모읍니다. 그러면 기준값의 자리가 확정되고, 양쪽 구간에 같은 방법을 반복합니다. 평균적으로 가장 빠른 정렬 중 하나지만, 기준값을 잘못 고르면 O(n²)까지 느려집니다.',
    time: 'O(n log n)',
    space: 'O(log n)',
    run: quickSort,
    createInput: () => randomArray(12),
  },
  {
    id: 'heap-sort',
    name: '힙 정렬',
    english: 'Heap Sort',
    category: 'sorting',
    summary: '가장 큰 값이 맨 위에 오는 힙 구조를 이용해 큰 값부터 뒤로 보내는 정렬',
    description:
      '배열을 "부모가 항상 자식보다 큰" 트리 구조(최대 힙)로 만듭니다. 배열의 i번 값의 자식은 2i+1번과 2i+2번입니다. 맨 위(0번)가 항상 가장 큰 값이므로, 이를 맨 뒤로 보내 확정하고 남은 부분을 다시 힙으로 정리하는 과정을 반복합니다.',
    time: 'O(n log n)',
    space: 'O(1)',
    run: heapSort,
    createInput: () => randomArray(12),
  },
  {
    id: 'shell-sort',
    name: '셸 정렬',
    english: 'Shell Sort',
    category: 'sorting',
    summary: '멀리 떨어진 값끼리 먼저 정리한 뒤, 간격을 줄여 가며 마무리하는 정렬',
    description:
      '삽입 정렬은 값이 한 칸씩만 움직여 느리다는 약점이 있습니다. 셸 정렬은 처음에 큰 간격으로 떨어진 값끼리 삽입 정렬해 값들을 대략적인 위치로 빠르게 옮기고, 간격을 절반씩 줄여 가다 마지막에 간격 1로 일반 삽입 정렬을 합니다.',
    time: 'O(n^1.5)',
    space: 'O(1)',
    run: shellSort,
    createInput: () => randomArray(12),
  },
  {
    id: 'linear-search',
    name: '선형 탐색',
    english: 'Linear Search',
    category: 'searching',
    summary: '처음부터 끝까지 하나씩 확인하며 원하는 값을 찾는 방법',
    description:
      '가장 단순한 탐색 방법으로, 배열의 처음부터 끝까지 차례로 값을 확인합니다. 데이터가 정렬되어 있지 않아도 쓸 수 있지만, 최악의 경우 모든 값을 확인해야 합니다.',
    time: 'O(n)',
    space: 'O(1)',
    run: linearSearch,
    createInput: searchInput(false),
  },
  {
    id: 'binary-search',
    name: '이진 탐색',
    english: 'Binary Search',
    category: 'searching',
    summary: '정렬된 배열에서 가운데 값을 기준으로 범위를 절반씩 줄여 찾는 방법',
    description:
      '정렬된 배열의 가운데 값을 찾는 값과 비교해, 찾는 값이 더 크면 오른쪽 절반만, 작으면 왼쪽 절반만 남깁니다. 한 번 비교할 때마다 범위가 절반으로 줄어 매우 빠르지만, 배열이 반드시 정렬되어 있어야 합니다.',
    time: 'O(log n)',
    space: 'O(1)',
    run: binarySearch,
    createInput: searchInput(true),
  },
  {
    id: 'stack',
    name: '스택',
    english: 'Stack',
    category: 'data-structure',
    summary: '나중에 넣은 값을 먼저 꺼내는 자료구조 (LIFO)',
    description:
      '접시를 쌓는 것처럼, 값을 넣을 때(push)도 꺼낼 때(pop)도 맨 위에서만 일어납니다. 그래서 가장 나중에 들어온 값이 가장 먼저 나갑니다(Last In, First Out). 웹 브라우저의 뒤로 가기, 실행 취소(Ctrl+Z), 함수 호출 관리 등에 쓰입니다.',
    time: 'O(1)',
    space: 'O(n)',
    run: stack,
    createInput: () => randomStackOps(12),
  },
  {
    id: 'queue',
    name: '큐',
    english: 'Queue',
    category: 'data-structure',
    summary: '먼저 넣은 값을 먼저 꺼내는 자료구조 (FIFO)',
    description:
      '매표소 줄처럼, 새 값은 맨 뒤에 서고(enqueue) 꺼낼 때는 맨 앞에서 나갑니다(dequeue). 그래서 가장 먼저 들어온 값이 가장 먼저 나갑니다(First In, First Out). 프린터 인쇄 대기열, 메시지 처리 순서, 너비 우선 탐색(BFS) 등에 쓰입니다.',
    time: 'O(1)',
    space: 'O(n)',
    run: queue,
    createInput: () => randomStackOps(12),
  },
]

