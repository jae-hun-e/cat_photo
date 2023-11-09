export const setGlobalKeyEvent = (onKeyupEscape, onKeyupBack) => {
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      onKeyupEscape();
    }
    if (e.key === "Backspace") {
      onKeyupBack();
    }
  });
};
