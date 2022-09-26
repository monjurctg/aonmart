import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/styles/rsuite-default.css";
import "rsuite/lib/styles/index.less";
import App from "./App";
import "./assets/css/custom.css";
import "./assets/css/dashboardResponsive.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
//Local css files
// import './assets/css/bootstrap.min.css';
import "./assets/css/slick.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Store from "./_redux/store";

const store = Store();
toast.configure();

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Accept"] = "application/json";

axios.defaults.baseURL = "http://system.aonmart.net/api/v1";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
