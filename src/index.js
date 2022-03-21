import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import * as _redux from "./redux";
import store, { persistor } from "./redux/store";

// Importing Sass with Bootstrap CSS
import "./App.scss";

_redux.setupAxios(axios, store);
ReactDOM.render(
  <App store={store} persistor={persistor} />,
  document.getElementById("root")
);
