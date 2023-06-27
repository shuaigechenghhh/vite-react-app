import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Skeleton } from 'antd';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={ <Skeleton />}>
    <Provider store={store}>
    <React.StrictMode >
      <RouterProvider router={router}  />
    </React.StrictMode>
  </Provider>
  </Suspense>
);
