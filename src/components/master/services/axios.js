import axios from "axios";
import LocalStorageService from "./LocalStorageService";
// import router from "./router/router";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // as return full code with token type
      // config.headers['Accept'] = 'application/json';
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },

  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      typeof error.response !== "undefined" &&
      error.response.status === 401
    ) {
      localStorage.removeItem("loginData");
      localStorage.removeItem("access_token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
