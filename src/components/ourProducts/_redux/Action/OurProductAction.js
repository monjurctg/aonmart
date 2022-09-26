import Axios from "axios";
import * as Types from "../Type/Types";

// const baseUrl = process.env.REACT_APP_API_URL;
// const oldUrl = process.env.REACT_APP_OLD_API;

const access_token = JSON.parse(localStorage.getItem("access_token"));

// const access_token = login_data?.userData.access_token;
console.log("first", access_token);

const config = {
  headers: {
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json",
  },
};

/**
 * Home page all product list
 * @returns getOwnProductList
 */
export const getOwnProductList = () => (dispatch) => {
  const responseData = {
    isLoading: true,
    status: false,
    data: [],
  };
  dispatch({type: Types.GET_OWN_PRODUCT_LIST, payload: responseData});
  Axios.get(`/product`, config)
    .then((res) => {
      console.log(res, "res product ");
      responseData.isLoading = false;
      responseData.status = true;
      responseData.data = res.data.data;
      dispatch({type: Types.GET_OWN_PRODUCT_LIST, payload: responseData});
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.data = [];
      dispatch({type: Types.GET_OWN_PRODUCT_LIST, payload: responseData});
    });
};

/**
 * @param id int product id
 * @returns productDetails
 */
export const getProductDetails = (product_id, store_id) => (dispatch) => {
  const responseData = {
    isLoading: true,
    status: false,
    data: null,
  };
  // console.log(
  //   "`${oldUrl}/product/${product_id}`",
  //   `${oldUrl}/product/${product_id}`
  // );
  // console.log("store_id", store_id);

  // {{base_url}}/stores/{{store_id}}/products/{{product_id}}
  dispatch({type: Types.GET_PRODUCT_DETAILS, payload: responseData});

  Axios.get(`/stores/${store_id}/products/${product_id}`, config)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      responseData.data = res.data.data;
      dispatch({type: Types.GET_PRODUCT_DETAILS, payload: responseData});
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.data = null;
      dispatch({type: Types.GET_PRODUCT_DETAILS, payload: responseData});
    });
};
