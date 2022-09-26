import Axios from "axios";
import { showToast } from "../../../master/Helper/Notification";
import * as Types from "../Type/Types";

let baseURL = process.env.REACT_APP_API_URL;
 
/**
 *
 * @param {object} orderData
 * @returns placeOrder
 */


export const placeOrder = (orderData) => (dispatch) => {
 
  let response = {
    isLoading: true,
    status: false,
    
  };

 
  dispatch({ type: Types.PLACE_ORDER, payload: response });

  const access_token = JSON.parse(localStorage.getItem("access_token"));

  if (
    typeof access_token !== "undefined" &&
    access_token !== null &&
    access_token !== ""
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    };
    
    try {
      Axios.post(`${baseURL}/orders`, orderData, config)
        .then((res) => {
          if (res.status) {
            showToast("success", "Your order is placed. Thank you.");
            let id = res.data.data.id
            localStorage.setItem("orderData", JSON.stringify(res));
            dispatch({ type: Types.PLACE_ORDER, payload: response });
           
          }
        }) 
        .catch((error) => {
          let responseLog = error.response;
          if (typeof responseLog !== "undefined") {
            const { request, ...errorObject } = responseLog;
            showToast("error", responseLog.data.message);
            if (responseLog.data.error) {
              showToast("error", responseLog.data.error);
            }
            dispatch({ type: Types.PLACE_ORDER, payload: responseLog });
          }
        });
    } catch (error) {
      response.isLoading = false;
      showToast("error", "Network Error, Please Fix this !");
    } 
  } else {
    showToast("error", "Please login first");
  }
};
