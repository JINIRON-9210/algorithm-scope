export function* bubbleSort(input) {
  const arr = [...input];
  const n = arr.length;
  const sorted = new Set();

  const withSorted = (extra = {}) => {
    const m = {};
    sorted.forEach((i) => (m[i] = 'sorted'));
    return { ...m, ...extra };
  };

  yield { array: [...arr], marks: withSorted(), message: '버블 정렬을 시작합니다.' };

  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      yield {
        array: [...arr],
        marks: withSorted({ [j]: 'compare', [j + 1]: 'compare' }),
        message: `${arr[j]}, ${arr[j + 1]}를 비교합니다.`,
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield {
          array: [...arr],
          marks: withSorted({ [j]: 'swap', [j + 1]: 'swap' }),
          message: `앞쪽이 더 크므로 자리를 바꿉니다.`,
        };
      }
    }
    sorted.add(i);
  }
  sorted.add(0);

  yield { array: [...arr], marks: withSorted(), message: '정렬이 완료되었습니다.' };
}