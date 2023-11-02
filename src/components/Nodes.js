import createDOM from "./utils/createDOM.js";
import extend from "./utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import { IMAGE_BASE_URL } from "../static/url.js";

export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
  SuperComponent.call(this, initialState);
  const $nodes = createDOM($target, "div", "Nodes");

  $nodes.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");
    const { id } = $node.dataset;
    if (!id) {
      onPrevClick();
      return;
    }
    const selectedNode = this.state.nodes.find((node) => node.id === id);
    if (selectedNode) {
      onClick(selectedNode);
    } else {
      alert("잘못된 접근입니다.");
    }
  });

  this.render = () => {
    const { isRoot, nodes } = this.state;
    $nodes.innerHTML = `
    ${
      isRoot
        ? ""
        : `<div class="Node">
            <img src="${IMAGE_BASE_URL}/prev.png" />
        </div>`
    }
        ${nodes
          .map(
            (node) =>
              `<div class="Node" data-id ="${node.id}">
                  <img src = ${IMAGE_BASE_URL}/${
                node.type === "DIRECTORY" ? "directory" : "file"
              }.png />
                  ${node.name}
                </div>`
          )
          .join("")}`;
  };
}

extend(Nodes, SuperComponent);
