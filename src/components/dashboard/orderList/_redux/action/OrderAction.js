import Axios from 'axios';
import { showToast } from '../../../../master/Helper/Notification';
import * as Types from "../type/Types";

let baseURL = process.env.REACT_APP_API_URL;
 
/**
 * 
 * @param {order_status} /processing/delivered/cancel
 * @returns orderlistByStatus
 */
export const orderlistByStatus = (order_status = null) => (dispatch) => {
  let response = {
    isLoading: true,
    status: false,
    data: []
  }

  dispatch({ type: Types.GET_ORDER_LIST, payload: response })

  const access_token = JSON.parse(localStorage.getItem("access_token"));

  if (typeof access_token !== "undefined" && access_token !== null && access_token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Accept': "application/json"
      }
    };

    let orderlistURL = `${baseURL}/orders`

    if (typeof order_status !== "undefined" && order_status !== null && order_status !== "") {
      orderlistURL = `${baseURL}/orders?order_status=${order_status}`
    } else {
      orderlistURL = `${baseURL}/orders/`
    } 
    try {
      Axios.get(orderlistURL, config)
        .then((res) => {
          if (res.status) {
            response.data = res.data.data;
            response.isLoading = false;
            response.status = true
            dispatch({ type: Types.GET_ORDER_LIST, payload: response });
          }
        })
        .catch((error) => {
          let responseLog = error.response;
          if (typeof responseLog !== 'undefined') {
            const { request, ...errorObject } = responseLog;
            showToast('error', responseLog.data.message);
            if (responseLog.data.error) {
              showToast('error', responseLog.data.error);
            }
            dispatch({ type: Types.GET_ORDER_LIST, payload: responseLog })
          }
        })
    } catch (error) {
      response.isLoading = false;
      showToast('error', 'Network Error, Please Fix this !');
    }

  } else {
    showToast('error', "Please login first");
  }

}

/**
 * 
 * @param {order_id} 
 * @returns orderDetails
 */
 export const getOrderDetails = (order_id = null) => (dispatch) => {
  let response = {
    isLoading: true,
    status: false,
    data: null
  }

  dispatch({ type: Types.GET_ORDER_DETAILS, payload: response })

  const access_token = JSON.parse(localStorage.getItem("access_token"));

  if (typeof access_token !== "undefined" && access_token !== null && access_token !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Accept': "application/json"
      }
    };

      try {
      Axios.get(`${baseURL}/orders/${order_id}`, config)
        .then((res) => {
          if (res.status) {
            response.data = res.data.data;
            response.isLoading = false;
            response.status = true
            dispatch({ type: Types.GET_ORDER_DETAILS, payload: response });
          }
        })
        .catch((error) => {
          let responseLog = error.response;
          if (typeof responseLog !== 'undefined') {
            const { request, ...errorObject } = responseLog;
            showToast('error', responseLog.data.message);
            if (responseLog.data.error) {
              showToast('error', responseLog.data.error);
            }
            dispatch({ type: Types.GET_ORDER_DETAILS, payload: responseLog })
          }
        })
    } catch (error) {
      response.isLoading = false;
      showToast('error', 'Network Error, Please Fix this !');
    }

  } else {
    showToast('error', "Please login first");
  }

}