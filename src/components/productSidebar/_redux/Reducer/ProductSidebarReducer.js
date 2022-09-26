import * as Types from "../Type/Types";

const initialState = {
  isLoading: false,
  categoryList: [],
  subCategory1List: [],
};
function ProductSidebarReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PRODUCT_CATEGORY_LIST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        categoryList: action.payload.data,
      };
    case Types.GET_PRODUCT_SUB_CATEGORY1_LIST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        subCategory1List: action.payload.data,
      };
    default:
      break;
  }
  return state;
}
export default ProductSidebarReducer;
