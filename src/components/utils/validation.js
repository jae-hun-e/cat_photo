const validationState = (prevState, nextState) => {
  if (typeof prevState !== typeof nextState) return false;

  if (Array.isArray(prevState) !== Array.isArray(nextState)) return false;

  // 객체 타입 중 배열인 경우
  if (Array.isArray(prevState)) {
    return arrayValidation(prevState, nextState);
  }
  // 객체 타입 중 객체인 경우
  if (typeof prevState === "object") {
    return objectValidation(prevState, nextState);
  }

  return true;
};

const arrayValidation = (prev, next) => {
  return prev.every((item, index) => {
    // next 가 더 짧으면 패스
    if (!next[index]) return true;

    // 둘다 원시
    if (typeof item !== "object") return typeof item === typeof next[index];

    // 하나만 배열
    if (Array.isArray(item) !== Array.isArray(next[index])) return false;
    // 둘 다 배열
    if (Array.isArray(item)) return arrayValidation(item, next[index]);
    else return objectValidation(item, next[index]);
  });
};

const objectValidation = (prev, next) => {
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  // prev 있는 것 중 next 에 없는 것이 있으면 false
  if (!prevKeys.every((key) => nextKeys.includes(key))) return false;

  // 각 키에 대해서 재귀적으로 검사
  return prevKeys.every((key) => {
    const prevValue = prev[key];
    const nextValue = next[key];

    // prev, next 에 값이없으면 패스
    if (!prevValue || !nextValue) return true;
    // 둘 다 원시
    if (typeof prevValue !== "object")
      return typeof prevValue === typeof nextValue;
    // 하나만 배열
    if (Array.isArray(prevValue) !== Array.isArray(nextValue)) return false;
    // 둘 다 배열
    if (Array.isArray(prevValue)) return arrayValidation(prevValue, nextValue);
    // 둘 다 객체
    else return objectValidation(prevValue, nextValue);
  });
};

export default validationState;
