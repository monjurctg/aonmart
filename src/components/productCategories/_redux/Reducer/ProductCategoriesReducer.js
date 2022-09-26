import * as Types from "../Type/Types";

const initialState = {
  loadingCategory: false,
  loadingSubCategory: false,
  loadingSubSubCategory: false,
  loadingSubSubcategoryProduct: false,
  productCategoryList: [],
  productSubCategoryList: [],
  subSubCategoryList: [],
  subSubCategoryProductList: null,
  categoriesFilterProduct: [],
  subParent: null,
  subSubParent: null,
  subSubDetailsParent: null,
  categoriesAllProducts: [],
  id: null,
  page: 1,
};
function ProductCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PRODUCT_CATEGORY_MAIN_LIST:
      return {
        ...state,
        loadingCategory: action.payload.isLoading,
        productCategoryList: action.payload.data,
      };
    case Types.GET_PRODUCT_SUB_CATEGORY_MAIN_LIST:
      return {
        ...state,
        loadingSubCategory: action.payload.isLoading,
        productSubCategoryList: action.payload.data,
        subParent: action.payload.subParent,
      };
    case Types.GET_PRODUCT_SUB_SUB_CATEGORY_MAIN_LIST:
      return {
        ...state,
        loadingSubCategory: action.payload.isLoading,
        subSubCategoryList: action.payload.data,
        subSubParent: action.payload.subSubParent,
      };
    case Types.GET_CATEGORIES_FILTER_PRODUCT:
      return {
        ...state,
        categoriesFilterProduct: action.payload,
      };
    case Types.SUB_SUBCATEGORY_WISE_PRODUCT:
      return {
        ...state,
        loadingSubSubcategoryProduct: action.payload.isLoading,
        subSubCategoryProductList: action.payload.data,
      };
    // my reducer
    case Types.GET_CATEGORIES_PRODUCTS:
      return {
        ...state,
        categoriesAllProducts: action.payload.data,
      };
    case Types.GET_SUB_CATEGORIES_PRODUCTS:
      return {
        ...state,
        categoriesSubProducts: action.payload.data,
      };
    case Types.PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case Types.ID:
      return {
        ...state,
        id: action.payload,
      };
    case Types.GET_SUB_SUB_CATEGORIES_PRODUCTS:
      return {
        ...state,
        categoriesSubSubProducts: action.payload.data,
      };
    default:
      break;
  }
  return state;
}
export default ProductCategoryReducer;
