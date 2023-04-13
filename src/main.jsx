import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import LocalDBProvider from "./context/LocalDB";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <LocalDBProvider>
    <ToastContainer hideProgressBar newestOnTop closeOnClick />
    <App />
  </LocalDBProvider>,
  document.getElementById("root")
);
