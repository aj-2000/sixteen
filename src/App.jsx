import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-clip">
      <Routes>
        <Route path="/:url" element={<Video />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
