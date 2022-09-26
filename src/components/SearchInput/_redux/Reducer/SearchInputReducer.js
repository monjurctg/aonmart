import * as Types from "../Types/Types";

const initialState = {
  loading: false,
  products: [],
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SEARCHED_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload.data,
        loading: action.payload.loading,
      };

    default:
      return {
        ...state,
      };
  }
};

export default SearchReducer;
