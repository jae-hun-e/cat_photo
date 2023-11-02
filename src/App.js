import Nodes from "./components/Nodes.js";
import extend from "./components/utils/extend.js";
import SuperComponent from "./components/core/SuperComponent.js";

export default function App({ $target }) {
  SuperComponent.call(this, 10);

  const nodes = new Nodes({ $target });
}

extend(App, SuperComponent);
