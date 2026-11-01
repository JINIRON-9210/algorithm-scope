export function* quickSort(input) {
  const arr = [...input];
  const n = arr.length;
  const sorted = new Set();

  // 확정된 자리는 회색, 지금 구간 바깥은 흐리게
  const focus = (lo, hi, extra = {}) => {
    const m = {};
    for (let k = 0; k < n; k++) {
      if (sorted.has(k)) m[k] = 'sorted';
      else if (k < lo || k > hi) m[k] = 'dim';
    }
    return { ...m, ...extra };
  };

  function* qs(lo, hi) {
    if (lo > hi) return;
    if (lo === hi) {
      sorted.add(lo);
      yield {
        array: [...arr],
        marks: focus(lo, hi),
        message: `값이 하나뿐인 구간이라 ${arr[lo]}은(는) 그대로 확정됩니다.`,
      };
      return;
    }

    const pivot = arr[hi];
    yield {
      array: [...arr],
      marks: focus(lo, hi, { [hi]: 'pivot' }),
      message: `맨 끝 값 ${pivot}을(를) 기준(피벗)으로 정합니다.`,
    };

    let i = lo;
    for (let j = lo; j < hi; j++) {
      yield {
        array: [...arr],
        marks: focus(lo, hi, { [hi]: 'pivot', [i]: 'active', [j]: 'compare' }),
        message: `${arr[j]}, 피벗 ${pivot}을(를) 비교합니다.`,
      };
      if (arr[j] < pivot) {
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          yield {
            array: [...arr],
            marks: focus(lo, hi, { [hi]: 'pivot', [i]: 'swap', [j]: 'swap' }),
            message: `피벗보다 작은 ${arr[i]}을(를) 앞쪽으로 보냅니다.`,
          };
        }
        i++;
      }
    }

    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    sorted.add(i);
    yield {
      array: [...arr],
      marks: focus(lo, hi, { [i]: 'pivot' }),
      message: `피벗 ${pivot}이(가) ${i}번 자리로 확정됩니다. 왼쪽은 작은 값, 오른쪽은 큰 값입니다.`,
    };

    yield* qs(lo, i - 1);
    yield* qs(i + 1, hi);
  }

  yield { array: [...arr], marks: {}, message: '퀵 정렬을 시작합니다.' };
  yield* qs(0, n - 1);

  const done = {};
  for (let k = 0; k < n; k++) done[k] = 'sorted';
  yield { array: [...arr], marks: done, message: '정렬이 완료되었습니다.' };
}