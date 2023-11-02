import Nodes from "./components/Nodes.js";
import extend from "./components/utils/extend.js";
import SuperComponent from "./components/core/SuperComponent.js";
import { request } from "./services/api.js";
import Loading from "./components/Loading.js";
import ImageViewer from "./components/ImageViewer.js";
import { API_END_POINT } from "./static/url.js";

export default function App({ $target }) {
  // 초기값
  SuperComponent.call(this, {
    isRoot: true,
    isLoading: false,
    selectedImageUrl: null,
    nodes: [],
    paths: [],
  });

  this.setState = (nextState) => {
    this.state = nextState;
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    loading.setState(this.state.isLoading);
    imageViewer.setState(this.state.selectedImageUrl);
  };

  const loading = new Loading({ $target });

  const imageViewer = new ImageViewer({
    $target,
    onCloseImage: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  const nodes = new Nodes({
    $target,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    // TODO: 함수분리
    onClick: async (node) => {
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
          selectedImageUrl: `${API_END_POINT}/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
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
      isRoot: !id,
      isLoading: false,
    });
  };

  this.init = () => {
    fetchNodes();
  };

  this.init();
}

extend(App, SuperComponent);
