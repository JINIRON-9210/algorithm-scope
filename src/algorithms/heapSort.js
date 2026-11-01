export function* heapSort(input) {
  const arr = [...input];
  const n = arr.length;
  const sorted = new Set();

  const withSorted = (extra = {}) => {
    const m = {};
    sorted.forEach((i) => (m[i] = 'sorted'));
    return { ...m, ...extra };
  };

  // root에서 시작해, 부모가 자식보다 작으면 아래로 내려보냄 (end는 포함 안 함)
  function* siftDown(start, end) {
    let root = start;
    while (true) {
      const left = 2 * root + 1;
      const right = left + 1;
      if (left >= end) return;

      let big = left;
      if (right < end && arr[right] > arr[left]) big = right;

      yield {
        array: [...arr],
        marks: withSorted({ [root]: 'active', [big]: 'compare' }),
        message: `부모 ${arr[root]}, 더 큰 자식 ${arr[big]}를 비교합니다.`,
      };

      if (arr[big] > arr[root]) {
        [arr[root], arr[big]] = [arr[big], arr[root]];
        yield {
          array: [...arr],
          marks: withSorted({ [root]: 'swap', [big]: 'swap' }),
          message: `자식이 더 크므로 부모와 자리를 바꿉니다.`,
        };
        root = big;
      } else {
        return;
      }
    }
  }

  yield {
    array: [...arr],
    marks: {},
    message: '먼저 배열을 최대 힙(부모가 항상 자식보다 큰 구조)으로 만듭니다.',
  };

  for (let s = Math.floor(n / 2) - 1; s >= 0; s--) {
    yield* siftDown(s, n);
  }

  yield {
    array: [...arr],
    marks: { 0: 'active' },
    message: `최대 힙 완성. 맨 앞의 ${arr[0]}이(가) 가장 큰 값입니다.`,
  };

  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    sorted.add(end);
    yield {
      array: [...arr],
      marks: withSorted({ 0: 'swap', [end]: 'swap' }),
      message: `가장 큰 값 ${arr[end]}을(를) ${end}번 자리로 보내 확정합니다.`,
    };
    yield* siftDown(0, end);
  }
  sorted.add(0);

  yield { array: [...arr], marks: withSorted(), message: '정렬이 완료되었습니다.' };
}