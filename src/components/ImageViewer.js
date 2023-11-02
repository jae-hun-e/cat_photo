import extend from "../utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "../utils/createDOM.js";

export default function ImageViewer({ $target, onCloseImage }) {
  const $imageViewer = createDOM($target, "div", "ImageViewer Modal");

  $imageViewer.addEventListener("click", (e) => {
    if ([...e.target.classList].includes("Modal")) {
      onCloseImage();
    }
  });

  this.render = function () {
    $imageViewer.style.display = this.state ? "block" : "none";

    $imageViewer.innerHTML = `
      <div class="content">
        <img src = "${this.state}" />
      </div>
    `;
  };
}

extend(ImageViewer, SuperComponent);
