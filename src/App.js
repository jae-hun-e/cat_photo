import Nodes from "./components/Nodes.js";
import extend from "./components/utils/extend.js";
import SuperComponent from "./components/core/SuperComponent.js";
import { request } from "./services/api.js";

export default function App({ $target }) {
  SuperComponent.call(this, {
    isRoot: true,
    isLoading: false,
    nodes: [],
    paths: [],
  });

  this.setState = (nextState) => {
    this.state = nextState;
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const nodes = new Nodes({
    $target,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async (node) => {
      if (this.state.isLoading) return;
      this.state.isLoading = true;

      if (node.type === "DIRECTORY") {
        await fetchNodes(node.id);
        this.setState({
          ...this.state,
          paths: [...this.state.paths, node],
        });
      }
      if (node.type === "FILE") {
        this.setState({
          ...this.state,
          selectedImageUrl: `https://kdt-frontend.cat-api.programmers.co.kr/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      if (this.state.isLoading) return;
      this.state.isLoading = true;

      const nextPaths = [...this.state.paths];
      nextPaths.pop();

      this.setState({
        ...this.state,
        paths: nextPaths,
      });

      if (nextPaths.length === 0) {
        await fetchNodes();
      } else {
        await fetchNodes(nextPaths.at(-1).id);
      }
    },
  });

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
      isLoading: false,
    });
  };

  this.init = () => {
    fetchNodes();
  };

  this.init();
}

extend(App, SuperComponent);
