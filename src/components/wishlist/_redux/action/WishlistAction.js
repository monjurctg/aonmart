import {default as axios, default as Axios} from "axios";
import * as Types from "../type/Types";
import {showToast} from "./../../../master/Helper/Notification";

/**
 *
 * @param {product_id} number
 * @returns addToWishlistAction
 */
export const addToWishlistAction = (product_id) => (dispatch) => {
  const responseData = {
    isAdding: true,
    status: false,
    data: null,
  };
  // console.log(product_id, "product_id");
  dispatch({type: Types.ADD_TEPM_WISH_ID, payload: product_id});
  dispatch({type: Types.ADD_TO_WISH_LIST, payload: responseData});

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

    // {{base_url}}/wishlist-products/add/{{product_id}}
    Axios.get(`/wishlist-products/add/${product_id}`, config)
      .then((res) => {
        if (res.status === 200) {
          console.log("res............ wish list data", res.data.data.id);
          responseData.isAdding = false;
          responseData.status = true;
          responseData.data = res.data.data;

          console.log(responseData, "data response");

          showToast("success", "Wishlist added successfully!");

          // window.location.reload()
          dispatch({type: Types.ADD_TO_WISH_LIST, payload: responseData});
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        responseData.isAdding = false;
        if (typeof responseLog !== "undefined") {
          const {request, ...errorObject} = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({type: Types.ADD_TO_WISH_LIST, payload: responseData});
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};

//
export const removeFromTempWish = (id, CASE) => (dispatch) => {
  console.log(id, "remove");
  const data = {
    id: id,
    CASE: CASE,
  };
  dispatch({type: Types.REMOVE_TEPM_WISH_ID, payload: data});
};
// export const addTempWishId = (id) => (dispatch) => {

// };
// handele remove
export const isRemoveAction = (data) => (dispatch) => {
  dispatch({type: Types.REMOVE_WISHLIST, payload: data});
};

/**
 * Home user wishlist data
 * @returns getOwnProductList
 */
export const getUserWishlist = () => (dispatch) => {
  const responseData = {
    isLoading: true,
    status: false,
    data: [],
  };

  dispatch({type: Types.GET_USER_WISHLIST, payload: responseData});

  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const storeInformation = JSON.parse(localStorage.getItem("storeInformation"));
  const storeId = storeInformation.storeID;
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

    // {{base_url}}/wishlist-products/{{store_id}}
    axios
      .get(`/wishlist-products/${storeId}`, config)
      .then((res) => {
        if (res.status) {
          console.log(res.config);
          responseData.isLoading = false;
          responseData.status = true;
          responseData.data = res.data.data;
          dispatch({type: Types.GET_USER_WISHLIST, payload: responseData});
        }
      })

      .catch((error) => {
        let responseLog = error.response;
        responseData.isLoading = false;
        if (typeof responseLog !== "undefined") {
          const {request, ...errorObject} = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({type: Types.GET_USER_WISHLIST, payload: responseData});
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};

/**
 * Remove item from wishlist
 * @returns removeFromWishlist
 */
export const removeFromWishlist = (id, handleClose) => (dispatch) => {
  let responseData = {
    deleting: true,
    status: false,
  };

  dispatch({type: Types.REMOVE_FROM_WISHLIST, payload: responseData});

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
    // {{base_url}}/wishlist-products/remove/{{product_id}}
    Axios.get(`/wishlist-products/remove/${id}`, config)
      .then((res) => {
        if (res.status) {
          responseData.deleting = false;
          responseData.status = true;
          showToast("success", res.data.message);
          dispatch({type: Types.REMOVE_FROM_WISHLIST, payload: responseData});
          dispatch(getUserWishlist());
          dispatch(handleClose());
        }
      })
      .catch((error) => {
        let responseLog = error.response;
        responseData.deleting = false;
        if (typeof responseLog !== "undefined") {
          const {request, ...errorObject} = responseLog;
          showToast("error", responseLog.data.message);
          if (responseLog.data.error) {
            showToast("error", responseLog.data.error);
          }
          dispatch({type: Types.REMOVE_FROM_WISHLIST, payload: responseData});
        }
      });
  } else {
    showToast("error", "Please login first");
  }
};
