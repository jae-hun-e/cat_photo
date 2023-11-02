export default function createDOM($target, tagName = "div", className = "") {
  const $element = document.createElement(tagName);
  $element.className = className;
  $target.appendChild($element);

  return $element;
}
