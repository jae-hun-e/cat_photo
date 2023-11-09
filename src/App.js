import Nodes from "./components/Nodes.js";
import { request } from "./services/api.js";
import Loading from "./components/Loading.js";
import ImageViewer from "./components/ImageViewer.js";
import { API_END_POINT } from "./static/url.js";
import Breadcrumb from "./components/Breadcrumb.js";
import { cachingData, getCache } from "./services/cache.js";
import { setGlobalKeyEvent } from "./utils/globalEvent.js";

export default function App({ $target }) {
  this.state = {
    nodesState: {
      isRoot: true,
      nodes: [],
    },
    isLoading: false,
    selectedImageUrl: "",
    paths: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    loading.setState(this.state.isLoading);
    imageViewer.setState(this.state.selectedImageUrl);
    breadcrumb.setState(this.state.paths);
    nodes.setState(this.state.nodesState);
  };

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    let nodes;
    if (getCache(id)) {
      nodes = getCache(id);
    } else {
      nodes = await request(id ? `/${id}` : "/");
      cachingData(nodes, id);
    }

    this.setState({
      ...this.state,
      nodesState: {
        isRoot: !id,
        nodes,
      },
      isLoading: false,
    });
  };

  const onCloseImage = () => {
    this.setState({
      ...this.state,
      selectedImageUrl: "",
    });
  };

  const onClickPath = async (id) => {
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
  };

  const onClickNodes = async (node) => {
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
  };

  const onPrevPath = async () => {
    const nextPaths = [...this.state.paths];

    const popPath = nextPaths.pop();
    if (!popPath) return;

    this.setState({
      ...this.state,
      paths: nextPaths,
    });
    await fetchNodes(nextPaths.length ? nextPaths.at(-1).id : "");
  };

  const loading = new Loading({ $target });
  const imageViewer = new ImageViewer({
    $target,
    onCloseImage,
  });
  const breadcrumb = new Breadcrumb({
    $target,
    onClickPath,
  });
  const nodes = new Nodes({
    $target,
    onClickNodes,
    onPrevPath,
  });

  this.init = () => {
    setGlobalKeyEvent(onCloseImage, onPrevPath);
    fetchNodes();
  };

  this.init();
}
