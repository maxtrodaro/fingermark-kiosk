import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { RecoilRoot } from "recoil";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  </React.StrictMode>
);
