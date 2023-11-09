import createDOM from "../utils/createDOM.js";
import extend from "../utils/extend.js";
import SuperComponent from "./core/SuperComponent.js";
import { getPngUrl } from "../utils/getStaticUrl.js";

export default function Nodes({ $target, onClickNodes, onPrevPath }) {
  const $nodes = createDOM($target, "div", "Nodes");

  $nodes.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");
    const { id } = $node.dataset;
    if (!id) {
      onPrevPath();
    } else {
      const selectedNode = this.state.nodes.find((node) => node.id === id);
      selectedNode ? onClickNodes(selectedNode) : alert("잘못된 접근입니다.");
    }
  });

  this.render = () => {
    const { isRoot, nodes } = this.state.nodesState;
    $nodes.innerHTML = `
    ${
      isRoot
        ? ""
        : `<div class="Node">
            <img src="${getPngUrl("prev")}" />
        </div>`
    }
        ${nodes
          .map(
            (node) =>
              `<div class="Node" data-id ="${node.id}">
                  <img src ="${getPngUrl(
                    node.type === "DIRECTORY" ? "directory" : "file"
                  )}"/>
                  ${node.name}
                </div>`
          )
          .join("")}`;
  };
}

extend(Nodes, SuperComponent);
