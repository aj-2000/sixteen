import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Video from "./pages/Video";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showToast = (message) =>
  toast(message, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
const App = () => {
  return (
    <div className="w-screen h-screen overflow-clip">
      <Routes>
        <Route path="/:url" element={<Video />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={<div></div>}
        theme="dark"
      />
    </div>
  );
};

export default App;
