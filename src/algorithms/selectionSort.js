export function* selectionSort(input) {
  const arr = [...input];
  const n = arr.length;
  const sorted = new Set();

  const withSorted = (extra = {}) => {
    const m = {};
    sorted.forEach((i) => (m[i] = 'sorted'));
    return { ...m, ...extra };
  };

  yield { array: [...arr], marks: withSorted(), message: '선택 정렬을 시작합니다.' };

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield {
      array: [...arr],
      marks: withSorted({ [i]: 'min' }),
      message: `${i + 1}번째 자리에 들어갈 가장 작은 값을 찾습니다.`,
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        array: [...arr],
        marks: withSorted({ [minIdx]: 'min', [j]: 'compare' }),
        message: `최솟값 후보 ${arr[minIdx]}, 비교 대상 ${arr[j]}`,
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield {
          array: [...arr],
          marks: withSorted({ [minIdx]: 'min' }),
          message: `더 작은 값 발견: ${arr[minIdx]}`,
        };
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield {
        array: [...arr],
        marks: withSorted({ [i]: 'swap', [minIdx]: 'swap' }),
        message: `가장 작은 값 ${arr[i]}을(를) ${i + 1}번째 자리로 옮깁니다.`,
      };
    }
    sorted.add(i);
  }
  sorted.add(n - 1);

  yield { array: [...arr], marks: withSorted(), message: '정렬이 완료되었습니다.' };
}