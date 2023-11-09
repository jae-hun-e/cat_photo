import Nodes from "./components/Nodes.js";
import { request } from "./services/api.js";
import Loading from "./components/Loading.js";
import ImageViewer from "./components/ImageViewer.js";
import Breadcrumb from "./components/Breadcrumb.js";
import { setGlobalKeyEvent } from "./utils/globalEvent.js";

export default function App({ $target }) {
  this.state = {
    nodesState: {
      isRoot: true,
      nodes: [],
    },
    isLoading: false,
    selectedFilePath: "",
    paths: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    loading.setState({ isLoading: this.state.isLoading });
    imageViewer.setState({ selectedFilePath: this.state.selectedFilePath });
    breadcrumb.setState({ paths: this.state.paths });
    nodes.setState({ nodesState: this.state.nodesState });
  };

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const nodes = await request(id ? `/${id}` : "");

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
      selectedFilePath: "",
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
        selectedFilePath: node.filePath,
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
