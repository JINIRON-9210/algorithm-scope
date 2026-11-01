export function* bubbleSort(lst) {
  const arr = [...lst];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    for (let j = 0; j < i; j += 1) {
      yield {
        array: [...arr],
        comparing: [j, j + 1],
        swapped: null,
        sortedFrom: i + 1,
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        yield {
          array: [...arr],
          comparing: null,
          swapped: [j, j + 1],
          sortedFrom: i + 1,
        };
      }
    }
  }

  yield {
    array: [...arr],
    comparing: null,
    swapped: null,
    sortedFrom: 0,
  };
}