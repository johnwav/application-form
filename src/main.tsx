import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#087B2F",
            borderRadius: 2,

            // Alias Token
            // colorBgContainer: "#f6ffed",
          },
        }}
      >
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
