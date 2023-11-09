import extend from "../utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "../utils/createDOM.js";

export default function Breadcrumb({ $target, onClickPath }) {
  const $breadcrumb = createDOM($target, "nav", "Breadcrumb");

  $breadcrumb.addEventListener("click", (e) => {
    const $breadcrumbItem = e.target.closest(".Breadcrumb__item");
    const { id, end } = $breadcrumbItem.dataset;
    if (end === "true") return;
    onClickPath(id);
  });

  this.render = () => {
    const { paths } = this.state;
    $breadcrumb.innerHTML = `
      <div class="Breadcrumb__item">Root</div>
      ${this.state.paths
        .map(
          ({ name, id }, idx) => `
        <div class="Breadcrumb__item" data-id="${id}" data-end=${
            idx === paths.length - 1
          }>${name}</div>
      `
        )
        .join("")}
    `;
  };
}

extend(Breadcrumb, SuperComponent);
