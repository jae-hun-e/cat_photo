import extend from "../utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "../utils/createDOM.js";
import { getGifUrl } from "../utils/getStaticUrl.js";

export default function Loading({ $target }) {
  const $loading = createDOM($target, "div", "Loading Modal");

  this.render = () => {
    $loading.style.display = this.state ? "block" : "none";

    $loading.innerHTML = `
      <div class="content">
        <img width="100%" src =  "${getGifUrl("nyan-cat")}" />
      </div>
    `;
  };
}

extend(Loading, SuperComponent);
