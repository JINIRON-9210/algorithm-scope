export function* shellSort(input) {
  const arr = [...input];
  const n = arr.length;

  // 같은 그룹(gap 간격으로 떨어진 값들)이 아니면 흐리게
  const group = (gap, idx, extra = {}) => {
    const m = {};
    for (let k = 0; k < n; k++) if (k % gap !== idx % gap) m[k] = 'dim';
    return { ...m, ...extra };
  };

  yield { array: [...arr], marks: {}, message: '셸 정렬을 시작합니다.' };

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield {
      array: [...arr],
      marks: {},
      message: `간격을 ${gap}(으)로 정하고, ${gap}칸씩 떨어진 값끼리 삽입 정렬합니다.`,
    };

    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap) {
        yield {
          array: [...arr],
          marks: group(gap, j, { [j - gap]: 'compare', [j]: 'compare' }),
          message: `${gap}칸 떨어진 ${arr[j - gap]}, ${arr[j]}를 비교합니다.`,
        };
        if (arr[j - gap] > arr[j]) {
          [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]];
          yield {
            array: [...arr],
            marks: group(gap, j, { [j - gap]: 'swap', [j]: 'swap' }),
            message: '앞쪽 값이 더 크므로 자리를 바꿉니다.',
          };
          j -= gap;
        } else {
          break;
        }
      }
    }
  }

  const done = {};
  for (let k = 0; k < n; k++) done[k] = 'sorted';
  yield { array: [...arr], marks: done, message: '정렬이 완료되었습니다.' };
}