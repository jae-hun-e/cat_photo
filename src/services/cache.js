const storage = localStorage;
const expirationTime = 30 * 60 * 1000; // 30분
export const getCache = (key = "") => {
  try {
    const storedValue = storage.getItem(key);
    if (!storedValue) return null;

    const { value, expiration } = JSON.parse(storedValue);
    const isExpired = new Date().getTime() > expiration;

    if (isExpired) {
      storage.removeItem(key);
      return null;
    }
    return value;
  } catch (e) {
    alert("로컬 스토리지에 문제가 있습니다.");
  }
};

export const cachingData = (value, key = "") => {
  const expiration = new Date().getTime() + expirationTime;
  const data = {
    value,
    expiration,
  };
  storage.setItem(key, JSON.stringify(data));
};
