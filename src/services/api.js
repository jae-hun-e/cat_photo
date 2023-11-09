import { API_END_POINT } from "../static/url.js";
import { cachingData, getCache } from "./cache.js";
export const request = async (url) => {
  try {
    if (getCache(url)) return getCache(url);

    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) throw new Error("서버의 상태가 이상합니다!");
    const data = await res.json();
    cachingData(data, url);

    return data;
  } catch (e) {
    console.error(e);
  }
};
