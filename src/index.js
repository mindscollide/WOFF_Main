import React from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
// antd v5 global base styles (v4 shipped these inside antd.less)
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
// Imported after App (and therefore after App.less) so these
// former-inline-style utilities win equal-specificity ties, the way the
// inline styles they replaced used to.
import "./styles/utilities.css";
import { BrowserRouter as Router } from "react-router";
import  {Provider}  from "react-redux";
import store from "./store/store";
import theme from "./theme";

// Static notification/message calls (e.g. Elements/Notifications) render
// outside the React tree; this makes them use the same theme.
ConfigProvider.config({
  holderRender: (children) => (
    <ConfigProvider theme={theme}>{children}</ConfigProvider>
  ),
});

createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Provider>
  </Router>
);
