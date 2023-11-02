import extend from "./utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "./utils/createDOM.js";

export default function ImageViewer({ $target, onCloseImage }) {
  SuperComponent.call(this);
  const $imageViewer = createDOM($target, "div", "ImageViewer Modal");

  this.render = function () {
    $imageViewer.style.display = this.state ? "block" : "none";

    $imageViewer.innerHTML = `
      <div class="content">
        <img src = "${this.state}" />
      </div>
    `;
  };

  window.addEventListener(`keyup`, (e) => {
    if (e.key === `Escape`) {
      onCloseImage();
    }
  });

  $imageViewer.addEventListener("click", (e) => {
    if ([...e.target.classList].includes("Modal")) {
      onCloseImage();
    }
  });
}

extend(ImageViewer, SuperComponent);
