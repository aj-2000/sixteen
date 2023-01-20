import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { SocketProvider } from "./providers/Socket";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  </>
);
