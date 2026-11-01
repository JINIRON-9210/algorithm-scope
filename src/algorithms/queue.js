export function* queue(ops) {
  const q = [];

  // 칸 수와 높이 기준 고정 (스택과 같은 이유)
  let size = 0;
  let slots = 1;
  for (const op of ops) {
    size += op.type === 'push' ? 1 : -1;
    slots = Math.max(slots, size);
  }
  const fixed = { slots, maxValue: 99 };

  const frontMark = () => (q.length ? { 0: 'front' } : {});

  yield {
    array: [],
    marks: {},
    ...fixed,
    message: '빈 큐에서 시작합니다. 왼쪽 끝이 맨 앞(front), 오른쪽 끝이 맨 뒤(rear)입니다.',
  };

  for (const op of ops) {
    if (op.type === 'push') {
      q.push(op.value);
      yield {
        array: [...q],
        marks: { ...frontMark(), [q.length - 1]: 'push' },
        ...fixed,
        message: `enqueue(${op.value}): 맨 뒤에 ${op.value}을(를) 줄 세웁니다.`,
      };
    } else {
      yield {
        array: [...q],
        marks: { 0: 'pop' },
        ...fixed,
        message: `dequeue(): 맨 앞의 ${q[0]}을(를) 꺼냅니다. 가장 먼저 들어온 값이 가장 먼저 나갑니다.`,
      };
      q.shift();
      yield {
        array: [...q],
        marks: frontMark(),
        ...fixed,
        message: q.length ? `나머지가 한 칸씩 앞으로 당겨지고, 이제 맨 앞은 ${q[0]}입니다.` : '큐가 비었습니다.',
      };
    }
  }

  yield { array: [...q], marks: frontMark(), ...fixed, message: '모든 연산이 끝났습니다.' };
}