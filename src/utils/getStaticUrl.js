import { ICON_BASE_URL, STATIC_IMAGE_URL } from "../static/url.js";

export const getImageUrl = (url) => {
  return `${STATIC_IMAGE_URL}${url}`;
};

export const getPngUrl = (url) => {
  return `${ICON_BASE_URL}/${url}.png`;
};

export const getGifUrl = (url) => {
  return `${ICON_BASE_URL}/${url}.gif`;
};
