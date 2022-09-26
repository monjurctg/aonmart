import axios from "axios";
import * as Types from "../Types/Types";

export const searchProductAction = (searchKeyword) => async (dispatch) => {
  const search = searchKeyword;
  // if (search.length <= 1) return;

  const response = {
    loading: true,
    data: [],
  };

  dispatch({type: Types.GET_SEARCHED_PRODUCT_LIST, payload: response});

  // https://api-ecom.programmingshikhi.com/public/api/v1/get-items/search?

  const config = {
    headers: {
      // Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    },
  };

  // // https://api-ecom.programmingshikhi.com/public/api/v1/get-items/search?
  // const base_url = process.env.REACT_APP_API_URL;
  const URL = `/stores/2/products?search=${search}`;

  // const URL = `https://api-ecom.programmingshikhi.com/public/api/v1/get-items/search?search=${search}`;
  const res = await axios.get(URL, config);
  // console.log(`res from key search`, res)
  response.loading = false;
  response.data = res.data.data;

  dispatch({type: Types.GET_SEARCHED_PRODUCT_LIST, payload: response});
};
