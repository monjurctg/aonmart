import Axios from "axios";
import * as Types from "../Type/Types";

// const baseUrl = process.env.NEXT_PUBLIC_URL;
const baseUrl = process.env.REACT_APP_API_URL;

let axiosConfig = {
  headers: {
    Accept: "application/json",
  },
};

export const getProductCategory = () => async (dispatch) => {
  const storeInformation =
    JSON.parse(localStorage.getItem("storeInformation")) || "";
  const store_id = storeInformation.storeID || "";

  const responseData = {
    isLoading: true,
    status: false,
    data: [],
  };
  Axios.get(`/sidebar-menu-items?store_id=${store_id}`, axiosConfig)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      responseData.data = res.data.data;
      dispatch({
        type: Types.GET_PRODUCT_CATEGORY_LIST,
        payload: responseData,
      });
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.data = [];
      dispatch({
        type: Types.GET_PRODUCT_CATEGORY_LIST,
        payload: responseData,
      });
    });
};

export const getProdcutSubCategory = (category_id) => async (dispatch) => {
  //   let axiosConfig = {
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   };
  const responseData = {
    isLoading: true,
    status: false,
    data: [],
  };
  // {{base_url}}/sub-categories?category_id={{category_id}}
  // http://system.aonmart.net/api/category/sub-categories?category_id=${category_id}
  // `http://system.aonmart.net/api/category/${category_id}/subcategory`

  Axios.get(`/sub-categories?category_id=${category_id}`)
    .then((res) => {
      responseData.isLoading = false;
      responseData.status = true;
      responseData.data = res.data.data;
      dispatch({
        type: Types.GET_PRODUCT_SUB_CATEGORY1_LIST,
        payload: responseData,
      });
    })
    .catch((err) => {
      responseData.isLoading = false;
      responseData.status = false;
      responseData.data = [];
      dispatch({
        type: Types.GET_PRODUCT_SUB_CATEGORY1_LIST,
        payload: responseData,
      });
    });
};
