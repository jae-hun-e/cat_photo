import extend from "../utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "../utils/createDOM.js";
import { getImageUrl } from "../utils/getStaticUrl.js";

export default function ImageViewer({ $target, onCloseImage }) {
  const $imageViewer = createDOM($target, "div", "ImageViewer Modal");

  $imageViewer.addEventListener("click", (e) => {
    if (e.target.classList.contains("Modal")) {
      onCloseImage();
    }
  });

  this.render = function () {
    $imageViewer.style.display = this.state ? "block" : "none";

    $imageViewer.innerHTML = `
      <div class="content">
        <img src = "${getImageUrl(this.state)}" />
      </div>
    `;
  };
}

extend(ImageViewer, SuperComponent);
