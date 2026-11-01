export function* mergeSort(input) {
  const arr = [...input];
  const n = arr.length;

  // 지금 다루는 구간 바깥은 흐리게
  const focus = (lo, hi, extra = {}) => {
    const m = {};
    for (let k = 0; k < n; k++) if (k < lo || k > hi) m[k] = 'dim';
    return { ...m, ...extra };
  };

  // from~to 구간에 같은 색 칠하기
  const range = (from, to, mark) => {
    const m = {};
    for (let k = from; k <= to; k++) m[k] = mark;
    return m;
  };

  function* sort(lo, hi) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    yield {
      array: [...arr],
      marks: focus(lo, hi),
      message: `${lo}~${hi}번 구간을 ${lo}~${mid}번 / ${mid + 1}~${hi}번으로 나눕니다.`,
    };
    yield* sort(lo, mid);
    yield* sort(mid + 1, hi);
    yield* merge(lo, mid, hi);
  }

  function* merge(lo, mid, hi) {
    let i = lo;
    let j = mid + 1;

    while (i <= mid && j <= hi) {
      yield {
        array: [...arr],
        marks: focus(lo, hi, { [i]: 'compare', [j]: 'compare' }),
        message: `왼쪽 묶음의 ${arr[i]}, 오른쪽 묶음의 ${arr[j]}를 비교합니다.`,
      };

      if (arr[i] <= arr[j]) {
        i++;
      } else {
        // 오른쪽 값을 꺼내 i번 자리에 끼우고, 사이 값들은 한 칸씩 뒤로
        const [value] = arr.splice(j, 1);
        arr.splice(i, 0, value);
        yield {
          array: [...arr],
          marks: focus(lo, hi, { ...range(i + 1, j, 'active'), [i]: 'swap' }),
          message: `${value}이(가) 더 작으므로 앞으로 끼워 넣고, 주황색 값들은 한 칸씩 뒤로 밀립니다.`,
        };
        i++;
        mid++;
        j++;
      }
    }

    yield {
      array: [...arr],
      marks: focus(lo, hi, range(lo, hi, 'sorted')),
      message: `${lo}~${hi}번 구간이 정렬된 하나의 묶음이 되었습니다.`,
    };
  }

  yield { array: [...arr], marks: {}, message: '병합 정렬을 시작합니다.' };
  yield* sort(0, n - 1);
  yield { array: [...arr], marks: range(0, n - 1, 'sorted'), message: '정렬이 완료되었습니다.' };
}