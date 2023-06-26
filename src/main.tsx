import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
