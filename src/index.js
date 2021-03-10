import React from "react";

import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import "./assets/scss/bootstrap.scss";
import "./assets/scss/app.scss";

import "bootstrap";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
