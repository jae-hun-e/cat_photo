import Breadcrumb from "./components/Breadcrumb.js";
import Loading from "./components/Loading.js";
import Nodes from "./components/Nodes.js";
import ImageViewer from "./components/ImageViewer.js";

export default function App({ $target }) {
  const loading = new Loading({ $target });
  const breadcrumb = new Breadcrumb({
    $target,
  });
  const nodes = new Nodes({ $target });
  const imageViewer = new ImageViewer({ $target });
}
