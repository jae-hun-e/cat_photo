import extend from "./utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import createDOM from "./utils/createDOM.js";

export default function Breadcrumb({ $target, onClickPath }) {
  const $breadcrumb = createDOM($target, "nav", "Breadcrumb");

  this.render = () => {
    $breadcrumb.innerHTML = `
      <div class="Breadcrumb__item">Root</div>
      ${this.state
        .map(
          ({ name, id }, idx) => `
        <div class="Breadcrumb__item" data-id="${id}" data-end=${
            idx === this.state.length - 1
          }>${name}</div>
      `
        )
        .join("")}
    `;
  };

  $breadcrumb.addEventListener("click", (e) => {
    const $breadcrumbItem = e.target.closest(".Breadcrumb__item");

    const { id, end } = $breadcrumbItem.dataset;

    if (end === "true") return;
    onClickPath(id);
  });
}

extend(Breadcrumb, SuperComponent);
