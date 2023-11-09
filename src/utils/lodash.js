export const isEqual = (prevState, nextState) => {
  if (typeof prevState !== typeof nextState) return false;

  if (typeof prevState !== "object" || prevState === null) {
    return prevState === nextState;
  }

  const prevKeys = Object.keys(prevState);
  const nextKeys = Object.keys(nextState);

  if (prevKeys.length !== nextKeys.length) return false;

  // 각 속성 비교
  for (const key of prevKeys) {
    if (!nextKeys.includes(key) || !isEqual(prevState[key], nextState[key]))
      return false;
  }

  return true;
};
