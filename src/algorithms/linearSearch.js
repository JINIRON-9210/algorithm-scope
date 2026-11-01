export function* linearSearch({ array, target }) {
  const arr = [...array];
  const n = arr.length;

  // 이미 확인한 칸은 흐리게
  const checked = (upto, extra = {}) => {
    const m = {};
    for (let k = 0; k < upto; k++) m[k] = 'dim';
    return { ...m, ...extra };
  };

  yield { array: arr, marks: {}, message: `찾는 값: ${target} — 앞에서부터 하나씩 확인합니다.` };

  for (let i = 0; i < n; i++) {
    yield {
      array: arr,
      marks: checked(i, { [i]: 'compare' }),
      message: `${i}번 값 ${arr[i]}, 찾는 값 ${target}를 비교합니다.`,
    };
    if (arr[i] === target) {
      yield {
        array: arr,
        marks: checked(i, { [i]: 'found' }),
        message: `찾았습니다! ${target}은(는) ${i}번에 있습니다. (${i + 1}번 비교)`,
      };
      return;
    }
  }

  yield { array: arr, marks: checked(n), message: `끝까지 확인했지만 ${target}은(는) 없습니다. (${n}번 비교)` };
}