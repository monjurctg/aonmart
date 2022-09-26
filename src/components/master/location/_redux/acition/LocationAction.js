import Axios from "axios";
import * as Types from "../types/Types";
import {showToast} from "./../../../Helper/Notification";

let baseURL = process.env.REACT_APP_API_URL;

export const getDivision = () => (dispatch) => {
  const responseData = {
    status: false,
    isLoading: true,
    data: [],
  };
  dispatch({type: Types.GET_DIVISION_LIST, payload: responseData});

  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  Axios.get(`/divisions`, axiosConfig)
    .then((res) => {
      if (res.status) {
        responseData.isLoading = false;
        responseData.status = true;
        responseData.data = res.data.data;
        dispatch({type: Types.GET_DIVISION_LIST, payload: responseData});
      }
    })
    .catch((error) => {
      let responseLog = error.response;
      if (typeof responseLog !== "undefined") {
        const {request, ...errorObject} = responseLog;
        showToast("error", responseLog.data.message);
        if (responseLog.data.error) {
          showToast("error", responseLog.data.error);
        }
        dispatch({type: Types.GET_DIVISION_LIST, payload: responseLog});
      }
    });
};

/**
 * @param {division_id} // division id
 * @returns district
 */
export const getDistrict = (division_id) => (dispatch) => {
  const responseData = {
    status: false,
    isLoading: true,
    data: [],
  };
  dispatch({type: Types.GET_UPZILA_LIST, payload: responseData});

  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  Axios.get(`${baseURL}/districts?division_id=${division_id}`, axiosConfig)
    .then((res) => {
      if (res.status) {
        responseData.isLoading = false;
        responseData.status = true;
        responseData.data = res.data.data;
        dispatch({type: Types.GET_DISTRICT_LIST, payload: responseData});
      }
    })
    .catch((error) => {
      let responseLog = error.response;
      if (typeof responseLog !== "undefined") {
        const {request, ...errorObject} = responseLog;
        showToast("error", responseLog.data.message);
        if (responseLog.data.error) {
          showToast("error", responseLog.data.error);
        }
        dispatch({type: Types.GET_DISTRICT_LIST, payload: responseLog});
      }
    });
};
/**
 * @param {district_id} // division id
 * @returns district
 */
export const getUpzila = (district_id) => (dispatch) => {
  const responseData = {
    status: false,
    isLoading: true,
    data: [],
  };
  dispatch({type: Types.GET_UPZILA_LIST, payload: responseData});

  let axiosConfig = {
    headers: {
      Accept: "application/json",
    },
  };

  Axios.get(`${baseURL}/upazilas?district_id=${district_id}`, axiosConfig)
    .then((res) => {
      if (res.status) {
        responseData.isLoading = false;
        responseData.status = true;
        responseData.data = res.data.data;
        dispatch({type: Types.GET_UPZILA_LIST, payload: responseData});
      }
    })
    .catch((error) => {
      let responseLog = error.response;
      if (typeof responseLog !== "undefined") {
        const {request, ...errorObject} = responseLog;
        showToast("error", responseLog.data.message);
        if (responseLog.data.error) {
          showToast("error", responseLog.data.error);
        }
        dispatch({type: Types.GET_UPZILA_LIST, payload: responseLog});
      }
    });
};
