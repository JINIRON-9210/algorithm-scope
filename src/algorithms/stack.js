export function* stack(ops) {
  const st = [];

  // 막대 칸 수와 높이 기준을 처음부터 고정 (스택 크기가 변해도 화면이 출렁이지 않게)
  let size = 0;
  let slots = 1;
  for (const op of ops) {
    size += op.type === 'push' ? 1 : -1;
    slots = Math.max(slots, size);
  }
  const fixed = { slots, maxValue: 99 };

  const topMark = () => (st.length ? { [st.length - 1]: 'top' } : {});

  yield {
    array: [],
    marks: {},
    ...fixed,
    message: '빈 스택에서 시작합니다. 왼쪽이 바닥, 가장 오른쪽 값이 맨 위(top)입니다.',
  };

  for (const op of ops) {
    if (op.type === 'push') {
      st.push(op.value);
      yield {
        array: [...st],
        marks: { [st.length - 1]: 'push' },
        ...fixed,
        message: `push(${op.value}): 맨 위에 ${op.value}을(를) 올립니다.`,
      };
    } else {
      yield {
        array: [...st],
        marks: { [st.length - 1]: 'pop' },
        ...fixed,
        message: `pop(): 맨 위의 ${st[st.length - 1]}을(를) 꺼냅니다. 가장 나중에 들어온 값이 가장 먼저 나갑니다.`,
      };
      st.pop();
      yield {
        array: [...st],
        marks: topMark(),
        ...fixed,
        message: st.length ? `이제 맨 위는 ${st[st.length - 1]}입니다.` : '스택이 비었습니다.',
      };
    }
  }

  yield { array: [...st], marks: topMark(), ...fixed, message: '모든 연산이 끝났습니다.' };
}