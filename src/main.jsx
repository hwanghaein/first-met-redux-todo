import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux"; // 모든 하위 컴포넌트들이 store의 state에 접근할 수 있게 됨
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
