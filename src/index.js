import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <div className="left"></div>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
