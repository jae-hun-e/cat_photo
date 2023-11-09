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
    const { selectedFilePath } = this.state;
    $imageViewer.style.display = selectedFilePath ? "block" : "none";

    $imageViewer.innerHTML = `
      <div class="content">
        <img src = "${getImageUrl(selectedFilePath)}" />
      </div>
    `;
  };
}

extend(ImageViewer, SuperComponent);
