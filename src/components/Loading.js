import extend from "./utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "./utils/createDOM.js";
import { IMAGE_BASE_URL } from "../static/url.js";

export default function Loading({ $target }) {
  SuperComponent.call(this, false);
  const $loading = createDOM($target, "div", "Loading Modal");

  this.render = () => {
    $loading.style.display = this.state ? "block" : "none";

    $loading.innerHTML = `
      <div class="content">
        <img width="100%" src = "${IMAGE_BASE_URL}/nyan-cat.gif" />
      </div>
    `;
  };
}

extend(Loading, SuperComponent);
