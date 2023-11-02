import { API_END_POINT } from "../static/url.js";
export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);
    if (!res.ok) throw new Error("서버의 상태가 이상합니다!");
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};
