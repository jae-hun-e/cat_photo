export const globalKeyEvent = (onCloseImage, onPrevPath) => {
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      onCloseImage();
    }
    if (e.key === "/") {
      onPrevPath();
    }
  });
};
