import Axios from "axios";
import * as JwtDecode from "jwt-decode";
import {toggleModal} from "../../../../_redux/_global_store/action/GlobalAction";
import {showToast} from "../../../master/Helper/Notification";
import * as Types from "../Type/Types";
import {getUserDataAction} from "./../../../_redux/getUserData/Action/UserDataAction";

let baseURL = process.env.REACT_APP_API_URL;

export const handleLoginInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({type: Types.LOGIN_INPUT_CHANGE, payload: formData});
};

export const handleChangeRegisterInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({type: Types.REGISTER_INPUT_CHANGE, payload: formData});
};

/**
 *
 * @param {object} registerInput
 * @returns handleUserRegistration
 */
export const handleUserRegistration = (registerInput) => (dispatch) => {
  let response = {
    message: null,
    status: false,
    isLoading: true,
  };
  dispatch({type: Types.USER_REGISTRATION, payload: response});

  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    Axios.post(`${baseURL}/register`, registerInput, axiosConfig)
      .then((res) => {
        response.message = res.data.message;
        response.isLoading = false;
        showToast("success", response.message);
        dispatch({type: Types.USER_REGISTRATION, payload: response});
        dispatch({type: Types.REG_SUCCESS, payload: true});
      })
      .catch((error) => {
        const responseLog = error.response;
        // console.log(`error>>>>>>`, error.response.data.errors.mobile)
        let mobileErrorMessage = "This number is already in the system";
        response.isLoading = false;
        if (typeof responseLog !== "undefined") {
          const {request, ...errorObject} = responseLog;
          dispatch({type: Types.USER_REGISTRATION, payload: responseLog});

          if (responseLog.data.errors) {
            let errorMessage;
            if (responseLog.data.errors.name !== undefined) {
              errorMessage = responseLog.data.errors.name[0];
            } else if (responseLog.data.errors.mobile !== undefined) {
              if (
                responseLog.data.errors.mobile[0] ===
                "The mobile has already been taken."
              ) {
                errorMessage = mobileErrorMessage;
              } else {
                errorMessage = responseLog.data.errors.mobile[0];
              }
            } else if (responseLog.data.errors.email !== undefined) {
              errorMessage = responseLog.data.errors.email[0];
            } else if (responseLog.data.errors.password !== undefined) {
              errorMessage = responseLog.data.errors.password[0];
            }
            showToast("error", errorMessage);
          } else {
            showToast("error", responseLog.data.message);
            return;
          }
        } else {
          response.isLoading = false;
          showToast("error", "Something went wrong !");
        }
      });
  } catch (error) {
    response.isLoading = false;
    showToast("error", "Network Error, Please Fix this !");
  }
  dispatch({type: Types.USER_REGISTRATION, payload: response});
};

/**
 *
 * @param {object} loginData
 * @returns loginAction
 */
export const loginAction = (loginInput) => (dispatch) => {
  let response = {
    userData: {},
    tokenData: {},
    isLoggedIn: false,
    isLogging: false,
    loginMessage: "",
    isLoading: true,
  };
  dispatch({type: Types.AUTH_LOGIN_CHECK, payload: response});

  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    Axios.post(`/login`, loginInput, axiosConfig)
      .then((res) => {
        if (res.status) {
          showToast("success", res.data.message);
          // console.log("res.data :>> ", res.data.message);
          response.userData = res.data.data;
          response.tokenData = res.data.data.access_token;
          response.message = res.data.message;
          response.isLoading = false;
          response.isLogging = true;
          localStorage.setItem("loginData", JSON.stringify(response));
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.tokenData)
          );
          dispatch({type: Types.AUTH_LOGIN_CHECK, payload: response});
          dispatch(getUserDataAction());
          dispatch(toggleModal(false));
          // window.location.reload();
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        // console.log(`responseLog`, responseLog)
        if (typeof responseLog !== "undefined") {
          const {request, ...errorObject} = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({type: Types.AUTH_LOGIN_CHECK, payload: responseLog});
        }
      });
  } catch (error) {
    response.isLoading = false;
    showToast("error", "Network Error, Please Fix this !");
  }
};

export const emptyDispatch = () => (dispatch) => {
  const isLogging = false;
  // dispatch({ type: Types.EMPTY_DISPATCH, payload: isLogging });
};

export const getAuthData = () => async (dispatch) => {
  let data = getLoginData();
  if (data !== null && typeof data !== "undefined" && data !== "") {
    if (checkTokenExpired()) {
      data.userData = "";
      data.isLoggedIn = false;
      data.tokenData = "";
    }
  } else {
    data = {};
    data.userData = "";
    data.isLoggedIn = false;
    data.tokenData = "";
  }
  // dispatch({ type: Types.AUTH_GET_LOGIN_DATA, payload: data });
};

export const logoutUserData = () => (dispatch) => {
  localStorage.setItem("loginData", "");
  localStorage.setItem("redirectTo", "");
  // localStorage.setItem("searchInfo", "");
  // dispatch({ type: Types.AUTH_POST_LOGOUT, payload: true });
};

/**
 * Logout a User
 *
 * @return void
 */
export const handleLogoutUser = () => (dispatch) => {
  localStorage.removeItem("loginData");
  localStorage.removeItem("access_token");
  // localStorage.removeItem('searchInfo');
  showToast("success", "Logout Successfully !");
  dispatch(getUserDataAction());
  dispatch({type: Types.LOGOUT_USER, payload: true});
  // window.location.reload();
};

/**
 * checkTokenExpired
 *
 * Check if Jwt token is expred or not; true=>expired, false=>valid
 */
function checkTokenExpired() {
  var current_time = new Date().getTime() / 1000;
  let loginData = localStorage.getItem("loginData");
  let jwt = "";
  if (loginData !== null || typeof loginData !== "undefined") {
    loginData = JSON.parse(loginData);
    const token = loginData.tokenData;
    jwt = JwtDecode(token);
  }

  if (current_time > jwt.exp) {
    return true;
  }
  return false;
}

/**
 * getJwtToken
 *
 * Get jwt access token
 */
async function getJwtToken() {
  let loginData = localStorage.getItem("loginData");
  if (await !checkTokenExpired()) {
    return loginData.tokenData;
  } else {
    return null;
  }
}

function getLoginData() {
  let loginData = localStorage.getItem("loginData");
  if (
    loginData !== null &&
    typeof loginData !== "undefined" &&
    loginData != ""
  ) {
    loginData = JSON.parse(loginData);
  }
  return loginData;
}
