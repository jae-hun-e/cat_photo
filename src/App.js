import Nodes from "./components/Nodes.js";
import extend from "./components/utils/extend.js";
import SuperComponent from "./components/core/SuperComponent.js";
import { request } from "./services/api.js";
import Loading from "./components/Loading.js";
import ImageViewer from "./components/ImageViewer.js";
import { API_END_POINT } from "./static/url.js";
import Breadcrumb from "./components/Breadcrumb.js";

export default function App({ $target }) {
  // 초기값
  SuperComponent.call(this, {
    nodesState: {
      isRoot: true,
      nodes: [],
    },
    isLoading: false,
    selectedImageUrl: null,
    paths: [],
  });

  this.setState = (nextState) => {
    this.state = nextState;

    loading.setState(this.state.isLoading);

    imageViewer.setState(this.state.selectedImageUrl);

    breadcrumb.setState(this.state.paths);

    nodes.setState(this.state.nodesState);
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

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.paths,
    onClick: async (id) => {
      if (!id) {
        this.setState({
          ...this.state,
          paths: [],
        });
        await fetchNodes();
        return;
      }
      const nextPaths = [...this.state.paths];
      const pathIndex = nextPaths.findIndex((path) => path.id === id);
      this.setState({
        ...this.state,
        paths: nextPaths.slice(0, pathIndex + 1),
      });

      await fetchNodes(id);
    },
  });

  const nodes = new Nodes({
    $target,
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

    console.log("================1==============");
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodesState: {
        isRoot: !id,
        nodes,
      },
      isLoading: false,
    });
    console.log("================2==============");
  };

  this.init = () => {
    fetchNodes();
  };

  this.init();
}

extend(App, SuperComponent);
