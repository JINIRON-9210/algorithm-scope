export function* insertionSort(input) {
  const arr = [...input];
  const n = arr.length;

  // limit 앞쪽은 "정렬된 구간"으로 회색 표시
  const prefix = (limit, extra = {}) => {
    const m = {};
    for (let k = 0; k < limit; k++) m[k] = 'sorted';
    return { ...m, ...extra };
  };

  yield { array: [...arr], marks: prefix(1), message: '첫 번째 값은 그 자체로 정렬된 상태로 봅니다.' };

  for (let i = 1; i < n; i++) {
    let j = i;
    yield {
      array: [...arr],
      marks: prefix(i, { [i]: 'active' }),
      message: `${arr[i]}을(를) 앞쪽 정렬된 구간의 알맞은 자리에 끼워 넣습니다.`,
    };

    while (j > 0) {
      yield {
        array: [...arr],
        marks: prefix(i + 1, { [j - 1]: 'compare', [j]: 'active' }),
        message: `${arr[j - 1]}, ${arr[j]}를 비교합니다.`,
      };

      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        j--;
        yield {
          array: [...arr],
          marks: prefix(i + 1, { [j]: 'active', [j + 1]: 'swap' }),
          message: '앞쪽 값이 더 크므로 한 칸 앞으로 이동합니다.',
        };
      } else {
        break;
      }
    }
  }

  yield { array: [...arr], marks: prefix(n), message: '정렬이 완료되었습니다.' };
}