export function* binarySearch({ array, target }) {
  const arr = [...array];
  const n = arr.length;
  let lo = 0;
  let hi = n - 1;
  let count = 0;

  // 탐색 범위 바깥은 흐리게
  const range = (lo, hi, extra = {}) => {
    const m = {};
    for (let k = 0; k < n; k++) if (k < lo || k > hi) m[k] = 'dim';
    return { ...m, ...extra };
  };

  yield {
    array: arr,
    marks: {},
    message: `찾는 값: ${target} — 정렬된 배열이므로 가운데 값을 확인해 범위를 절반씩 줄입니다.`,
  };

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    count++;
    yield {
      array: arr,
      marks: range(lo, hi, { [mid]: 'compare' }),
      message: `${lo}~${hi}번의 가운데인 ${mid}번 값 ${arr[mid]}를 확인합니다.`,
    };

    if (arr[mid] === target) {
      yield {
        array: arr,
        marks: range(lo, hi, { [mid]: 'found' }),
        message: `찾았습니다! ${target}은(는) ${mid}번에 있습니다. (${count}번 비교)`,
      };
      return;
    }

    if (arr[mid] < target) {
      yield {
        array: arr,
        marks: range(mid + 1, hi),
        message: `${arr[mid]} < ${target} 이므로 왼쪽 절반을 버리고 오른쪽만 봅니다.`,
      };
      lo = mid + 1;
    } else {
      yield {
        array: arr,
        marks: range(lo, mid - 1),
        message: `${arr[mid]} > ${target} 이므로 오른쪽 절반을 버리고 왼쪽만 봅니다.`,
      };
      hi = mid - 1;
    }
  }

  const all = {};
  for (let k = 0; k < n; k++) all[k] = 'dim';
  yield { array: arr, marks: all, message: `범위가 사라졌습니다. ${target}은(는) 배열에 없습니다. (${count}번 비교)` };
}